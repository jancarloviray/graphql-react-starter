const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { printSchema } = require('graphql')
const bodyParser = require('body-parser')
const cors = require('cors')
const PrettyError = require('pretty-error')
const debug = require('debug')

const db = require('./data/lib/db')
const schema = require('./schema')

const pe = new PrettyError()
pe.start()
pe.skipNodeFiles()
pe.skipPackage('express')

const log = debug('app:api')

const GRAPHQL_PORT = process.env.API_PORT || 8080

const app = express()

app.use('*', cors())

app.use('/graphql', bodyParser.json(), graphqlExpress((/*req*/) => {
  let user // = req.session.user
  return {
    schema,
    pretty: true,
    allowUndefinedInResolve: false,
    context: {
      user,
    },
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `
    {
        users {
            name
            accounts {
                type
                total
            }
        }
    }
    `
}))

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(schema))
})

// catch all
app.use((err, req, res, next) => {
  process.stderr.write(pe.render(err))
  next()
})

const server = app.listen(GRAPHQL_PORT, () => {
  // eslint-disable-next-line
  log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`)
})

// temp fix for nodemon EADDRINUSE
const term = ['exit', 'uncaughtException', 'SIGTERM', 'SIGINT']
term.forEach((message) => {
  process.on(message, () => {
    db.destroy()
    server.close()
  })
})

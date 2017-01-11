import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { printSchema } from 'graphql'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from '../data/lib/db'
import PrettyError from 'pretty-error'
import debug from 'debug'
import schema from './api/schema'

const pe = new PrettyError()
pe.start()
pe.skipNodeFiles()
pe.skipPackage('express')

const log = debug('app:api')

const GRAPHQL_PORT = process.env.API_PORT

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

import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './src/db/lib/db'

import schema from './src/server/api/schema'

const GRAPHQL_PORT = 8080

const graphQLServer = express().use('*', cors())

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
    let user // = req.session.user
    return {
        schema,
        context: {
            user,
        },
    }
}))

graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
})

const server = graphQLServer.listen(GRAPHQL_PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`)
})

process.stderr.on('data', function (data) {
    console.log('ERROR: ', data);
});

// temp fix for nodemon EADDRINUSE
const term = ['exit', 'uncaughtException', 'SIGTERM', 'SIGINT']
term.forEach((message) => {
    process.on(message, () => {
        db.destroy()
        server.close()
    })
})

import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'

import schema from './data/schema'

const GRAPHQL_PORT = 8080

const graphQLServer = express().use('*', cors())

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {},
}))

graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
})

graphQLServer.listen(GRAPHQL_PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`)
})
import path from 'path'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { printSchema } from 'graphql'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './src/db/lib/db'

import schema from './src/server/api/schema'

import React from 'react'
// renders component to HTML & preserves it if we call .render from client
import { renderToString } from 'react-dom/server'
import App from './src/app/App'
import template from './src/app/template'

const GRAPHQL_PORT = 8080

const app = express()

app.use('*', cors())

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    const isMobile = true
    const initialState = { isMobile }
    const appString = renderToString(<App isMobile={isMobile} />)

    res.send(template({
        body: appString,
        title: 'Hello World from the server',
        // important to pass initial state so both 
        // the client and server will have synced props
        initialState: JSON.stringify(initialState)
    }))
})

app.use('/graphql', bodyParser.json(), graphqlExpress((/*req*/) => {
    let user // = req.session.user
    return {
        schema,
        context: {
            user,
        },
    }
}))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

app.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
})

const server = app.listen(GRAPHQL_PORT, () => {
    // eslint-disable-next-line
    console.log(`
    GraphQL Server is now running on 
    http://localhost:${GRAPHQL_PORT}/graphql
    `)
})

// temp fix for nodemon EADDRINUSE
const term = ['exit', 'uncaughtException', 'SIGTERM', 'SIGINT']
term.forEach((message) => {
    process.on(message, () => {
        db.destroy()
        server.close()
    })
})

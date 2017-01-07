# GraphQL React Starter

GraphQL Node.js Starter is a bloat-less, ORM-free boilerplate using [Node.js](https://nodejs.org/), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript) through [Babel](http://babeljs.io/) and using [GraphQL](http://graphql.org/) for API creations and consumption. For client-side, this uses [React](https://facebook.github.io/react/), [React-Router](https://github.com/ReactTraining/react-router) and [Redux](https://github.com/reactjs/redux). For the database portion, this uses [PostgreSQL](https://www.postgresql.org/) and [SQLite](http://sqlite.org/), accessed through a great query-builder, [Knex.js](http://knexjs.org/)

The purpose of this starter kit is to be as real-world starter as possible while being simple and bloat-free. 

**Current Status: still in development, but follow along and contribute if you'd like.**

## Installation

You can run these commands using [npm](https://www.npmjs.com/) but [Yarn](https://yarnpkg.com/en/docs/install) is a better alternative. [Why?](https://github.com/yarnpkg/yarn) Offline mode, deterministic installation, network performance and resilience. 

```shell
yarn install
yarn migrate
yarn seed

yarn start
```

## Roadmap and Status

- [x] sample db w/ relationships (1-1/1-M/M-M)
- [x] modularize schema and resolvers
- [x] universal javascript
- [x] eslint
- [x] react
- [x] webpack 2
- [x] hot reloading
- [x] react router 
- [x] redux 
- [x] client example
- [ ] es2015+ everything
- [ ] production vs development build
- [ ] graphql client 
- [ ] separate api server and client server
- [ ] add subscriptions
- [ ] authentication
- [ ] nginx
- [ ] dockerize
- [ ] postgres for production
- [ ] data loaders and prevent N+1 problems
- [ ] static queries 
- [ ] deployment scripts

## Universal / Isomorphic Explained

We can get the server to render React components through `renderToString` from `react-dom/server`

```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/app/App'

res.send(`
    <!doctype html>
    <html>
        <body>
            <!-- Server Side Render -->
            <div id='app'>${renderToString(<App />)}</div>

            <!-- Server Side Hydrating Client Data -->
            <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>

            <!-- Client Side Render -->
            <script src='bundle.js'></script>
        </body>
    </html>
`);
```

However, there are no event-handlers attached yet. When **bundle.js** is loaded and React's `render` function is executed, React will already see that markup is there and will not re-render but rather just attach the event handlers.

This is done through this client code: 

```javascript
render(
    <App {...window.__APP_INITIAL_STATE__} />,
    document.getElementById('root')
)
```

This also gets the `__APP_INITIAL_STATE__` that the server rendered in the `window` variable.

## Schema-First Design Steps

This centers your application development around your feature requirements, skewed a bit towards UI. Having the graphql abstraction allows you to focus on features rather than modeling your data and queries based on a rigid database schema.

### Define Schema

Describe the [graphql schema](http://graphql.org/learn/schema/) centered around your front-end requirements. This is not the same as Database Design, though in many cases, the schema could be a direct representation of your table relationships.

### Define Resolvers

Define the [resolvers](http://graphql.org/learn/execution/#root-fields-resolvers), to match entities from your schema

### Create Mocks

Mocking APIs are typically time consuming and often becomes a waste as API changes. [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/mocking.html) has a mocking library that allows you to map values based on types or field names. Very useful, especially if synchronized with mocking library like faker.js or casual.js 

### Create or Update Database

Being that GraphQL is an abstraction that is somewhat geared towards UI requirements, there is no need to map a one-to-one schema between GraphQL schema and Database Schema. Through the resolver, we can morph and transform and even fetch extra data without being constricted with the database schema. This allows for faster iteration and prototyping.# graphql-react-starter 

## Inspirations

[https://github.com/jpsierens/webpack-react-redux](https://github.com/jpsierens/webpack-react-redux)
[https://github.com/justinjung04/universal-boilerplate](https://github.com/justinjung04/universal-boilerplate)
[https://github.com/jackfranklin/universal-react-example](https://github.com/jackfranklin/universal-react-example)
[https://github.com/ParabolInc/action](https://github.com/ParabolInc/action)
[https://github.com/davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)

## Dependencies

- [body-parser](): Node.js body parsing middleware
- [cors](https://github.com/expressjs/cors): middleware for dynamically or statically enabling CORS in express/connect applications
- [express](): Fast, unopinionated, minimalist web framework
- [graphql-server-express](https://github.com/apollostack/graphql-server/tree/master/packages): Production-ready Node.js GraphQL server for Express and Connect
- [graphql-tools](https://github.com/apollostack/graphql-tools): A set of useful tools for GraphQL
- [knex](https://github.com/tgriesser/knex): A batteries-included SQL query &amp; schema builder for Postgres, MySQL and SQLite3 and the Browser
- [lodash](): Lodash modular utilities.
- [pg](https://github.com/brianc/node-postgres): PostgreSQL client - pure javascript &amp; libpq with the same API
- [react](): React is a JavaScript library for building user interfaces.
- [react-dom](): React package for working with the DOM.
- [react-redux](https://github.com/reactjs/react-redux): Official React bindings for Redux
- [react-router](): A complete routing library for React
- [react-router-redux](): Ruthlessly simple bindings to keep react-router and redux in sync
- [redux](https://github.com/reactjs/redux): Predictable state container for JavaScript apps

## Dev Dependencies

- [babel-cli](): Babel command line.
- [babel-loader](https://github.com/babel/babel-loader): babel module loader for webpack
- [babel-preset-env](): A Babel preset for each environment.
- [babel-preset-react](): Babel preset for all React plugins.
- [casual](): Fake data generator
- [css-loader](https://github.com/webpack/css-loader): css loader module for webpack
- [eslint](): An AST-based pattern checker for JavaScript.
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel): an eslint rule plugin companion to babel-eslint
- [eslint-plugin-graphql](https://github.com/apollostack/eslint-plugin-graphql): GraphQL ESLint plugin.
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React specific linting rules for ESLint
- [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin): Extract text from bundle into a file.
- [json-loader](https://github.com/webpack/json-loader): json loader module for webpack
- [node-sass](https://github.com/sass/node-sass): Wrapper around libsass
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [package-json-to-readme](): Generate a README.md from package.json contents
- [react-hot-loader](https://github.com/gaearon/react-hot-loader): Tweak React components in real time.
- [sass-loader](https://github.com/jtangelder/sass-loader): Sass loader for webpack
- [sqlite3](https://github.com/mapbox/node-sqlite3): Asynchronous, non-blocking SQLite3 bindings
- [style-loader](https://github.com/webpack/style-loader): style loader module for webpack
- [webpack](https://github.com/webpack/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): Offers a dev middleware for webpack, which arguments a live bundle to a directory
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server): Serves a webpack app. Updates the browser on changes.
- [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware): Webpack hot reloading you can attach to your own server
- [webpack-node-externals](https://github.com/liady/webpack-node-externals): Easily exclude node_modules in Webpack bundle
- [redux-logger](https://github.com/theaqua/redux-logger): Logger for Redux
- [better-npm-run](https://github.com/benoror/better-npm-run): Better NPM scripts runner

## License

MIT

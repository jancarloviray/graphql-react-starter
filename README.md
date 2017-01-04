# GraphQL React Starter

GraphQL Node.js Starter is a bloat-less, ORM-free boilerplate using [Node.js](https://nodejs.org/), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript) through [Babel](http://babeljs.io/) and using [GraphQL](http://graphql.org/) for API creations and consumption. For client-side, this uses [React](https://facebook.github.io/react/), [React-Router](https://github.com/ReactTraining/react-router) and [Redux](https://github.com/reactjs/redux). For the database portion, this uses [PostgreSQL](https://www.postgresql.org/) and [SQLite](http://sqlite.org/), accessed through a great query-builder, [Knex.js](http://knexjs.org/)

The purpose of this starter kit is to be as real-world starter as possible while being simple and bloat-free. 

## Installation

You need [Yarn](https://yarnpkg.com/en/docs/install) as [npm](https://www.npmjs.com/) alternative. [Why?](https://github.com/yarnpkg/yarn) Offline mode, deterministic installation, network performance and resilience.

```shell
yarn install
yarn migrate
yarn seed

yarn start
```

## Commands

Note that most commands are dependent upon having NODE_ENV=production|development

```shell
# create new migration script template
yarn make:migrate add-dashed-description-here

# create seed
yarn make:seed 002-second-seed

# seed to latest
yarn seed

# migrate to latest
yarn migrate

# rollback last batch
yarn migrate:rollback

# lint project files
yarn lint

# lint auto-fix 
yarn lint -- --fix

# start local server 
yarn start
```

## Roadmap and Plans

- [ ] (done) sample db relationships 
- [ ] (done) modularize schema/resolvers
- [ ] add subscriptions
- [ ] production vs development build
- [ ] es2015+ everything
- [ ] (done) eslint
- [ ] react
- [ ] graphql client 
- [ ] webpack 2 and hot loader
- [ ] react router 
- [ ] redux 
- [ ] authentication
- [ ] dockerize
- [ ] nginx
- [ ] postgres for production
- [ ] data loaders and prevent N+1 problems
- [ ] static queries 
- [ ] "harden" node server
- [ ] unit tests 
- [ ] [jenkins](https://jenkins.io/)
- [ ] deployment scripts
- [ ] sample on heroku? aws? do? gcp?
- [ ] React Native

## Schema-First Design Steps

This centers your application development around your feature requirements, skewed a bit towards UI. Having the graphql abstraction allows you to focus on features rather than modeling your data and queries based on a rigid database schema.

### Define Schema

Describe the [graphql schema](http://graphql.org/learn/schema/) centered around your front-end requirements. This is not the same as Database Design, though in many cases, the schema could be a direct representation of your table relationships.

### Define Resolvers

Define the [resolvers](http://graphql.org/learn/execution/#root-fields-resolvers), to match entities from your schema

### Create Mocks

Mocking APIs are typically time consuming and often becomes a waste as API changes. [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/mocking.html) has a mocking library that allows you to map values based on types or field names. Very useful, especially if synchronized with mocking library like faker.js or casual.js 

### Create or Update Database

Being that GraphQL is an abstraction that is somewhat geared towards UI requirements, there should be no pressure to map a one-to-one schema between GraphQL schema and Database Schema. Through the resolver, we can morph and transform and even fetch extra data without being constricted with the database schema. This allows for faster iteration and prototyping.# graphql-react-starter 

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
- [sass-loader](https://github.com/jtangelder/sass-loader): Sass loader for webpack
- [sqlite3](https://github.com/mapbox/node-sqlite3): Asynchronous, non-blocking SQLite3 bindings
- [webpack](https://github.com/webpack/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.
- [webpack-node-externals](https://github.com/liady/webpack-node-externals): Easily exclude node_modules in Webpack bundle


## License

MIT

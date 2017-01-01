# GraphQL React Starter

GraphQL Node.js Starter is a bloat-less, ORM-free boilerplate using [Node.js](https://nodejs.org/), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript) through [Babel](http://babeljs.io/) and using [GraphQL](http://graphql.org/) for API creations and consumption. For client-side, this uses [React](https://facebook.github.io/react/), [React-Router](https://github.com/ReactTraining/react-router) and [Redux](https://github.com/reactjs/redux). For the database portion, this uses [PostgreSQL](https://www.postgresql.org/) and [SQLite](http://sqlite.org/), accessed through a great query-builder, [Knex.js](http://knexjs.org/)

The purpose of this starter kit is to be as real-world starter as possible while being simple and bloat-free. As far as making this [Universal App](https://medium.com/@mjackson/universal-javascript-4761051b7ae9), it will not be part of the road-map as it's not always needed and often causes code bloat and more issues.

## Installation

You need [Yarn](https://yarnpkg.com/en/docs/install) as [npm](https://www.npmjs.com/) alternative. [Why?](https://github.com/yarnpkg/yarn) Offline mode, deterministic installation, network performance and resilience.

```shell
yarn install
yarn run migrate
yarn run seed

yarn start
```

## Schema 

```
        ┌──refId:userId
        │          │
        ▼          │
┌───────────────┐  │  ┌─────────────────┐     ┌──────────────────────┐
│    <Users>    │  │  │   <Accounts>    │     │    <Transactions>    │
│               │  │  │                 │     │                      │
│   userId:pk   │  │  │  accountId:pk   │     │   transactionId:pk   │
│   refId:fk    │  │  │      name       │     │ transactionTypeId:fk │
│  createdDate  │──┘  │      type       │◀────│     accountId:fk     │
│     name      │     │      total      │     │      sessionId       │
│               │     │   createdDate   │     │        amount        │
│               │     │   updatedDate   │     │         note         │
│               │     │                 │     │     createdDate      │
└───────────────┘     └─────────────────┘     └──────────────────────┘
        ▲                      ▲                          ▲
        │                      │                          │
        │ ┌──────────────────┐ │              ┌──────────────────────┐
        │ │ <Users_Accounts> │ │              │  <TransactionTypes>  │
        │ │                  │ │              │                      │
        └─│   userId:pk,fk   │─┘              │ transactionTypeId:pk │
          │ accountId:pk,fk  │                │         name         │
          └──────────────────┘                └──────────────────────┘
```

## Commands

Note that most commands are dependent upon having NODE_ENV=production|development

```shell
# create new migration script template
yarn run make:migrate add-dashed-description-here

# create seed
yarn run make:seed 002-second-seed

# seed to latest
yarn run seed

# migrate to latest
yarn run migrate

# rollback last batch
yarn run migrate:rollback

# start local server 
yarn start
```

## Roadmap and Plans

- (done) sample db relationships 
- (done) modularize schema/resolvers
- add subscriptions
- production vs development build
- es2015+ everything
- eslint
- react
- graphql client 
- webpack 2 and hot loader
- react router 
- redux 
- authentication
- dockerize
- nginx
- postgres for production
- data loaders and prevent N+1 problems
- static queries 
- "harden" node server
- unit tests 
- [jenkins](https://jenkins.io/)
- deployment scripts
- sample on heroku? aws? do? gcp?
- React Native

## Schema-First Design Steps

This centers your application development around your feature requirements, skewed a bit towards UI. Having the graphql abstraction allows you to focus on features rather than modeling your data and queries based on a rigid database schema.

### Define Schema

Describe the [graphql schema](http://graphql.org/learn/schema/) centered around your front-end requirements. This is not the same as Database Design, though in many cases, the schema could be a direct representation of your table relationships.

### Define Resolvers

Define the [resolvers](http://graphql.org/learn/execution/#root-fields-resolvers), to match entities from your schema

### Create Mocks

Mocking APIs are typically time consuming and often becomes a waste as API changes. [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/mocking.html) has a mocking library that allows you to map values based on types or field names. Very useful, especially if synchronized with mocking library like faker.js or casual.js 

### Create or Update Database

Being that GraphQL is an abstraction that is somewhat geared towards UI requirements, there should be no pressure to map a one-to-one schema between GraphQL schema and Database Schema. Through the resolver, we can morph and transform and even fetch extra data without being constricted with the database schema. This allows for faster iteration and prototyping.
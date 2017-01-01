# GraphQL React Starter

GraphQL Node.js Starter Kit is a boilerplate using [Node.js](https://nodejs.org/), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript) through [Babel](http://babeljs.io/) and using [GraphQL](http://graphql.org/) for API creations and consumption. For client-side, this uses React, React-Router and Redux.

## Core Technologies

- Node
- GraphQL
- PostgreSQL
- React 
- React Router 
- Redux 
- Knex
- Sqlite
- Apollo GraphQL Client

## Installation

```shell
npm install
npm run migrate
npm run seed

npm start
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
npm run make:migrate add-dashed-description-here

# create seed
npm run make:seed 002-second-seed

# seed to latest
npm run seed

# migrate to latest
npm run migrate

# rollback last batch
npm run migrate:rollback

# start local server 
npm start
```

## Roadmap and Plans

- (done) sample db relationships 
- (dont) modularize schema/resolvers
- add subscriptions
- nconf
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
- universal (perhaps overkill?)
- [jenkins](https://jenkins.io/)
- deployment scripts
- sample on heroku? aws? do? gcp?
- React Native

## Schema-First Design Steps

This centers your application development around your feature requirements, skewed a bit towards UI. Having the graphql abstraction allows you to focus on features rather than modeling your data and queries based on a rigid database schema.

### Define Schema

Describe the [graphql schema](http://graphql.org/learn/schema/) centered around your front-end requirements. This is not the same as Database Design, though in many cases, the schema could be a direct representation of your table relationships.

Check out `./data/schema.js` as an example.

### Define Resolvers

Define the [resolvers](http://graphql.org/learn/execution/#root-fields-resolvers), to match entities from your schema

Check out `./data/resolvers.js` as an example.

### Create Mocks

Mocking APIs are typically time consuming and often becomes a waste as API changes. [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/mocking.html) has a mocking library that allows you to map values based on types or field names. Very useful, especially if synchronized with mocking library like faker.js or casual.js 

### Create or Update Database

Being that GraphQL is an abstraction that is somewhat geared towards UI requirements, there should be no pressure to map a one-to-one schema between GraphQL schema and Database Schema. Through the resolver, we can morph and transform and even fetch extra data without being constricted with the database schema. This allows for faster iteration and prototyping.
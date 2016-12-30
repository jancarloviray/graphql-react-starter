# GraphQL React Starter

## Core Technologies

- Node
- Express
- GraphQL
- Knex
- PostgreSQL (prod)
- Sqlite (dev) 
- React 
- React Router 
- Redux 
- Apollo GraphQL Client

## Installation

```shell
npm install
npm run migrate
npm run seed

npm start
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

- sample db relationships
- static queries 
- modularize schema/resolvers
- add subscriptions
- nginx
- nodemon / pm2
- dockerize
- postgres (prod) and sqlite (dev) must be compatible
- nconf
- production vs development build
- "harden" node server
- integration tests: sqlite and pg 
- unit tests 
- es2015+ everything
- eslint
- react
- graphql client 
- webpack 2 and hot loader
- react router 
- redux 
- authentication
- apply best practices!
- universal??? perhaps overkill..
- CI: Travis? Jenkins?
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


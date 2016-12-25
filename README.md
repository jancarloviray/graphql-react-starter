# GraphQL React Starter

## Installation

```shell
npm install
npm start
```

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


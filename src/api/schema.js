const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')

const Account = require('./models/Account')
const RootMutation = require('./models/RootMutation')
const RootQuery = require('./models/RootQuery')
const Transaction = require('./models/Transaction')
const TransactionType = require('./models/TransactionType')
const User = require('./models/User')

const schema = [`
    schema {
        query: Query
        mutation: Mutation
    }
`]

const typeDefs = [
  ...Account.schema,
  ...RootMutation.schema,
  ...RootQuery.schema,
  ...Transaction.schema,
  ...TransactionType.schema,
  ...User.schema,
  ...schema,
]

const resolvers = merge(
    Account.resolvers,
    RootMutation.resolvers,
    RootQuery.resolvers,
    Transaction.resolvers,
    TransactionType.resolvers,
    User.resolvers
)

module.exports = makeExecutableSchema({ typeDefs, resolvers })

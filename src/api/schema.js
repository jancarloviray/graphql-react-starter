import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import * as Account from './models/Account'
import * as RootMutation from './models/RootMutation'
import * as RootQuery from './models/RootQuery'
import * as Transaction from './models/Transaction'
import * as TransactionType from './models/TransactionType'
import * as User from './models/User'

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

export default makeExecutableSchema({ typeDefs, resolvers })
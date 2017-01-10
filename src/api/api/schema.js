import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import * as Account from '../schema/Account'
import * as RootMutation from '../schema/RootMutation'
import * as RootQuery from '../schema/RootQuery'
import * as Transaction from '../schema/Transaction'
import * as TransactionType from '../schema/TransactionType'
import * as User from '../schema/User'

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
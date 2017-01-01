import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import Account from '../schema/Account'
import RootMutation from '../schema/RootMutation'
import RootQuery from '../schema/RootQuery'
import Transaction from '../schema/Transaction'
import TransactionType from '../schema/TransactionType'
import User from '../schema/User'

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
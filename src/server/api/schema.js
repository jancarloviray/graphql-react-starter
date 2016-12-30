import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// notice how UI specific these are, and not equal to db schema
// and how these are singular compared to database (pluralized)
const types = [`
type User {
    userId: Int!
    referrer: User
    createdDate: String
    name: String!
    accounts: [Account]
}

type Account {
    accountId: Int!
    name: String
    type: String
    total: Int!
    createdDate: String
    updatedDate: String
    owners: [User]
}

type Transaction {
    transactionId: Int!
    transactionTypeId: Int
    account: Account
    amount: Int!
    note: String
    createdDate: String
}

type TransactionType {
    transactionTypeId: Int!
    type: String
}
`]

const queries = [`
type Query {
    users: [User]

    accounts: [Account]

    transactions: [Transaction]

    transactionTypes: [TransactionType]

    getWithdrawals(
        accountId: Int!
    ): [Transaction]

    getDeposits(
        accountId: Int!
    ): [Transaction]
}
`]

const mutations = [`
type Mutation {
    createUser(
        name: String!,
        referrer: Int
    ): User

    createAccount(
        name: String,
        type: Int,
        total: Int
    ): Account

    createTransaction(
        type: Int,
        account: Int,
        amount: Int,
        note: String
    ): Account
}
`]

const root = [`
schema {
    query: Query 
    mutation: Mutation
}
`]

const schema = [
    ...types,
    ...queries,
    ...mutations,
    ...root
]

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers
})
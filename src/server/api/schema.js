import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// notice how UI specific these are, and not equal to db schema
// and how these are singular compared to database (pluralized)
const types = [`
type User {
    userId: Int!
    createdDate: String
    name: String!

    # Referrer is an existing User 
    # that gets credit for referring a 
    # new User.
    referrer: User

    # User's currently available accounts
    accounts: [Account]
}

type Account {
    accountId: Int!
    name: String
    # Defines checking or saving
    type: String
    total: Int!
    createdDate: String
    updatedDate: String

    # Defines who owns this account
    owners: [User]
}

type Transaction {
    transactionId: Int!
    transactionTypeId: Int
    amount: Int!
    note: String
    createdDate: String

    # What account is this transaction 
    # made to?
    account: Account
}

# Used for Transaction.type and defines 
# whether an account is checking or savings
type TransactionType {
    transactionTypeId: Int!
    name: String
}
`]

const queries = [`
type Query {
    users(
        userId: Int 
    ): [User]

    accounts(
        accountId: Int
    ): [Account]

    transactions(
        transactionId: Int
        transactionTypeId: Int
    ): [Transaction]

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
    # Creates a new User and returns its Id
    createUser(
        name: String!,
        # Id of another User who referred this current one
        refId: Int
    ): [Int]

    # Creates a new Account and returns its Id
    createAccount(
        name: String,
        type: String,
        total: Int
    ): [Int]

    # Creates a new Transaction and returns its Id
    createTransaction(
        transactionTypeId: Int,
        accountId: Int,
        amount: Int,
        note: String
    ): [Int]
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
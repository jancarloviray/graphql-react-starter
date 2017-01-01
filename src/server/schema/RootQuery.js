import db from '../../db/lib/db'

const schema = [`
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

const resolvers = {
    Query: {
        async users(root, { userId }) {
            return userId ?
                db.select('*').from('Users').where({ userId }) :
                db.select('*').from('Users').limit(5)
        },
        async accounts(_, { accountId }) {
            return accountId ?
                db.select('*').from('Accounts').where({ accountId }) :
                db.select('*').from('Accounts').limit(5)
        },
        async transactions(_, args) {
            return db.select('*').from('Transactions').where(args)
        },
        async transactionTypes() {
            return db.select('*').from('TransactionTypes')
        },
        async getWithdrawals(_, { accountId }) {
            return await db
                .select('*')
                .from('Transactions')
                .where({
                    transactionTypeId: 1,
                    accountId,
                }) || null
        },
        async getDeposits(_, { accountId }) {
            return await db
                .select('*')
                .from('Transactions')
                .where({
                    transactionTypeId: 2,
                    accountId,
                }) || null
        }
    }
}

export default {
    schema,
    resolvers
}
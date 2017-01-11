import db from '../../data/lib/db'

export const schema = [`
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

export const resolvers = {
    Query: {
        async users(root, { userId }) {
            return userId ?
                db.select('*').from('Users').where({ userId }) :
                db.select('*').from('Users')
        },
        async accounts(_, { accountId }) {
            return accountId ?
                db.select('*').from('Accounts').where({ accountId }) :
                db.select('*').from('Accounts')
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

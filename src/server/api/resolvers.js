import db from '../../db/lib/db'

/**
 *  Resolvers are functions mapped to the defined schema
 *  (fieldName: (root, args, context, info) => result)
 * 
 *  `root`: result returned from the resolver of parent field. This argument 
 *  is what enables the nested nature of GraphQL.
 *  `args`: arguments passed into the field in the query.
 *  `context`: an object shared by all resolvers in a particular query 
 *  and is used to contain per-request state including auth info, dataloader 
 *  and anything that should be taken into account for the particular query
 */

const resolverMap = {
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
    },
    Mutation: {
        async createUser(_, args) {
            return await db.insert(args).into('Users').returning('*')
        },
        async createAccount(_, args) {
            return await db.insert(args).into('Accounts').returning('*')
        },
        async createTransaction(_, args) {
            args.sessionId = 'someRandomSesseionGUID'
            return await db.insert(args).into('Transactions').returning('*')
        }
    },
    User: {
        async referrer({ refId }) {
            return refId ? db
                .select('*')
                .from('Users')
                .where({ userId: refId })
                .first() : null
        },
        async accounts({ userId }) {
            return await db
                .select('Accounts.*')
                .from('Users_Accounts')
                .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
                .join('Users', 'Users_Accounts.userId', 'Users.userId')
                .where('Users.userId', userId) || null
        }
    },
    Account: {
        async owners({ accountId }) {
            return await db
                .select('Users.*')
                .from('Users_Accounts')
                .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
                .join('Users', 'Users_Accounts.userId', 'Users.userId')
                .where('Accounts.accountId', accountId) || null
        }
    },
    Transaction: {
        async account({ accountId }) {
            return await db
                .select('*')
                .from('Accounts')
                .where({ accountId: accountId })
                .first() || null
        }
    }
}

export default resolverMap
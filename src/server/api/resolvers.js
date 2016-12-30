import db from '../../db/lib/db'

/**
 *  Resolvers are functions mapped to the defined schema
 *  (fieldName: (root, args, context, info) => result)
 *  http://dev.apollodata.com/tools/graphql-tools/resolvers.html
 * 
 *  `root`: result returned from the resolver of parent field. This argument 
 *  is what enables the nested nature of GraphQL.
 *  `args`: an object with the arguments passed into the field in the query.
 *  `context`: this is an object shared by all resolvers in a particular query 
 *  and is used to contain per-request state including auth info, dataloader 
 *  and anything else that should be taken into account when resolving the query
 */

const resolverMap = {
    Query: {
        async users() {
            return db.select('*').from('Users')
        },
        async accounts() {
            return db.select('*').from('Accounts')
        },
        async transactions() {
            return db.select('*').from('Transactions')
        },
        async transactionTypes() {
            return db.select('*').from('TransactionTypes')
        },
        async getWithdrawals(_, { accountId }) {
            const query = await db
                .select('*')
                .from('Transactions')
                .where({
                    transactionTypeId: 1,
                    accountId,
                })

            return query ? query : null
        },
        async getDeposits(_, { accountId }) {
            const query = await db
                .select('*')
                .from('Transactions')
                .where({
                    transactionTypeId: 2,
                    accountId,
                })

            return query ? query : null
        }
    },
    Mutation: {
    },

    // resolving custom fields
    User: {
        async referrer(user) {
            if (!user.refId) {
                return null
            }

            return db
                .select('*')
                .from('Users')
                .where({ userId: user.refId })
                .first()
        },
        async accounts(user) {
            const query = await db
                .select('Accounts.*')
                .from('Users_Accounts')
                .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
                .join('Users', 'Users_Accounts.userId', 'Users.userId')
                .where('Users.userId', user.userId)

            return query ? query : null
        }
    },
    Account: {
        async owners(account) {
            const query = await db
                .select('Users.*')
                .from('Users_Accounts')
                .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
                .join('Users', 'Users_Accounts.userId', 'Users.userId')
                .where('Accounts.accountId', account.accountId)

            return query ? query : null
        }
    },
    Transaction: {
        async account(transaction) {
            return await db
                .select('*')
                .from('Accounts')
                .where({ accountId: transaction.accountId })
                .first()
        },
    },
    TransactionType: {

    }
}

export default resolverMap
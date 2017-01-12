const db = require('../data/lib/db')

exports.schema = [`
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

exports.resolvers = {
  Query: {
    users(root, { userId }) {
      return userId ?
                db.select('*').from('Users').where({ userId }) :
                db.select('*').from('Users')
    },
    accounts(_, { accountId }) {
      return accountId ?
                db.select('*').from('Accounts').where({ accountId }) :
                db.select('*').from('Accounts')
    },
    transactions(_, args) {
      return db.select('*').from('Transactions').where(args)
    },
    transactionTypes() {
      return db.select('*').from('TransactionTypes')
    },
    getWithdrawals(_, { accountId }) {
      return  db
                .select('*')
                .from('Transactions')
                .where({
                  transactionTypeId: 1,
                  accountId,
                }) || null
    },
    getDeposits(_, { accountId }) {
      return  db
                .select('*')
                .from('Transactions')
                .where({
                  transactionTypeId: 2,
                  accountId,
                }) || null
    }
  }
}

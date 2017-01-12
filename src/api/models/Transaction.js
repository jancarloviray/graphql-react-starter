const db = require('../data/lib/db')

exports.schema = [`
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
`]

exports.resolvers = {
  Transaction: {
    account({ accountId }) {
      return  db
                .select('*')
                .from('Accounts')
                .where({ accountId: accountId })
                .first() || null
    }
  }
}

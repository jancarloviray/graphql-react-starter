const db = require('../../db/lib/db')

exports.schema = [`
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
`]

exports.resolvers = {
  Account: {
    owners({ accountId }) {
      return db
        .select('Users.*')
        .from('Users_Accounts')
        .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
        .join('Users', 'Users_Accounts.userId', 'Users.userId')
        .where('Accounts.accountId', accountId) || null
    }
  },
}

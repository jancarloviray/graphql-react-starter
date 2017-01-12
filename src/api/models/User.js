const db = require('../data/lib/db')

exports.schema = [`
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
`]

exports.resolvers = {
  User: {
    referrer({ refId }) {
      return refId ? db
                .select('*')
                .from('Users')
                .where({ userId: refId })
                .first() : null
    },
    accounts({ userId }) {
      return  db
                .select('Accounts.*')
                .from('Users_Accounts')
                .join('Accounts', 'Users_Accounts.accountId', 'Accounts.accountId')
                .join('Users', 'Users_Accounts.userId', 'Users.userId')
                .where('Users.userId', userId) || null
    }
  }
}

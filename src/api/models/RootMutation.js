const db = require('../../db/lib/db')

exports.schema = [`
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

exports.resolvers = {
  Mutation: {
    createUser(_, args) {
      return db.insert(args).into('Users').returning('*')
    },
    createAccount(_, args) {
      return  db.insert(args).into('Accounts').returning('*')
    },
    createTransaction(_, args) {
      args.sessionId = 'someRandomSesseionGUID'
      return  db.insert(args).into('Transactions').returning('*')
    }
  },
}

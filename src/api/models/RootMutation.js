import db from '../../data/lib/db'

export const schema = [`
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

export const resolvers = {
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
}

import db from '../../db/lib/db'

export const schema = [`
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

export const resolvers = {
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
    }
}

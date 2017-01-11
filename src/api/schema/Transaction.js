import db from '../../data/lib/db'

export const schema = [`
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

export const resolvers = {
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

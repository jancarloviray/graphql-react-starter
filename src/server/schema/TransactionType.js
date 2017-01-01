import db from '../../db/lib/db'

const schema = [`
    # Used for Transaction.type and defines 
    # whether an account is checking or savings
    type TransactionType {
        transactionTypeId: Int!
        name: String
    }
`]

const resolvers = {
    TransactionType: {}
}

export default {
    schema,
    resolvers
}
export const schema = [`
    # Used for Transaction.type and defines 
    # whether an account is checking or savings
    type TransactionType {
        transactionTypeId: Int!
        name: String
    }
`]

export const resolvers = {
    TransactionType: {}
}

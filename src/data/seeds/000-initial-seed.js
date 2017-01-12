const casual = require('casual')
const _ = require('lodash')

casual.seed(123)

const numUsersSeed = 10
const users = _.concat(
    { refId: null, name: casual.name },
    _.times(numUsersSeed, () => ({
        refId: casual.random_element([null, 1, 2, 3]),
        name: casual.name
    }))
)

const numAccountSeed = 5
const accounts = _.times(numAccountSeed, () => ({
    name: casual.word,
    type: casual.random_element(['checking', 'savings']),
    total: casual.double(0, 100000),
}))

const users_accounts = _.times(10, () => ({
    userId: casual.integer(1, numUsersSeed),
    accountId: casual.integer(1, numAccountSeed),
}))

const transactionTypes = [
    { transactionTypeId: 1, name: 'withdraw' },
    { transactionTypeId: 2, name: 'deposit' }
]

// on sql insert from app, must subtract or add from account, based on 
// transaction type but this is ok for seed
const numTransactionSeed = 100
const transactions = _.times(numTransactionSeed, () => ({
    transactionTypeId: casual.random_element([1, 2]),
    accountId: casual.integer(1, numAccountSeed),
    sessionId: casual.title.replace(/\s/g, ''),
    amount: casual.double(1, 100),
    note: casual.sentence,
}))

exports.seed = function (knex) {
    return knex.transaction((trx) => {
        Promise.all([
            // delete tables
            knex('Users_Accounts').transacting(trx).del(),
            knex('Transactions').transacting(trx).del(),
            knex('Users').transacting(trx).del(),
            knex('Accounts').transacting(trx).del(),
            knex('TransactionTypes').transacting(trx).del(),
            // insert data
            knex('Users').transacting(trx).insert(users),
            knex('Accounts').transacting(trx).insert(accounts),
            knex('Users_Accounts').transacting(trx).insert(users_accounts),
            knex('TransactionTypes').transacting(trx).insert(transactionTypes),
            knex('Transactions').transacting(trx).insert(transactions),
        ]).then(trx.commit).catch(trx.rollback)
    })
}
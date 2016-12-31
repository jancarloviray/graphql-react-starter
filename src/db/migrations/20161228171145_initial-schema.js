
/*
        ┌──refId:userId
        │          │
        ▼          │
┌───────────────┐  │  ┌─────────────────┐     ┌──────────────────────┐
│    <Users>    │  │  │   <Accounts>    │     │    <Transactions>    │
│               │  │  │                 │     │                      │
│   userId:pk   │  │  │  accountId:pk   │     │   transactionId:pk   │
│   refId:fk    │  │  │      name       │     │ transactionTypeId:fk │
│  createdDate  │──┘  │      type       │◀────│     accountId:fk     │
│     name      │     │      total      │     │      sessionId       │
│               │     │   createdDate   │     │        amount        │
│               │     │   updatedDate   │     │         note         │
│               │     │                 │     │     createdDate      │
└───────────────┘     └─────────────────┘     └──────────────────────┘
        ▲                      ▲                          ▲
        │                      │                          │
        │ ┌──────────────────┐ │              ┌──────────────────────┐
        │ │ <Users_Accounts> │ │              │  <TransactionTypes>  │
        │ │                  │ │              │                      │
        └─│   userId:pk,fk   │─┘              │ transactionTypeId:pk │
          │ accountId:pk,fk  │                │         name         │
          └──────────────────┘                └──────────────────────┘
*/

exports.up = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('Users')
        .dropTableIfExists('Accounts')
        .dropTableIfExists('Users_Accounts')
        .dropTableIfExists('Transactions')
        .dropTableIfExists('TransactionTypes')

        .createTable('Users', (table) => {
            table.increments('userId').primary()
            table.integer('refId')
                .references('Users.userId')
                .comment('Represents referral Id')
            table.text('name').notNullable()
            table.dateTime('createdDate').defaultTo(knex.fn.now())
        })

        .createTable('Accounts', (table) => {
            table.increments('accountId').primary()
            table.string('name')
            table.string('type')
                .notNullable()
            table.decimal('total', 10, 2).defaultTo(0)
            table.dateTime('createdDate')
                .notNullable()
                .defaultTo(knex.fn.now())
            table.dateTime('updatedDate')
                .notNullable()
                .defaultTo(knex.fn.now())
        })

        .createTable('Users_Accounts', (table) => {
            table.integer('accountId')
                .references('Accounts.accountId')
            table.integer('userId')
                .references('Users.userId')
        })

        .createTable('TransactionTypes', (table) => {
            table.increments('transactionTypeId')
            table.string('name').notNullable()
        })

        .createTable('Transactions', (table) => {
            table.increments('transactionId').primary()
            table.integer('transactionTypeId')
                .notNullable()
                .references('TransactionTypes.transactionTypeId')
            table.integer('accountId')
                .notNullable()
                .references('Accounts.accountId')
            table.string('sessionId')
                .notNullable()
                .comment('Login session id')
            table.decimal('amount', 10, 2)
                .notNullable()
                .defaultTo(0)
            table.string('note')
            table.dateTime('createdDate')
                .notNullable()
                .defaultTo(knex.fn.now())
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('Users')
        .dropTableIfExists('Accounts')
        .dropTableIfExists('Users_Accounts')
        .dropTableIfExists('Transactions')
        .dropTableIfExists('TransactionTypes')
};

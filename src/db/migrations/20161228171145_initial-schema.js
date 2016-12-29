
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('authors', (table) => {
            table.increments('id').primary()
            table.text('firstName').notNullable()
            table.text('lastName').notNullable()
        }),
        knex.schema.createTableIfNotExists('posts', (table) => {
            table.increments('id').primary()
            table.text('title').notNullable()
            table.integer('voteCount').defaultTo(0)
            table.integer('authorId').references('author.id')
        })
    ]).catch(reason => console.log(reason))
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('authors'),
        knex.schema.dropTableIfExists('posts')
    ]).catch(reason => console.log(reason))
};

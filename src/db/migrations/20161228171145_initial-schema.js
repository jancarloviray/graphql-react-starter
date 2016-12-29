
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('authors', (table) => {
            table.increments('id').primary()
            table.text('firstName')
            table.text('lastName')
        }),
        knex.schema.createTableIfNotExists('posts', (table) => {
            table.increments('id').primary()
            table.text('title')
            table.integer('votes')
            table.integer('authorId').references('id').inTable('author')
        })
    ]).catch(reason => console.log(reason))
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('authors'),
        knex.schema.dropTableIfExists('posts')
    ]).catch(reason => console.log(reason))
};

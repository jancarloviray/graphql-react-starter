var casual = require('casual')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      let id = 1;
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
        knex('posts').insert({id: id++, title: casual.title, votes: casual.integer(0,20), authorId: casual.integer(1,5)}),
      ]);
    });
};

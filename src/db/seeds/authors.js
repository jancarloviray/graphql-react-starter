var casual = require('casual')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      let id = 1
      return Promise.all([
        // Inserts seed entries
        knex('authors').insert({id: id++, firstName: casual.first_name, lastName: casual.last_name}),
        knex('authors').insert({id: id++, firstName: casual.first_name, lastName: casual.last_name}),
        knex('authors').insert({id: id++, firstName: casual.first_name, lastName: casual.last_name}),
        knex('authors').insert({id: id++, firstName: casual.first_name, lastName: casual.last_name}),
        knex('authors').insert({id: id++, firstName: casual.first_name, lastName: casual.last_name}),
      ]);
    });
};

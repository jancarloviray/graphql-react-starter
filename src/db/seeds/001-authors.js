const casual = require('casual')
const _ = require('lodash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      let id = 1
      let max = 100
      let rows = _.times(max, () => ({
        firstName: casual.first_name, 
        lastName: casual.last_name
      }))
      return Promise.all([
        // Inserts seed entries
        knex('authors').insert(rows)
      ]);
    });
};

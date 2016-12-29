const casual = require('casual')
const _ = require('lodash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      let id = 1;
      let max = 200
      let rows = _.times(max, () => ({
        title: casual.title, 
        voteCount: casual.integer(0,20), 
        authorId: casual.integer(1,max)
      }))
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert(rows),
      ]);
    });
};

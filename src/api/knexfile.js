const path = require('path')

const config = {
  development: {
    client: 'sqlite3',
    debug: process.env.NODE_ENV === 'development',
    connection: {
      filename: path.resolve(__dirname, './devdb.sqlite3'),
    },
    seeds: {
      directory: './data/seeds'
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 10,
      afterCreate: function (conn, cb) {
        conn.run('PRAGMA foreign_keys=ON', cb)
      }
    }
  },
  production: {
    client: 'pg',
    debug: false,
    connection: {
      host: 'localhost',
      user: 'postgres',
      database: 'app',
      password: 'pass'
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
  }
}

module.exports = config

const path = require('path')

const config = {
  development: {
    client: 'sqlite3',
    debug: process.env.NODE_ENV === 'development',
    connection: {
      filename: path.resolve(__dirname, '../db/devdb.sqlite3'),
    },
    seeds: {
      directory: '../db/seeds'
    },
    migrations: {
      directory: '../db/migrations',
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
    debug: process.env.NODE_ENV === 'development',
    connection: {
      host: process.env.POSTGRES_HOST || 'db',
      user: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    },
  }
}

module.exports = config

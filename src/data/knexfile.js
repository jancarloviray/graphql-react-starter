module.exports = {
    development: {
        client: 'sqlite3',
        debug: true,
        connection: {
            filename: './dev.sqlite3',
        },
        seeds: {
            directory: './seeds'
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        useNullAsDefault: true,
        pool: {
            min: 1,
            max: 10,
            afterCreate: function(conn, cb){
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
            directory: './migrations',
            tableName: 'knex_migrations'
        },
    }
}

module.exports = {
    development: {
        debug: true,
        client: 'sqlite3',
        connection: {
            filename: './dev-db.sqlite3',
        },
        seeds: {
            directory: './src/db/seeds'
        },
        migrations: {
            directory: './src/db/migrations'
        },
        useNullAsDefault: true
    },
    // production: {
    //     client: 'pg',
    //     connection: {
    //         user: 'me',
    //         database: 'my_app'
    //     },
    //     migrations: {
    //         directory: './src/database/migrations'
    //     },
    // }
};

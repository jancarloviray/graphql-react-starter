const knex = require('knex')
const knexfile = require('../../api/knexfile')
const debug = require('debug')
const util = require('util')

const log = debug('app:db')

const env = process.env.NODE_ENV
const config = knexfile[env]

log(`Connected to ${config.client} with parameters: ${util.inspect(config.connection, { colors: true })}`)

module.exports = knex(config)

import knex from 'knex'
import knexfile from '../knexfile'
import debug from 'debug'
import util from 'util'

const log = debug('app:data')

const env = process.env.NODE_ENV
const config = knexfile[env]

log(`Connected to ${config.client} with parameters: ${util.inspect(config.connection, { colors: true })}`)

export default knex(config)
import bookshelf from 'bookshelf'
import knex from 'knex'
import { development } from '../../../knexfile'

export default bookshelf(knex(development))
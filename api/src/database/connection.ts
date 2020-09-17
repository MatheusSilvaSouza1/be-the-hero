import Knex from 'knex'

const configuration =  require('../../knexfile')

const connection = Knex(configuration.development)

export {connection}
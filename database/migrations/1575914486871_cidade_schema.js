'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidadeSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments()
      table.varchar('nome_cidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadeSchema

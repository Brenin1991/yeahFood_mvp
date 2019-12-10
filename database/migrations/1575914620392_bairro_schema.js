'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BairroSchema extends Schema {
  up () {
    this.create('bairros', (table) => {
      table.increments()
      table.varchar('nome_bairro').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bairros')
  }
}

module.exports = BairroSchema

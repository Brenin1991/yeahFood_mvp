'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BairroSchema extends Schema {
  up () {
    this.create('bairros', (table) => {
      table.increments()
      table.integer('cidade_id').references('id').inTable('cidades')
      table.timestamps()
    })
  }

  down () {
    this.drop('bairros')
  }
}

module.exports = BairroSchema

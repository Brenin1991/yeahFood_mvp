'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidadeSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments()
      table.integer('estado_id').references('id').inTable('estados')
      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadeSchema

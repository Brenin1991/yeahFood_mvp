'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentoSchema extends Schema {
  up () {
    this.create('pagamentos', (table) => {
      table.increments()
      table.string('tipo', 45).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pagamentos')
  }
}

module.exports = PagamentoSchema

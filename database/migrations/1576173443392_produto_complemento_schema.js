'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoComplementoSchema extends Schema {
  up () {
    this.create('produto_complementos', (table) => {
      table.increments()
      table.integer('produto_id').references('id').inTable('produtos')
      table.integer('complemento_id').references('id').inTable('complementos')
      table.timestamps()
    })
  }

  down () {
    this.drop('produto_complementos')
  }
}

module.exports = ProdutoComplementoSchema

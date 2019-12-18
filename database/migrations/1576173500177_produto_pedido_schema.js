'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoPedidoSchema extends Schema {
  up () {
    this.create('produto_pedidos', (table) => {
      table.increments()
      table.integer('produto_id').references('id').inTable('produtos')
      table.integer('pedido_id').references('id').inTable('pedidos')
      table.integer('quantidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produto_pedidos')
  }
}

module.exports = ProdutoPedidoSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoProdutoSchema extends Schema {
  up () {
    this.create('pedido_produtos', (table) => {
      table.increments()
      table.integer('quantidade')
      table.integer('pedido_id').references('id').inTable('pedidos').notNullable()
      table.integer('produto_id').references('id').inTable('produtos').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_produtos')
  }
}

module.exports = PedidoProdutoSchema

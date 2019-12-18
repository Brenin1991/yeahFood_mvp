'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome', 45).notNullable()
      table.string('descricao', 255).notNullable()
      table.string('imagem', 100).notNullable()
      table.float('preco').notNullable()
      table.boolean('disponivel').defaultTo(0)
      table.integer('categoria_id').references('id').inTable('categorias')
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema

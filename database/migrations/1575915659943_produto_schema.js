'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.varchar('nome').notNullable()
      table.varchar('descricao')
      table.varchar('imagem')
      table.float('preco')
      table.integer('categoria_id').references('id').inTable('categorias').notNullable()
      table.boolean('disponivel')
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema

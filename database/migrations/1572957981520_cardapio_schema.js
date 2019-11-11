'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardapioSchema extends Schema {
  up () {
    this.create('cardapios', (table) => {
      table.increments()
      table.string('nome', 45).notNullable()
      table.string('descricao', 500).notNullable()
      table.string('imagem', 255).notNullable()
      table.string('preco', 45).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cardapios')
  }
}

module.exports = CardapioSchema

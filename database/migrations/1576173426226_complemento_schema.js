'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplementoSchema extends Schema {
  up () {
    this.create('complementos', (table) => {
      table.increments()
      table.string('descricao', 255).notNullable()
      table.float('preco').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('complementos')
  }
}

module.exports = ComplementoSchema

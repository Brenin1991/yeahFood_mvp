'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplementoSchema extends Schema {
  up () {
    this.create('complementos', (table) => {
      table.increments()
      table.varchar('descricao').notNullable()
      table.float('valor').notNullable()
      table.integer('produto_id').references('id').inTable('produtos').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('complementos')
  }
}

module.exports = ComplementoSchema

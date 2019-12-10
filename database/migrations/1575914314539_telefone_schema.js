'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.increments()
      table.varchar('telefone').notNullable()
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefoneSchema

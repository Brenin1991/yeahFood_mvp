'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SistemaSchema extends Schema {
  up () {
    this.create('sistema', (table) => {
      table.increments()
      table.string('nome', 45).notNullable()
      table.string('email', 45).notNullable()
      table.string('senha', 45).notNullable()
      table.boolean('atendendo').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('sistemas')
  }
}

module.exports = SistemaSchema

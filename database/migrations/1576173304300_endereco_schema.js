'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('rua', 255).notNullable()
      table.integer('numero').notNullable()
      table.string('ponto_referencia', 255)
      table.integer('user_id').references('id').inTable('users')
      table.integer('bairro_id').references('id').inTable('bairros')
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema

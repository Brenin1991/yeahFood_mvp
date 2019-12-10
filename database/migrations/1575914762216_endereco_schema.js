'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.varchar('nome_rua').notNullable()
      table.varchar('numero_rua').notNullable()
      table.integer('cidade_id').references('id').inTable('cidades').notNullable()
      table.integer('bairro_id').references('id').inTable('bairros').notNullable()
      table.varchar('latitude')
      table.varchar('longitude')
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema

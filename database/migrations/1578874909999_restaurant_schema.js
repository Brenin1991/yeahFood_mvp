'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('descricao', 255).notNullable()
      table.string('imagem', 100).notNullable()
      table.boolean('atendendo').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema

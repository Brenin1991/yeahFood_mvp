'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class YeahFoodControllerSchema extends Schema {
  up () {
    this.create('yeah_food_controllers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('yeah_food_controllers')
  }
}

module.exports = YeahFoodControllerSchema

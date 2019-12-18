'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bairro extends Model {
	cidade () {
    	return this.belongsTo('App/Models/Cidade')
  	}
}

module.exports = Bairro

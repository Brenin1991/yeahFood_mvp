'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Endereco extends Model {
	bairro () {
    	return this.hasOne('App/Models/Bairro')
  	}

  	user () {
    	return this.belongsTo('App/Models/User')
  	}
}

module.exports = Endereco

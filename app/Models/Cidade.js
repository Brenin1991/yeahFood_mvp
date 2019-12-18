'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cidade extends Model {
	bairros () {
    	return this.hasMany('App/Models/Bairro')
  	}
}

module.exports = Cidade

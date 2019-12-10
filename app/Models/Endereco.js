'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Endereco extends Model {
	bairros () {
    	return this.hasOne('App/Models/Bairro')
  	}

  	cidades () {
    	return this.hasOne('App/Models/Cidade')
  	}
}

module.exports = Endereco

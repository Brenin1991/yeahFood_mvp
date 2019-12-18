'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProdutoComplemento extends Model {
	produtos () {
    	return this.hasMany('App/Models/Produto')
  	}

  	complementos () {
    	return this.hasMany('App/Models/Complemento')
  	}


}

module.exports = ProdutoComplemento

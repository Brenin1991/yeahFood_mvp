'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
	pedido_produtos () {
    	return this.hasMany('App/Models/PedidoProduto')
  	}

  	complementos () {
    	return this.hasMany('App/Models/Complemento')
  	}
}

module.exports = Produto

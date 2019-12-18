'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProdutoPedido extends Model {
	produtos () {
    	return this.hasMany('App/Models/Produto')
  	}

  	pedidos () {
    	return this.hasMany('App/Models/Pedido')
  	}

}

module.exports = ProdutoPedido

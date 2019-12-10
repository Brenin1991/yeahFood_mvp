'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
	pedido_produtos () {
    	return this.hasMany('App/Models/PedidoProduto')
  	}
}

module.exports = Pedido

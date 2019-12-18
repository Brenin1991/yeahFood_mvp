'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
	pagamento () {
    	return this.hasOne('App/Models/Pagamento')
  	}
}

module.exports = Pedido

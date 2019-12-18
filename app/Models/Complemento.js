'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Complemento extends Model {
	complementos () {
    	return this.belongsToMany('App/Models/Complemento')
    	.pivotTable('produto_complementos')
    	.pivotModel('App/Models/ProdutoComplemento')
  	}
}

module.exports = Complemento

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
	categoria () {
    	return this.hasOne('App/Models/Categoria')
  	}

  	complementos () {
    	return this.belongsToMany('App/Models/Complemento')
    	.pivotTable('produto_complementos')
    	.pivotModel('App/Models/ProdutoComplemento')
  	}
}

module.exports = Produto

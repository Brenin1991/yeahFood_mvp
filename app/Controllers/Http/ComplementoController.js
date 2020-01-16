'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const ProdutoComplemento = use('App/Models/ProdutoComplemento')
const Complemento = use('App/Models/Complemento')
/**
 * Resourceful controller for interacting with complementos
 */
class ComplementoController {
  /**
   * Show a list of all complementos.
   * GET complementos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new complemento.
   * GET complementos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({request, response, view }) {
    return view.render('admin.cardapio.complemento.create')
  }

  /**
   * Create/save a new complemento.
   * POST complementos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const complemento = await Database.table('complementos').insert({
      descricao: request.input('descricao'),
      preco: request.input('preco')
    })
  
    response.redirect(`/cardapio`)
  }

  async adicionar ({ params, request, response }) {
    const complementos = request.collect(['complemento_id'])
    const produto_id = request.input('produto_id')

    for (let i = 0; i < complementos.length; i++){
      const complemento_id = complementos[i].complemento_id
      const produtoComplemento = await Database.table('produto_complementos').insert({
        produto_id: produto_id,
        complemento_id: complemento_id
      })
    }
    //
  
    response.redirect(`/cardapio`)
  }
  /**
   * Display a single complemento.
   * GET complementos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing complemento.
   * GET complementos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update complemento details.
   * PUT or PATCH complementos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a complemento with id.
   * DELETE complementos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    const produtoComplemento = await ProdutoComplemento.find(id)

    await produtoComplemento.delete()
    response.redirect('/cardapio')
  }
}

module.exports = ComplementoController

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const Categoria = use('App/Models/Categoria')
const Produto = use('App/Models/Produto')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with categorias
 */
class CategoriaController {
  /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new categoria.
   * GET categorias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, auth}) {
    const categorias = (await Database.select('*').from('categorias').where('id_restaurant', auth.user.id_restaurant))
    return view.render('admin.cardapio.categoria.create', {categorias, title: `Categoria`})
  }

  /**
   * Create/save a new categoria.
   * POST categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, session, response, auth }) {
    const msg = {
      'nome.required':`Campo obrigatório.`,
      'nome.min':`Deve ter mais de 5 caracteres.`
    }

    const validation = await validate(request.all(), {
      nome: 'required|min:5'
    }, msg)

    if (validation.fails()) {
      session.flash({
        notification: {
          type: `danger`,
          message: `Os campos * são obrigatórios.`
        }
      })

      session.withErrors(validation.messages())

      return response.redirect('back')
    }

    const categoria = await Categoria.create({
      nome: request.input('nome'),
      id_restaurant: auth.user.id_restaurant
    })
  
    response.redirect('back')
  }

  /**
   * Display a single categoria.
   * GET categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing categoria.
   * GET categorias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update categoria details.
   * PUT or PATCH categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a categoria with id.
   * DELETE categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    
    const produtos = await Produto.query().where('categoria_id', id).delete()
    const categoria = await Categoria.query().where('id', id).delete()

    response.redirect('back')
  }
}

module.exports = CategoriaController

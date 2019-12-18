'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database');
const Produto = use('App/Models/Produto');
const User = use('App/Models/User');
const Endereco = use('App/Models/Endereco');
const Telefone = use('App/Models/Telefone');
const Categoria = use('App/Models/Categoria');
/**
 * Resourceful controller for interacting with yeahfoods
 */
class YeahFoodController {
  /**
   * Show a list of all yeahfoods.
   * GET yeahfoods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const produtos = (await Database.select('*').from('produtos').where('disponivel', true))

    return view.render('home', {produtos})
  }

  async dashboard ({ request, response, view }) {

    return view.render('admin.home')
  }

  async minhaConta ({ request, response, view, auth }) {
    const user = await User.find(auth.user.id)
    const endereco = (await Database.select('*').from('enderecos').where('user_id', user.id))
    const telefones = (await Database.select('*').from('telefones').where('user_id', user.id))
    const count = await Database
      .from('pedidos').where('user_id', user.id)
      .count()

    const pedidos = count[0].count

    return view.render('auth.conta', {user, endereco, telefones, pedidos})
  }

  /**
   * Render a form to be used for creating a new yeahfood.
   * GET yeahfoods/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new yeahfood.
   * POST yeahfoods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single yeahfood.
   * GET yeahfoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing yeahfood.
   * GET yeahfoods/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update yeahfood details.
   * PUT or PATCH yeahfoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a yeahfood with id.
   * DELETE yeahfoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = YeahFoodController

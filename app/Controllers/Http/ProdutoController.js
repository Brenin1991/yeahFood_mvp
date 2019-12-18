'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database');
const Produto = use('App/Models/Produto');
const Categoria = use('App/Models/Categoria');
/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const produtos = (await Database.select('*').from('produtos'))

    return view.render('admin.cardapio.cardapio', {produtos})
  }

  /**
   * Render a form to be used for creating a new produto.
   * GET produtos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const categorias = (await Database.select('*').from('categorias'))
    return view.render('admin.cardapio.create', {categorias})
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const produto = await Produto.create({
      nome: request.input('nome'),
      descricao: request.input('descricao'),
      imagem: request.input('imagem'),
      preco: request.input('preco'),
      categoria_id: request.input('categoria_id'),
    })

    response.redirect('/cardapio')
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id } = params
    const produto = await Produto.find(id)
    const categoria = await Categoria.find(produto.categoria_id)

    const produtosComplementos = (await Database.select('*')
      .from('complementos')
      .join('produto_complementos', 'complementos.id', 'produto_complementos.complemento_id')
      .where('produto_id', produto.id))

    const complementos = (await Database.select('*')
      .from('complementos'))

    return view.render('admin.cardapio.show', {produto, categoria, produtosComplementos, complementos})
  }

  /**
   * Render a form to update an existing produto.
   * GET produtos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  async ativarProduto ({ params, request, response, view }) {
    const { id } = params
    const produto = await Produto.find(id)
    if(produto.disponivel){
      produto.disponivel = false
    } else {
      produto.disponivel = true
    }

    await produto.save()
    response.redirect('/cardapio')
  }

  async edit ({ params, request, response, view }) {
    const { id } = params
    const produtosComplementos = await ProdutoComplemento.find(id)

    await categoria.delete()
  }
  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async destroy ({ params, request, response }) {
    const { id } = params
    const produto = await Produto.find(id)

    await produto.delete()

    response.redirect('/cardapio')
  }
  
}

module.exports = ProdutoController

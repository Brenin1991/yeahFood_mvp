'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const Produto = use('App/Models/Produto')
const ProdutoPedido = use('App/Models/ProdutoPedido')
const Categoria = use('App/Models/Categoria')
const { validate } = use('Validator')
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
  async index ({ request, response, view , auth}) {
    const produtos = (await Database.select('*').from('produtos').where('id_restaurant', auth.user.id_restaurant))

    return view.render('admin.cardapio.cardapio', {produtos, title: `Cardápio`})
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
  async create ({ request, response, view, auth}) {
    const categorias = (await Database.select('*').from('categorias').where('id_restaurant', auth.user.id_restaurant))
    return view.render('admin.cardapio.create', {categorias, title: `Novo produto`})
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, session, response, auth }) {
    const msg = {
      'nome.required':'Campo obrigatório.',
      'descricao.required':'Campo obrigatório.', 
      'preco.required':'Campo obrigatório.',
      'iamgem.required':'Campo obrigatório.',
      'nome.min':'Deve ter mais de 5 caracteres.',
      'descricao.min':'Deve ter mais de 5 caracteres.'
    }
    const validation = await validate(request.all(), {
      nome: 'required|min:5',
      descricao: 'required|min:5',
      imagem: 'required',
      preco: 'required'
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
     
    const produto = await Produto.create({
      nome: request.input('nome'),
      descricao: request.input('descricao'),
      imagem: request.input('imagem'),
      preco: request.input('preco'),
      categoria_id: request.input('categoria_id'),
      id_restaurant: auth.user.id_restaurant
    })

    session.flash({
      notification: {
        type: `success`,
        message: `Produto cadastrado com sucesso.`
      }
    })

    response.redirect('/produtos')
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

    return view.render('admin.cardapio.show', {produto, categoria, title: `Sobre o produto`})
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
    response.redirect('/produtos')
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, session, response }) {
    const { id } = params

    const msg = {
      'nome.required':'Campo obrigatório.',
      'descricao.required':'Campo obrigatório.', 
      'preco.required':'Campo obrigatório.',
      'iamgem.required':'Campo obrigatório.',
      'nome.min':'Deve ter mais de 5 caracteres.',
      'descricao.min':'Deve ter mais de 5 caracteres.'
    }
    
    const validation = await validate(request.all(), {
      nome: 'required|min:5',
      descricao: 'required|min:5',
      imagem: 'required',
      preco: 'required'
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

    const nome = request.input('nome')
    const descricao = request.input('descricao')
    const imagem = request.input('imagem')
    const preco = request.input('preco')

    const produto = await Produto.find(id)

    produto.nome = nome
    produto.descricao = descricao
    produto.imagem = imagem
    produto.preco = preco

    await produto.save()

    session.flash({
      notification: {
        type: `success`,
        message: `Produto atualizado com sucesso.`
      }
    })

    response.redirect('/produtos')
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async destroy ({ params, session, request, response }) {
    const { id } = params
    const produto_pedidos = await ProdutoPedido.query().where('produto_id', id).delete()
    const produto = await Produto.query().where('id', id).delete()

    session.flash({
      notification: {
        type: `success`,
        message: `Produto removido com sucesso.`
      }
    })

    response.redirect('/produtos')
  }
  
}

module.exports = ProdutoController

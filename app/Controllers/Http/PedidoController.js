'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Sistema = use('App/Models/Sistema')
const Pedido = use('App/Models/Pedido')
const ProdutoPedido = use('App/Models/ProdutoPedido')
const Produto = use('App/Models/Produto')
const Database = use('Database')
const GoogleMaps = use('Adonis/Addons/GoogleMaps')
const format = require('date-format');
/**
 * Resourceful controller for interacting with pedidos
 */
class PedidoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctxs
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let pedidos = (await Database.select('*')
      .from('pedidos').where({ status: 'PE'}))

    pedidos.forEach(p => {
      p.data = format('dd/mm/yy às hh:mm', p.data)  
    })

    return view.render('admin.pedido.pedido', { pedidos })
  }

  /**
   * Render a form to be used for creating a new pedido.
   * GET pedidos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  async verCarrinho ({ request, response, view, auth }) {
    const user_id = auth.user.id
    let produtos = {}
    let pedido = (await Database.select('*').from('pedidos').where({ user_id: user_id, status: 'CR'}).orderBy('id', 'desc'))
    let id = null
    let precoTotal = 0

    if(pedido[0]){
      id = pedido[0].id
      produtos = (await Database.select('*').from('produtos')
      .join('produto_pedidos', 'produto_pedidos.produto_id', 'produtos.id')
      .where('pedido_id', id))

      produtos.forEach(p => {
        precoTotal = precoTotal + (p.quantidade * p.preco)  
      })

      pedido[0].valor = precoTotal

      const p = await Pedido.find(pedido[0].id)
      p.valor = pedido[0].valor
      await p.save()

    } else {
      pedido = null
      produtos = null
    }

    return view.render('auth.pedido.carrinho', {pedido, produtos})
  }

  async verPedidos ({ request, response, view, auth }) {
    const user_id = auth.user.id
    let pedido = (await Database.select('*').from('pedidos').where({ user_id: user_id}).orderBy('id', 'desc'))
    
    pedido.forEach(p => {
      p.data = format('dd/mm/yy às hh:mm', p.data)  
    })

    return view.render('auth.pedido.pedido', {pedido})
  }

  async atualizar ({ params, response, view, auth }) {
    const { id } = params

    const produto_pedidos = await ProdutoPedido.find(id)
    const pedido = await Pedido.find(produto_pedidos.pedido_id)

    if(pedido.user_id === auth.user.id && pedido.status === 'CR'){
      const produto = await Produto.find(produto_pedidos.produto_id)

      return view.render('auth.pedido.atualizar', {produto_pedidos, produto})
    } else {
      response.redirect('/')
    }

  }

  async atualizarPedido ({ response, request, view, auth }) {
    const id = request.input('produto_pedidos')
    const quantidade = request.input('quantidade')
    const observacao = request.input('observacao')

    const p = await Database
    .table('produto_pedidos')
    .where('id', id)
    .update({quantidade: quantidade, observacao: observacao})
    
    response.redirect('/carrinho')
  }

  async efetuarPedido ({ params, response, auth }) {
    const { id } = params
    const status = 'PE'
    const data = new Date()

    const user_id = auth.user.id

    const pedido = await Pedido.find(id)
    pedido.status = status
    pedido.data = data

    await pedido.save()

    response.redirect('/pedido')
  }

  async finalizarPedido ({ params, response, auth }) {
    const { id } = params
    const status = 'FN'

    const user_id = auth.user.id

    const pedido = await Pedido.find(id)
    pedido.status = status

    await pedido.save()

    response.redirect('/pedidos')
  }

  async cancelarPedido ({ params, response, auth }) {
    const { id } = params
    const status = 'CA'
    const user_id = auth.user.id

    const pedido = await Pedido.find(id)
    pedido.status = status

    await pedido.save()

    response.redirect('/carrinho')
  }

  async carrinho ({ request, response, auth }) {
    const carrinho = request.collect(['produto_id'])

    const status = 'CR'
    const user_id = auth.user.id
    let p = (await Database.select('*').from('pedidos').where({ user_id: user_id, status: 'CR'}))
    let pe = (await Database.select('*').from('pedidos').where({ user_id: user_id, status: 'PE'}))

    if(pe[0] || p[0]){
      response.redirect('/')
    } else {
      const pedido = await Database.table('pedidos').insert({
        valor: 0,
        status: status,
        user_id: user_id 
      }).returning('id')

      carrinho.forEach(c => {
        c.pedido_id = pedido[0]
        c.quantidade = 1
      })

      const produto_pedidos = await ProdutoPedido.createMany(carrinho)

      response.redirect('/carrinho')
    }
    
  }

  async store ({ request, response }) {
  }

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id } = params
    const pedido = (await Database.select('*').from('pedidos').where({ id: id}))
    
    const produtos = (await Database.select('*').from('produto_pedidos')
    .join('produtos', 'produtos.id', 'produto_pedidos.produto_id')
    .where('pedido_id', id))

    pedido.forEach(p => {
      p.data = format('dd/mm/yy às hh:mm', p.data)  
    })

    const user = (await Database.select('username').from('users').where('id', pedido[0].user_id))
    const endereco = (await Database.select('*').from('enderecos').where('user_id', pedido[0].user_id))
    const telefones = (await Database.select('*').from('telefones').where('user_id', pedido[0].user_id))

    return view.render('admin.pedido.show', {pedido, produtos, user, endereco, telefones})
  }

  async ativarPedidos ({ params, request, response, view }) {
    const sistema = await Sistema.find(1)
    if(sistema.atendendo){
      sistema.atendendo = false
    } else {
      sistema.atendendo = true
    }

    await sistema.save()
    response.redirect('/dashboard', {sistema})
  }

  /**
   * Render a form to update an existing pedido.
   * GET pedidos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pedido details.
   * PUT or PATCH pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pedido with id.
   * DELETE pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PedidoController

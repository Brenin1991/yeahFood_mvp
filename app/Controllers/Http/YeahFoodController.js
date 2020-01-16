'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const Produto = use('App/Models/Produto')
const User = use('App/Models/User')
const Restaurant = use('App/Models/Restaurant')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
const Categoria = use('App/Models/Categoria')
const CPF = require('cpf')
const { validate } = use('Validator')
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
    const restaurantes = (await Database.select('*').from('enderecos')
      .join('restaurants', 'restaurants.id', 'enderecos.id_restaurant'))

    return view.render('home', {restaurantes, title: `Delivery de Comida`})
  }

  async dashboard ({ request, response, view }) {

    return view.render('admin.home', {title: `Dashboard`})
  }

  async minhaConta ({ request, response, view, auth }) {
    const user = await User.find(auth.user.id)
    const endereco = (await Database.select('*').from('enderecos').where('user_id', user.id))
    const telefones = (await Database.select('*').from('telefones').where('user_id', user.id))
    const count = await Database
      .from('pedidos').where('user_id', user.id)
      .count()

    const pedidos = count[0].count

    return view.render('auth.conta', {user, endereco, telefones, pedidos, title: `Conta`})
  }

  async restaurante ({ params, view }) {
    const { queryName } = params
    const restaurante = (await Database.select('*').from('enderecos')
      .join('restaurants', 'restaurants.id', 'enderecos.id_restaurant').where('query_name', queryName))
    
    const produtos = (await Database.select('*').from('produtos').where({disponivel: true, id_restaurant: restaurante[0].id}))
    
    return view.render('restaurante', {restaurante, produtos, title: restaurante[0].nome})
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
  async update ({ params, request, session, response, auth }) {

    const msg = {
      'username.required':'Campo obrigatório.',
      'username.min':'Deve ter mais de 5 caracteres.'
    }

    const validation = await validate(request.all(), {
      username: 'required|min:5'
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

    const { id } = params
    const username = request.input('username')
    const cpf = request.input('cpf')
    const telefone = request.input('telefone')
    const rua = request.input('rua')
    const numero = request.input('numero')
    const bairro = request.input('bairro')
    const cidade = request.input('cidade')
    const ponto_referencia = request.input('ponto_referencia')

    const user = await User.find(auth.user.id)
    

    user.username = username
    user.cpf = CPF.format(cpf)

    const tele = await Database
    .table('telefones')
    .where('user_id', user.id)
    .update('telefone', telefone)

    const endereco = await Database
    .table('enderecos')
    .where('user_id', user.id)
    .update({rua: rua, numero: numero, bairro: bairro, cidade: cidade, ponto_referencia: ponto_referencia})
    

    await user.save()

    session.flash({
      notification: {
        type: `success`,
        message: `Perfil atualizado com sucesso.`
      }
    })


    response.redirect('back')
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

  async adminConta ({ request, response, view, auth }) {
    const user = await User.find(auth.user.id)
    const endereco = (await Database.select('*').from('enderecos').where('user_id', user.id))
    const telefones = (await Database.select('*').from('telefones').where('user_id', user.id))
    const count = await Database
      .from('pedidos').where('user_id', user.id)
      .count()

    const pedidos = count[0].count

    return view.render('admin.conta', {user, endereco, telefones, pedidos, title: `Conta`})
  }

  async restauranteConta ({ request, response, view, auth }) {
    const restaurante = (await Database.select('*').from('restaurants').where('id', auth.user.id_restaurant))
    console.log(restaurante[0])

    return view.render('admin.restaurante', {restaurante, title: `Configurações do restaurante`})
  }

  async restauranteContaUpdate ({ params, request, session, response, auth }) {

    const msg = {
      'nome.required':'Campo obrigatório.',
      'nome.min':'Deve ter mais de 5 caracteres.',
      'descricao.required':'Campo obrigatório.',
      'descricao.min':'Deve ter mais de 5 caracteres.'
    }

    const validation = await validate(request.all(), {
      nome: 'required|min:5',
      descricao: 'required|min:5',
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

    const { id } = params
    const nome = request.input('nome')
    const descricao = request.input('descricao')
    const imagem = request.input('imagem')
    const tempo_medio = request.input('tempo_medio')
    const taxa_entrega = request.input('taxa_entrega')
    const query_name = request.input('query_name')

    const restaurante = await Database
    .table('restaurants')
    .where('id', id)
    .update({nome: nome, descricao: descricao, imagem: imagem, tempo_medio: tempo_medio, taxa_entrega: taxa_entrega, query_name: query_name})

    session.flash({
      notification: {
        type: `success`,
        message: `Perfil atualizado com sucesso.`
      }
    })


    response.redirect('back')
  }

  async atendendo ({ params, request, response, view, auth}) {
    let restaurante = await Restaurant.find(auth.user.id_restaurant)
   
    if(restaurante.atendendo){
      restaurante.atendendo = false
    } else {
      restaurante.atendendo = true
    }

    await restaurante.save()

    response.redirect('back')
  }
}

module.exports = YeahFoodController

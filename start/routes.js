'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
Route.get('/', 'YeahFoodController.index')
Route.get('/restaurante/:queryName', 'YeahFoodController.restaurante')

//auth
Route.get('register', 'Auth/RegisterController.showRegisterForm').middleware([
  'authenticated'
])
Route.post('register', 'Auth/RegisterController.register').as('register')
Route.get('register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('login', 'Auth/LoginController.showLoginForm').middleware([
  'authenticated'
])
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/AuthenticatedController.logout')
Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('password/reset', 'Auth/PasswordResetController.reset')
//----------------cliente-----------------//
//carrinho
Route.get('carrinho', 'PedidoController.verCarrinho').as('carrinho').middleware(['auth'
])
Route.post('carrinho', 'PedidoController.carrinho').as('carrinho.add').middleware(['auth'
])
//pedido
Route.get('pedido', 'PedidoController.verPedidos').as('pedido').middleware(['auth'
])
Route.put('pedido/:id', 'PedidoController.efetuarPedido').as('pedido.efetuarPedido').middleware(['auth'
])
Route.delete('pedido/:id', 'PedidoController.cancelarPedido').as('pedido.cancelarPedido').middleware(['auth'
])
Route.get('atualizar/:id', 'PedidoController.atualizar').as('pedido.atualizar').middleware(['auth'
])
Route.post('atualizar', 'PedidoController.atualizarPedido').as('pedido.atualizarPedido').middleware(['auth'
])

//perfil
Route.get('perfil', 'YeahFoodController.minhaConta').as('perfil').middleware(['auth'
])
Route.put('perfil/:id', 'YeahFoodController.update').as('perfil.update').middleware(['auth'
])

//----------------admin-----------------//
//dashboard
Route.get('dashboard', 'YeahFoodController.dashboard').as('dashboard').middleware([
  'admin', 'auth'
])
//pedidos
Route.get('pedidos', 'PedidoController.index').as('pedidos.index').middleware([
  'admin', 'auth'
])
Route.get('pedidos/:id', 'PedidoController.show').as('pedidos.show').middleware([
  'admin', 'auth'
])
Route.put('pedidos/:id', 'PedidoController.finalizarPedido').as('pedido.finalizarPedido').middleware([
  'admin', 'auth'
])

//perfilAdmin
Route.get('conta', 'YeahFoodController.adminConta').as('adminConta').middleware(['admin', 'auth'
])

//configRestaurante
Route.get('restaurante', 'YeahFoodController.restauranteConta').as('restauranteConta').middleware(['admin', 'auth'
])
Route.put('restaurante/:id', 'YeahFoodController.restauranteContaUpdate').as('restauranteConta.update').middleware(['admin', 'auth'
])

//Route.get('ativarPedidos', 'PedidoController.ativarPedidos')
//produto(cardapio)
Route.get('produtos', 'ProdutoController.index').as('produto.index').middleware([
  'admin', 'auth'
])
Route.get('produto/create', 'ProdutoController.create').as('produto.create').middleware([
  'admin', 'auth'
])
Route.post('produto', 'ProdutoController.store').as('produto.store').middleware([
  'admin', 'auth'
])
Route.get('produto/:id', 'ProdutoController.show').middleware([
  'admin', 'auth'
])
Route.delete('produto/:id', 'ProdutoController.destroy').as('remover.destroy').middleware([
  'admin', 'auth'
])
Route.put('produto/:id', 'ProdutoController.ativarProduto').as('produto.ativarProduto').middleware([
  'admin', 'auth'
])
Route.put('remover/:id', 'ProdutoController.update').as('produto.update').middleware([
  'admin', 'auth'
])
//Categoria
Route.get('categoria/add', 'CategoriaController.create').as('categoria.create').middleware([
  'admin'
])
Route.post('categoria', 'CategoriaController.store').as('categoria.store').middleware([
  'admin'
])
Route.delete('categoria/:id', 'CategoriaController.destroy').as('categoria.destroy').middleware([
  'admin'
])
//Complemento
Route.get('complemento/add', 'ComplementoController.create').middleware([
  'admin'
])
Route.post('complemento/add', 'ComplementoController.store').middleware([
  'admin'
])
Route.post('complemento/adicionar', 'ComplementoController.adicionar').middleware([
  'admin'
])
Route.delete('complemento/:id', 'ComplementoController.destroy').middleware([
  'admin'
])
Route.post('atendendo', 'YeahFoodController.atendendo').as('atendendo').middleware([
  'admin'
])

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
//Route.get('ativarPedidos', 'PedidoController.ativarPedidos')
//produto(cardapio)
Route.get('cardapio', 'ProdutoController.index').as('produto.index').middleware([
  'admin', 'auth'
])
Route.get('cardapio/create', 'ProdutoController.create').as('produto.create').middleware([
  'admin', 'auth'
])
Route.post('cardapio', 'ProdutoController.store').as('produto.store').middleware([
  'admin', 'auth'
])
Route.get('cardapio/:id', 'ProdutoController.show').middleware([
  'admin', 'auth'
])
Route.delete('cardapio/:id', 'ProdutoController.destroy').as('produto.destroy').middleware([
  'admin', 'auth'
])
Route.put('cardapio/:id', 'ProdutoController.ativarProduto').as('produto.ativarProduto').middleware([
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

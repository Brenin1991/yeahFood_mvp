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
//cliente
Route.get('carrinho', 'YeahFoodController.carrinho')
//admin
Route.get('dashboard', 'YeahFoodController.dashboard')
Route.get('pedidos', 'PedidoController.index')
//produto
Route.get('cardapio', 'ProdutoController.index')
Route.get('cardapio/add', 'ProdutoController.create')
Route.post('cardapio/add', 'ProdutoController.store')
//Categoria
Route.get('categoria/add', 'CategoriaController.create')
Route.post('categoria/add', 'CategoriaController.store')
Route.get('categoria/delete/:id', 'CategoriaController.destroy')
//Complemento
Route.get('complemento/add', 'ComplementoController.create')
Route.post('complemento/add', 'ComplementoController.store')

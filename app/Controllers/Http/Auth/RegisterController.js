'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
const randomString = require('random-string')
const Mail = use('Mail')

class RegisterController {
  showRegisterForm ({ view }) {
    return view.render('auth.register', {title: `Registrar`})
  }

  async register ({ request, session, response }) {
    // validate form inputs
    const validation = await validateAll(request.all(), {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])

      return response.redirect('back')
    }

    // create user
    const user = await User.create({
      username: request.input('username'),
      email: request.input('email'),
      password: request.input('password'),
      confirmation_token: randomString({ length: 40 })
    })

    const endereco = await Endereco.create({
      rua: request.input('rua'),
      numero: request.input('numero'),
      ponto_referencia: request.input('ponto_referencia'),
      user_id: user.id,
      cidade: request.input('cidade'),
      bairro: request.input('bairro')
    })

    const telefone = await Telefone.create({
      telefone: request.input('telefone'),
      user_id: user.id
    })

    // send confirmation email
    await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
      message
        .to(user.email)
        .from('hello@adonisjs.com')
        .subject('Please confirm your email address')
    })

    // display success message
    session.flash({
      notification: {
        type: 'success',
        message: 'Registro bem-sucedido! Uma mensagem foi enviada para o seu endereço de e-mail. Confirme seu endereço de e-mail.'
      }
    })

    return response.redirect('back')
  }

  async confirmEmail ({ params, session, response }) {
    // get user with the cinfirmation token
    const user = await User.findBy('confirmation_token', params.token)

    // set confirmation to null and is_active to true
    user.confirmation_token = null
    user.is_active = true

    // persist user to database
    await user.save()

    // display success message
    session.flash({
      notification: {
        type: 'success',
        message: 'O seu endereço de email foi confirmado.'
      }
    })

    return response.redirect('/login')
  }
}

module.exports = RegisterController

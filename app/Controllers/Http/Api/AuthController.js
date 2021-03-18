'use strict'
const { validate } = use('Validator');
const User = use('App/Models/User');


class AuthController {
  async login({ request, response, auth }) {
    const rules = {
      email: 'required|email',
      password: 'required'
    }

    const { email, password } = request.only(['email', 'password'])

    const validation = await validate({ email, password }, rules)

    if (!validation.fails()) {
      try {
        let token = await auth.attempt(email, password)
        let user = await User.findBy('email', email)
        response.json({
          "code": "success",
          "user_id": user.id,
          "access_token": token })
      } catch (err) {
        response.status(401).send({ error: 'Invalid email or password' })
      }
    } else {
      response.status(401).send(validation.messages())
    }
  }

  async register({ request, response }) {
    const rules = {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users,email',
      password: 'required',
    }

    const { email, username, password } = request.only([
      'email',
      'username',
      'password'
    ])

    const validation = await validate({ email, username, password }, rules)

    if (!validation.fails()) {
      try {
        const user = await User.create({ email, username, password}, rules)
        return response.send({ message: 'User has been created' })
      } catch (err) {
        response.status(401).send({ error: 'Please try again' })
      }
    } else {
      response.status(401).send(validation.messages)
    }
  }
}

module.exports = AuthController

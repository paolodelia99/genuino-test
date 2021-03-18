'use strict'
const User = use('App/Models/User');

class UserController {
  async getUser({ response, auth, params }) {
    try {
      await auth.check()
      const {userId} = params;
      const user = await User.findBy('id', userId)
      if (user) return user;
      else return { message: "User not found" }
    } catch (error) {
      response.send('Missing or invalid jwt token');
    }
  }
}

module.exports = UserController

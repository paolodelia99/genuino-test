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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return {
      name: "test-genuino",
      version: "0.0.1"
    }
})

Route.group(() => {

  Route.post('/login', 'Api/AuthController.login')
  Route.post('/register', 'Api/AuthController.register')
  Route.get('/user/:userId', 'Api/UserController.getUser')

}).prefix('api/v1')

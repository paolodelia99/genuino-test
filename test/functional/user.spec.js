'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

const userInfo = {
  email: "john.doe@gmail.com",
  username: 'john',
  password: 'password'
}

test('register new user', async ({ client }) => {
  const response = await client.post('/api/v1/register').send(userInfo).end()

  response.assertStatus(200)

  await User.query().where({ email: userInfo.email }).firstOrFail()
})

test('login user and get user info', async ({ client }) => {
  let response = await client.post('/api/v1/login').send({
    email: userInfo.email,
    password: userInfo.password
  }).end()

  response.assertStatus(200)

  response.assertJSONSubset({
    code: "success",
    "access_token": {
      "type": "bearer",
      "refreshToken": null
    }
  })

  response = await client
                    .get('/api/v1/user/2')
                    .header('Authorization', 'Bearer ' + response.body.access_token.token)
                    .end()

  response.assertStatus(200)

  response.assertJSON({
    email: "paolodelia@gmail.com",
    username: "Paolo"
  })
})

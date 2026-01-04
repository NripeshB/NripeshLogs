const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
// this is basically using the express() from the app.js
// and imposing its testing library over it 
const api = supertest(app)

const helper = require('./testHelper')

// describing all the tests under Signup
describe('Signup', () => {
  // beafore each test, clears the entire db
  beforeEach(async () => {
    await helper.clearUsers()
  })

  // tests weather the users can signup with valid data or not
  test('user can signup with valid data', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
    }

    // sends out the data via post to the url
    // and describes what to expect
    await api
      .post('/api/auth/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    expect(users).toHaveLength(1)
    expect(users[0].username).toBe('testuser')
  })


  // testing a known failing case and ensures the error code is 
  // as predicted
  test('signup fails with short password', async () => {
    await api
      .post('/api/auth/signup')
      .send({
        username: 'baduser',
        email: 'bad@test.com',
        password: '123',
      })
      .expect(400)
  })
})

// describes all the tests under login
describe('Login', () => {

  // beafore each test, clears the entire db
  beforeEach(async () => {
    await helper.clearUsers()

    // and also by defaults to first signup as a user we'll use in the tests 
    await api.post('/api/auth/signup').send({
      username: 'loginuser',
      email: 'login@test.com',
      password: 'password123',
    })
  })


  // tests a valid login must give expected code 
  // and the body of the token to be defined as well
  test('login succeeds with correct credentials', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'password123',
      })
      .expect(200)

    expect(response.body.token).toBeDefined()
  })

  // tests the error code is as expected for invalid login with wrong password
  test('login fails with wrong password', async () => {
    await api
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'wrongpass',
      })
      .expect(401)
  })
})

// describes the test for me endpoint 
describe('/me endpoint', () => {
  let token

  // before each test, ensures to clear users
  beforeEach(async () => {
    await helper.clearUsers()

    // and also signup as a user that will be used in the test further
    await api.post('/api/auth/signup').send({
      username: 'meuser',
      email: 'me@test.com',
      password: 'password123',
    })

    // and also logs in as that user
    const loginResponse = await api
      .post('/api/auth/login')
      .send({
        username: 'meuser',
        password: 'password123',
      })
    
    // and extracts the token to be used in the tests below 
    token = loginResponse.body.token
  })

  // tests if we get info from /me endpoint
  // and setting its header correctly by setting the token 
  // in the authoriztion token
  test('returns user info with valid token', async () => {
    await api
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // checks if the error code is correct when invalid token is provided 
  test('fails without token', async () => {
    await api
      .get('/api/auth/me')
      .expect(401)
  })
})

// closes the connection with the mongodb server after all the tests are executed
afterAll(async ()=>{
    await mongoose.connection.close()
})
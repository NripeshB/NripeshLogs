const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./reactionTestHelper')

let userToken
let article

describe('Like / Dislike logic', () => {
  beforeEach(async () => {
    await helper.clearDb()

    const user = await helper.createUser({
      username: 'user1',
      role: 'user',
    })

    article = await helper.createPublishedArticle(user._id)
    userToken = await helper.loginUser(api, 'user1')
  })

  test('user can like article', async () => {
    const response = await api
      .post(`/api/articles/${article.id}/like`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(response.body.likesCount).toBe(1)
  })

  test('liking again removes like (toggle)', async () => {
    await api
      .post(`/api/articles/${article.id}/like`)
      .set('Authorization', `Bearer ${userToken}`)

    const response = await api
      .post(`/api/articles/${article.id}/like`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(response.body.likesCount).toBe(0)
  })

  test('dislike removes existing like', async () => {
    await api
      .post(`/api/articles/${article.id}/like`)
      .set('Authorization', `Bearer ${userToken}`)

    const response = await api
      .post(`/api/articles/${article.id}/dislike`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(response.body.likesCount).toBe(0)
    expect(response.body.dislikesCount).toBe(1)
  })

  test('like removes existing dislike', async () => {
    await api
      .post(`/api/articles/${article.id}/dislike`)
      .set('Authorization', `Bearer ${userToken}`)

    const response = await api
      .post(`/api/articles/${article.id}/like`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(response.body.dislikesCount).toBe(0)
    expect(response.body.likesCount).toBe(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

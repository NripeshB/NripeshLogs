const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./commentTestHelper')

let authorToken
let userToken
let article

describe('Comment API tests', () => {
  beforeEach(async () => {
    await helper.clearDb()

    const author = await helper.createUser({
      username: 'author1',
      role: 'author',
    })

    const user = await helper.createUser({
      username: 'user1',
      role: 'user',
    })
    
    if(user)

    
    article = await helper.createPublishedArticle(author._id)

    authorToken = await helper.loginUser(api, 'author1')
    userToken = await helper.loginUser(api, 'user1')
  })

  test('logged-in user can comment on article', async () => {
    const response = await api
      .post(`/api/articles/${article.id}/comments`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'Nice article!' })
      .expect(201)

    expect(response.body.content).toBe('Nice article!')
  })

  test('unauthenticated user cannot comment', async () => {
    await api
      .post(`/api/articles/${article.id}/comments`)
      .send({ content: 'No auth' })
      .expect(401)
  })

  test('comment owner can edit comment', async () => {
    const comment = await helper.createComment(article.id, userToken)

    const response = await api
      .put(`/api/comments/${comment.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ content: 'Edited comment' })
      .expect(200)

    expect(response.body.content).toBe('Edited comment')
  })

  test('non-owner cannot edit comment', async () => {
    const comment = await helper.createComment(article.id, userToken)

    await api
      .put(`/api/comments/${comment.id}`)
      .set('Authorization', `Bearer ${authorToken}`)
      .send({ content: 'Hack' })
      .expect(403)
  })

  test('comment owner can delete comment', async () => {
    const comment = await helper.createComment(article.id, userToken)

    await api
      .delete(`/api/comments/${comment.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(204)

    const comments = await helper.commentsInDb()
    expect(comments).toHaveLength(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

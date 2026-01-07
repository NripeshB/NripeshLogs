const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
const helper = require('./articleTestHelper')

let authorToken
let userToken
let blog
let articleId


describe('Article tests ', ()=>{
    beforeEach(async () => {
        // clears the db if some values are there
        await helper.clearDb()

        // creates a author
        const author = await helper.createUser({
            username: 'author1',
            role: 'author',
        })

        // creates a normal user
        const user = await helper.createUser({
            username: 'user1',
            role: 'user',
        })

        if(user)
        // creates a sample blog
        blog = await helper.createBlog({
            title: 'Test Blog',
            slug: 'test-blog',
            // with the author we just created 
            authorId: author._id,
        })

        // this gets the tokens for both the author and the user
        authorToken = await helper.loginUser(api, 'author1')
        userToken = await helper.loginUser(api, 'user1')
    })

    test('author can create article as draft', async () => {
  const response = await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Draft Article',
      slug: 'draft-article',
      content: 'Some content',
      blogId: blog.id,
    })
    .expect(201)

  articleId = response.body.id
  expect(response.body.published).toBe(false)

  const articles = await helper.articlesInDb()
  expect(articles).toHaveLength(1)
  expect(String(articles[0].id)).toBe(String(articleId))

})

test('normal user cannot create article', async () => {
  await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      title: 'Invalid Article',
      slug: 'invalid-article',
      content: 'Nope',
      blogId: blog.id,
    })
    .expect(403)
})
test('draft article is not publicly accessible', async () => {
  await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Hidden Draft',
      slug: 'hidden-draft',
      content: 'Hidden',
      blogId: blog.id,
    })

  await api
    .get('/api/articles/hidden-draft')
    .expect(404)
})


test('author can publish own article', async () => {
  const createResponse = await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Publish Me',
      slug: 'publish-me',
      content: 'Ready',
      blogId: blog.id,
    })

  const id = createResponse.body.id

  const publishResponse = await api
    .put(`/api/articles/${id}`)
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
        published: true
    })
    .expect(200)

  expect(publishResponse.body.published).toBe(true)
})

test('published article is publicly accessible', async () => {
  await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Public Article',
      slug: 'public-article',
      content: 'Hello world',
      blogId: blog.id,
      published: true,
    })

  const response = await api
    .get('/api/articles/public-article')
    .expect(200)

  expect(response.body.title).toBe('Public Article')
})
//this one 
test('non-owner cannot update article', async () => {
  const createResponse = await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Owner Only',
      slug: 'owner-only',
      content: 'Protected',
      blogId: blog.id,
    })

  const id = createResponse.body.id

  await api
    .put(`/api/articles/${id}`)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      title: 'Hacked',
    })
    .expect(403)
})
// this one 
test('owner can delete article', async () => {
  const createResponse = await api
    .post('/api/articles')
    .set('Authorization', `Bearer ${authorToken}`)
    .send({
      title: 'Delete Me',
      slug: 'delete-article',
      content: 'Bye',
      blogId: blog.id,
    })

  const id = createResponse.body.id

  await api
    .delete(`/api/articles/${id}`)
    .set('Authorization', `Bearer ${authorToken}`)
    .expect(204)

  const articles = await helper.articlesInDb()
  expect(articles).toHaveLength(0)
})


})

// after all the tests close the connection with the database

afterAll(async () => {
  await mongoose.connection.close()
})

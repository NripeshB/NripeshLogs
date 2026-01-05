const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
const helper = require('./blogsTestHelper')

let authorToken
let userToken
let blogId

describe('Blogs test', ()=>{
    beforeEach(async () => {
        await helper.clearDb()

        await helper.createUser({ username: 'author1', role: 'author' })
        await helper.createUser({ username: 'user1', role: 'user' })

        authorToken = await helper.loginUser(api, 'author1')
        userToken = await helper.loginUser(api, 'user1')
    })

    test('author can create a blog', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Author Blog',
            slug: 'author-blog',
            description: 'Test blog',
            })
            .expect(201)

        blogId = response.body.id

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(1)
        expect(blogs[0].title).toBe('Author Blog')
        expect(String(blogs[0].id)).toBe(String(blogId))
    })

    test('normal user cannot create a blog', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            title: 'Invalid Blog',
            slug: 'invalid-blog',
            })
            .expect(403)
    })

    test('blog owner can update blog', async () => {
        const createResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Original Title',
            slug: 'original-title',
            })

        const id = createResponse.body.id

        const updateResponse = await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Updated Title',
            })
            .expect(200)

        expect(updateResponse.body.title).toBe('Updated Title')
    })

    test('non-owner cannot update blog', async () => {
        const createResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Owner Blog',
            slug: 'owner-blog',
            })

        const id = createResponse.body.id

        await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            title: 'Hacked Title',
            })
            .expect(403)
    })

    test('owner can delete blog', async () => {
        const createResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Delete Me',
            slug: 'delete-me',
            })

        const id = createResponse.body.id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${authorToken}`)
            .expect(204)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(0)
        })

    test('non-owner cannot delete blog', async () => {
        const createResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorToken}`)
            .send({
            title: 'Protected Blog',
            slug: 'protected-blog',
            })

        const id = createResponse.body.id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(403)
    })
})





afterAll(async () => {
  await mongoose.connection.close()
})

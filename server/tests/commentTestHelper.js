const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const Article = require('../models/article')
const Comment = require('../models/comments')

// this function creates a sample user
const createUser = async ({ username, role }) => {
  // create a sample password hash using bcrypt
  const passwordHash = await bcrypt.hash('password123', 10)


  // create the user object to save and uptdate the db
  const user = new User({
    username,
    email: `${username}@test.com`,
    passwordHash,
    role,
  })

  await user.save()
  return user
}


const createPublishedArticle = async (authorId) => {
  // let's assume we pass a valid author ID

  // creat a new blog
  const blog = new Blog({
    title: 'Blog',
    slug: 'blog',
    author: authorId,
  })
  await blog.save()

  // inside that blog create an article with the given author Id
  const article = new Article({
    title: 'Article',
    slug: 'article',
    content: 'Content',
    blog: blog._id,
    author: authorId,
    published: true,
  })

  await article.save()
  return article.toJSON()
}

const loginUser = async (api, username) => {
  // login as a predefined user

  const response = await api
    .post('/api/auth/login')
    .send({ username, password: 'password123' })

  // and send back the created token
  return response.body.token
}

const createComment = async (articleId, token) => {
  // now under that article, write a comment
  const response = await require('supertest')(require('../app'))
    .post(`/api/articles/${articleId}/comments`)
    .set('Authorization', `Bearer ${token}`)
    .send({ content: 'Test comment' })

  return response.body
}

const commentsInDb = async () => {
  // this fetches all the comments in the database
  const comments = await Comment.find({})
  // and returns it
  return comments.map(c => c.toJSON())
}

const clearDb = async () => {

  // clears each doc in the db
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Article.deleteMany({})
  await Comment.deleteMany({})
}

module.exports = {
  createUser,
  createPublishedArticle,
  loginUser,
  createComment,
  commentsInDb,
  clearDb,
}

const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const Article = require('../models/article')
const Reaction = require('../models/reaction')

const createUser = async ({ username, role }) => {
  // creates a normal user
  const passwordHash = await bcrypt.hash('password123', 10)

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
  // creates a blog under a valid authorId
  const blog = new Blog({
    title: 'Blog',
    slug: 'blog',
    author: authorId,
  })
  await blog.save()

  // creates a published blog
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
  // logs in as a given user
  const response = await api
    .post('/api/auth/login')
    .send({ username, password: 'password123' })

  return response.body.token
}

const clearDb = async () => {
  // clears each document in the database
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Article.deleteMany({})
  await Reaction.deleteMany({})
}

module.exports = {
  createUser,
  createPublishedArticle,
  loginUser,
  clearDb,
}

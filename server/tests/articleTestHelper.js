const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const Article = require('../models/article')

const createUser = async ({ username, role }) => {
  // hashes a password by itself
  const passwordHash = await bcrypt.hash('password123', 10)

  // creates a sample user 
  const user = new User({
    username,
    email: `${username}@test.com`,
    passwordHash,
    role,
  })

  // saves the same user 
  await user.save()
  return user
}


const createBlog = async ({ title, slug, authorId }) => {

  // creates a sample blog
  const blog = new Blog({
    title,
    slug,
    author: authorId,
  })

  // saves it 
  await blog.save()
  return blog
}

const loginUser = async (api, username) => {
  // logs the previously made user 
  const response = await api
    .post('/api/auth/login')
    .send({
      username,
      password: 'password123',
    })

    // return the signed token
  return response.body.token
}

const articlesInDb = async () => {
  // send all the articles inside of the database
  const articles = await Article.find({})
  return articles.map((a) => a.toJSON())
}

const clearDb = async () => {
  // clears the database of all the fields at the end
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Article.deleteMany({})
}

module.exports = {
  createUser,
  createBlog,
  loginUser,
  articlesInDb,
  clearDb,
}

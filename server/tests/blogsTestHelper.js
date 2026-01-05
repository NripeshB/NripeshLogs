const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  // returns all the blogs inside the database
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const clearDb = async () => {
    // clears the database of all the fields at the end

  await User.deleteMany({})
  await Blog.deleteMany({})
}

module.exports = {
  createUser,
  loginUser,
  blogsInDb,
  clearDb,
}

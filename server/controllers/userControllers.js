const User = require('../models/user')
const Reaction = require('../models/reaction')
const Comment = require('../models/comments')
const Blog = require('../models/blog')
const Article = require('../models/article')


const getAllUsers = async (req, res) => {
  // sends back all the users 
  const users = await User.find({})
    .select('username role createdAt')

  res.json(users)
}


const getUserProfile = async (req, res) => {
  // finds the user that is trying to be accessed 
  const user = await User.findOne({ username: req.params.username })
    .select('username role bio createdAt')
  // if the user doesn't exist , returns not found the user
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  // gets all the Disliked articles , their slug and title from the reaction 
  // that are dislikes in the Reaction doc
  // of the user we searched for
  const likes = await Reaction.find({
    user: user._id,
    type: 'like',
  }).populate('article', 'title slug')

  // gets all the Disliked articles , their slug and title from the reaction 
  // that are dislikes in the Reaction doc
  // of the user we searched for
  const dislikes = await Reaction.find({
    user: user._id,
    type: 'dislike',
  }).populate('article', 'title slug')

  // gets all the commented articles , their slug and title from the comment doc
  // of the user we searched for
  const comments = await Comment.find({ user: user._id })
    .populate('article', 'title slug')

  // in response it gives a json object 
  // containing everything we gathered 
  res.json({
    user,
    interactions: {
      likedArticles: likes.map(r => r.article),
      dislikedArticles: dislikes.map(r => r.article),
      comments: comments.map(c => ({
        article: c.article,
        content: c.content,
        createdAt: c.createdAt,
      })),
    },
  })
}


// updating the user's role
const updateUserRole = async (req, res) => {
  // accessing the role of the body
  const { role } = req.body

  // if role is not either on of these, throw error
  if (!['user', 'author', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'invalid role' })
  }

  // find the requested user 
  const user = await User.findById(req.params.id)

  // if this user doesn't exist 
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  // if the user is found, assign them a new role
  user.role = role
  const saved = await user.save()

  // send the new role as response 
  res.json({
    id: saved._id,
    username: saved.username,
    role: saved.role,
  })
}


const getAuthorBlogsWithArticles = async (req, res) => {
  // 1. Find author by username
  const author = await User.findOne({ username: req.params.username })

  if (!author) {
    return res.status(404).json({ error: 'author not found' })
  }

  // 2. Get all blogs written by this author
  const blogs = await Blog.find({ author: author._id })
    .sort({ createdAt: -1 })
    .lean() // IMPORTANT for performance

  // 3. Attach articles to each blog
  const blogIds = blogs.map(b => b._id)

  const articles = await Article.find({
    blog: { $in: blogIds },
    published: true, // public view
  })
    .select('title slug blog createdAt')
    .sort({ createdAt: -1 })
    .lean()

  // 4. Group articles by blog
  const articlesByBlog = {}
  for (const article of articles) {
    const blogId = article.blog.toString()
    if (!articlesByBlog[blogId]) {
      articlesByBlog[blogId] = []
    }
    articlesByBlog[blogId].push(article)
  }

  // 5. Merge blogs + articles
  const response = blogs.map(blog => ({
    ...blog,
    id: blog._id,
    articles: articlesByBlog[blog._id.toString()] || [],
  }))

  res.json(response)
}


module.exports = {updateUserRole, getAllUsers, getUserProfile, getAuthorBlogsWithArticles}

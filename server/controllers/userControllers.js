const User = require('../models/user')
const Like = require('../models/like')
const Dislike = require('../models/dislike')
const Comment = require('../models/comments')


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

  // gets all the Liked articles , their slug and title from the Like doc
  // of the user we searched for
  const likes = await Like.find({ user: user._id })
    .populate('article', 'title slug')

  // gets all the Disliked articles , their slug and title from the Dislike doc
  // of the user we searched for
  const dislikes = await Dislike.find({ user: user._id })
    .populate('article', 'title slug')

  // gets all the commented articles , their slug and title from the Comments doc
  // of the user we searched for
  const comments = await Comment.find({ user: user._id })
    .populate('article', 'title slug')

  // in response it gives a json object 
  // containing everything we gathered 
  res.json({
    user,
    interactions: {
      likedArticles: likes.map(l => l.article),
      dislikedArticles: dislikes.map(d => d.article),
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

module.exports = {updateUserRole, getAllUsers, getUserProfile}

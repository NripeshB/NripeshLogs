const Comment = require('../models/comments')

// checks if the person accessing the comment for deleting or updating is 
// either the author or the admin
const commentOwnerOrAdmin = async (req, res, next) => {
  // first tries to find the comment from the requested parameter 
  const comment = await Comment.findById(req.params.id)

  // if doesn't exist just send relavant error status
  if (!comment) {
    return res.status(404).json({ error: 'comment not found' })
  }

  // check if either the comment's author's 
  const isOwner = comment.user.toString() === req.user.id
  const isAdmin = req.user.role === 'admin'

  // send forbidden error status if neither
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: 'forbidden' })
  }

  // else send the requested comment
  req.comment = comment
  next()
}

module.exports = commentOwnerOrAdmin

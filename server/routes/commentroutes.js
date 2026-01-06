const router = require('express').Router()
const commentControllers = require('../controllers/commentControllers')
const { tokenExtractor, userExtractor } = require('../middleware/auth')
const commentOwnerOrAdmin = require('../middleware/commentOwnership')

// it edits the posted comment only if it is the commenter or admin
router.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  commentOwnerOrAdmin,
  commentControllers.updateComment
)

// it deletes the posted comment only if it is the commenter or admin
router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  commentOwnerOrAdmin,
  commentControllers.deleteComment
)

module.exports = router

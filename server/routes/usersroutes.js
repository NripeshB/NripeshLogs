const router = require('express').Router()
const usersController = require('../controllers/userControllers')
const { tokenExtractor, userExtractor } = require('../middleware/auth')
const {adminOnly} = require('../middleware/adminOnly')

// get all the users 
router.get('/', usersController.getAllUsers)

// get a specific user with a username
router.get('/:username', usersController.getUserProfile)

router.get('/:username/blogs', usersController.getAuthorBlogsWithArticles)
// change the user's role (only accessable by admin )
router.patch(
  '/:id/role',
  tokenExtractor,
  userExtractor,
  adminOnly,
  usersController.updateUserRole
)

module.exports = router

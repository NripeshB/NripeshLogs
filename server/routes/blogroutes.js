const router = require('express').Router()
const blogsControllers = require('../controllers/blogControllers')
const {tokenExtractor,userExtractor} = require('../middleware/auth')
const {blogOwnerOrAdmin} = require('../middleware/ownership')

// route for getting all the blogs
router.get('/', blogsControllers.getAllBlogs)

// route for only getting the blog using the  parameterized slug
router.get('/:blogSlug', blogsControllers.getBlogBySlug)

// route used to create a new blog by a user with correct and active token
router.post(
  '/',
  tokenExtractor,
  userExtractor,
  blogsControllers.createBlog
)

// route used to update a specific blog using the id parameter 
// by a logged in user who is either the author or the admin of the blog
router.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  blogOwnerOrAdmin,
  blogsControllers.updateBlog
)


// route used to delete a specific blog using the id parameter 
// by a logged in user who is either the author or the admin of the blog
router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  blogOwnerOrAdmin,
  blogsControllers.deleteBlog
)

module.exports = router
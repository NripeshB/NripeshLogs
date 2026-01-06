const router = require('express').Router()
const articlesController = require('../controllers/articleControllers')
const {tokenExtractor,userExtractor} = require('../middleware/auth')
const articleOwnerOrAdmin = require('../middleware/articleOwnership')

// this is the public route which searches any article with articleSlug slug
router.get('/:articleSlug', articlesController.getArticleBySlug)

// this helps in posting the article only if you are a singed in author 
router.post(
  '/',
  tokenExtractor,
  userExtractor,
  articlesController.createArticle
)

// this posts the comment on a given article (having id)
router.post(
  '/:id/comments',
  tokenExtractor,
  userExtractor,
  articlesController.createComment
)

// it likes a given article (having id)
router.post(
  '/:id/like',
  tokenExtractor,
  userExtractor,
  articlesController.toggleLike
)

// it dislikes a given article (having id)
router.post(
  '/:id/dislike',
  tokenExtractor,
  userExtractor,
  articlesController.toggleDislike
)



// This allows only the signed in owner of the article (author) to update a specific article
router.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  articleOwnerOrAdmin,
  articlesController.updateArticle
)

// This allows only the signed in owner of the article (author) to delete a specific article

router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  articleOwnerOrAdmin,
  articlesController.deleteArticle
)


module.exports = router
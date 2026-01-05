const Article = require('../models/article')

// checks if the person accessing the article for deleting or updating is 
// either the author or the admin
const articleOwnerOrAdmin = async (req, res, next) => {
  // first tries to find the article from the requested parameter 
  const article = await Article.findById(req.params.id)

  // if doesn't exist just send relavant error status
  if (!article) {
    return res.status(404).json({ error: 'article not found' })
  }

  // check if either the article's author's 
  const isOwner = article.author.toString() === req.user.id
  const isAdmin = req.user.role === 'admin'

  // send forbidden error status if neither
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: 'forbidden' })
  }

  // else send the requested article
  req.article = article
  next()
}

module.exports = articleOwnerOrAdmin

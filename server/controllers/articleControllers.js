const Article = require('../models/article')
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const Reaction = require('../models/reaction')


// GET /api/articles
// returns all articles created by the logged-in author (draft + published)
const getMyArticles = async (req, res) => {
  const articles = await Article.find({
    author: req.user.id,
  })
    .populate('blog', 'title slug')
    .sort({ createdAt: -1 })

  res.json(articles)
}



// this functions helps in getting any article by its slug to anyone 
const getArticleBySlug = async (req, res) => {
  // finds one article with the slug as mentioned in the slug value and is published
  const article = await Article.findOne({
    slug: req.params.articleSlug,
    published: true,
  })
    // it then populates its author with author username and roles
    .populate('author', 'username role')
    // this populates the blog with the title and the slug of the blog
    .populate('blog', 'title slug')
  // throws 404 if not found the article 
  if (!article) {
    return res.status(404).json({ error: 'article not found' })
  }

  // finds all the comments related to the article date wise 
  const comments = await Comment.find({ article: article._id })
    .populate('user', 'username')
    .sort({ createdAt: 1 })

  //sends the constrcuted article in the response
  res.json({
    ...article.toJSON(),
    comments,
  })
}


// this function creates an article 
const createArticle = async (req, res) => {

  // destructres the request body
  const { title, slug, content, blogId, published } = req.body

  // if it is either an author or the admin then only it allows them to create new article 
  if (!['author', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'not allowed' })
  }

  // if the blogId provided doesn't belong to any article then it throws the error
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return res.status(400).json({ error: 'invalid blog' })
  }

  // constructes the article object to send (published is default false ie draft)
  const article = new Article({
    title,
    slug,
    content,
    blog: blog._id,
    author: req.user.id,
    published,
  })

  // saves the article and sends relevant success status
  const saved = await article.save()
  res.status(201).json(saved)
}


// updates the article with a given Id in the parameter which is handeled by the three middlewares
const updateArticle = async (req, res) => {
  const { title, content, published } = req.body

  // if new value is provided then set it 
  req.article.title = title ?? req.article.title
  req.article.content = content ?? req.article.content

  // the author can choose to publish the article by marking this true
  req.article.published = published ?? req.article.published

  const updated = await req.article.save()
  res.json(updated)
}


// this deletes the articles 
const deleteArticle = async (req, res) => {
  // deletes the requested article
  await req.article.deleteOne()
  res.status(204).end()
}

const createComment = async (req, res) => {

  // destructes the content for the request body
  const { content } = req.body
  // if the conent is missing or is just whitespaces then return suitable error 
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'comment content required' })
  }

  // find the article by requested id in the parameters 
  const article = await Article.findById(req.params.id)
  // if article doesn't exist then send the apt error (bad request)
  if (!article) {
    return res.status(400).json({ error: 'invalid article' })
  }

  // if article isn't published, the person is forbidden from commenting 
  if (!article.published) {
    return res.status(403).json({ error: 'cannot comment on draft article' })
  }

  // create a comment object
  const comment = new Comment({
    article: article._id,
    user: req.user.id,
    content,
  })

  // save it in the database and send created status
  const saved = await comment.save()
  res.status(201).json(saved)
}



const toggleLike = async (req, res) => {
  // get the article sent in the paramters 
  const article = await Article.findById(req.params.id)

  // if article is not published or the article doesn't exist 
  if (!article || !article.published) {
    return res.status(400).json({ error: 'article cannot be liked' })
  }

  // find the existing reaction of the specific user on that specific article 
  const existingReaction = await Reaction.findOne({
    user: req.user.id,
    article: article._id,
  })

  // if no reactions exist, just like the article 
  if (!existingReaction) {
    await Reaction.create({
      user: req.user.id,
      article: article._id,
      type: 'like',
    })
    // and increment the likecount on the article 
    await Article.findByIdAndUpdate(article._id, {
      // this increments the likesCount on the article by 1
      $inc: { likesCount: 1 },
    })
  } 
  
  // if a like already exists
  else if (existingReaction.type === 'like') {
    // delete the like or unlike it 
    await existingReaction.deleteOne()

    // and decrement the existing Likecount by incrementing it by -1
    await Article.findByIdAndUpdate(article._id, {
      $inc: { likesCount: -1 },
    })
  } 
  else {
    // else the reaction type is dislike so turn it to like 
    existingReaction.type = 'like'
    // save the reaction
    await existingReaction.save()
    // and increment like count by one and decrement the dislike count by one 
    await Article.findByIdAndUpdate(article._id, {
      $inc: { likesCount: 1, dislikesCount: -1 },
    })
  }

  // now get the updated article 
  const updated = await Article.findById(article._id)

  // and sent the updated like and dislike count in reponse
  res.json({
    likesCount: updated.likesCount,
    dislikesCount: updated.dislikesCount,
  })
}

// similar steps follow in the dislike flow as in the like flow
const toggleDislike = async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article || !article.published) {
    return res.status(404).json({ error: 'article not found' })
  }

  const existingReaction = await Reaction.findOne({
    user: req.user.id,
    article: article._id,
  })

  if (!existingReaction) {
    await Reaction.create({
      user: req.user.id,
      article: article._id,
      type: 'dislike',
    })

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: 1 },
    })
  } 
  else if (existingReaction.type === 'dislike') {
    await existingReaction.deleteOne()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: -1 },
    })
  } 
  else {
    existingReaction.type = 'dislike'
    await existingReaction.save()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: 1, likesCount: -1 },
    })
  }
  

  const updated = await Article.findById(article._id)

  res.json({
    likesCount: updated.likesCount,
    dislikesCount: updated.dislikesCount,
  })
}


module.exports = {getMyArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle, createComment, toggleLike, toggleDislike}
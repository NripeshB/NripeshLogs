const Article = require('../models/article')
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const Reaction = require('../models/reaction')

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

  //sends the constrcuted article in the response
  res.json(article)
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
  const { content } = req.body

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'comment content required' })
  }

  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.status(400).json({ error: 'invalid article' })
  }

  if (!article.published) {
    return res.status(403).json({ error: 'cannot comment on draft article' })
  }

  const comment = new Comment({
    article: article._id,
    user: req.user.id,
    content,
  })

  const saved = await comment.save()
  res.status(201).json(saved)
}


const toggleLike = async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.status(400).json({ error: 'invalid article' })
  }

  if (!article.published) {
    return res.status(403).json({ error: 'cannot like draft article' })
  }

  const existingReaction = await Reaction.findOne({
    user: req.user.id,
    article: article._id,
  })

  // CASE 1: No reaction → add like
  if (!existingReaction) {
    await Reaction.create({
      user: req.user.id,
      article: article._id,
      type: 'like',
    })

    await Article.findByIdAndUpdate(article._id, {
      $inc: { likesCount: 1 },
    })

    return res.json({ status: 'liked' })
  }

  // CASE 2: Already liked → unlike
  if (existingReaction.type === 'like') {
    await existingReaction.deleteOne()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { likesCount: -1 },
    })

    return res.json({ status: 'unliked' })
  }

  // CASE 3: Disliked → switch to like
  if (existingReaction.type === 'dislike') {
    existingReaction.type = 'like'
    await existingReaction.save()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { likesCount: 1, dislikesCount: -1 },
    })

    return res.json({ status: 'switched_to_like' })
  }
}

const toggleDislike = async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.status(400).json({ error: 'invalid article' })
  }

  if (!article.published) {
    return res.status(403).json({ error: 'cannot dislike draft article' })
  }

  const existingReaction = await Reaction.findOne({
    user: req.user.id,
    article: article._id,
  })

  // CASE 1: No reaction → add dislike
  if (!existingReaction) {
    await Reaction.create({
      user: req.user.id,
      article: article._id,
      type: 'dislike',
    })

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: 1 },
    })

    return res.json({ status: 'disliked' })
  }

  // CASE 2: Already disliked → remove dislike
  if (existingReaction.type === 'dislike') {
    await existingReaction.deleteOne()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: -1 },
    })

    return res.json({ status: 'undisliked' })
  }

  // CASE 3: Liked → switch to dislike
  if (existingReaction.type === 'like') {
    existingReaction.type = 'dislike'
    await existingReaction.save()

    await Article.findByIdAndUpdate(article._id, {
      $inc: { dislikesCount: 1, likesCount: -1 },
    })

    return res.json({ status: 'switched_to_dislike' })
  }
}

module.exports = {getArticleBySlug, createArticle, updateArticle, deleteArticle, createComment, toggleLike, toggleDislike}
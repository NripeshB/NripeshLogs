
// updates the article with a given Id in the parameter which is handeled by the three middlewares
const updateComment = async (req, res) => {
  const { content } = req.body

  // if the content is all whitespaces send error
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'comment content required' })
  }

  // assign the new content to the previous content
  req.comment.content = content
  const updated = await req.comment.save()

  res.json(updated)
}


// this deletes the comment 
const deleteComment = async (req, res) => {
  // deletes the requested comment
  await req.comment.deleteOne()
  res.status(204).end()
}


module.exports = { updateComment, deleteComment}
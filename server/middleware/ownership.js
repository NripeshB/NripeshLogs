const Blog = require('../models/blog')

// this middleware is used to check if the delete or update request
// is coming from either the blog owner or the admin
const blogOwnerOrAdmin = async(req,res,next)=>{
    const blog = await Blog.findById(req.params.id)

    if(!blog){
        return res.status(400).json({
            error: 'blog not found'
        })
    }

    // if the id of ther blog's author matches the requesting user's id 
    const isOwner = blog.author.toString() === req.user.id
    // or the user requesting is the admin
    const isAdmin = req.user.role === 'admin'

    // if not then forbit them from doing so
    if(!isOwner && !isAdmin){
        return res.status(403).json({
            error: ' forbidden '
        })
    }
    // then pass the action forward
    req.blog = blog
    next()
}

module.exports = {blogOwnerOrAdmin}
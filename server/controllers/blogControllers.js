const Blog = require('../models/blog')
const Article = require('../models/article')


const getAllBlogs = async(req, res)=>{
    // get all the blogs with the blog details along with the author's username and role in json 
    const blogs = await Blog.find({}).populate('author', 'username role')
    res.json(blogs)
}

const getBlogBySlug = async(req, res)=>{
    // find a blog with the parameter blogSlug with the author's username and role attatched to them
    const blog = await Blog.findOne({slug : req.params.blogSlug}).populate('author', 'username role')

    // if it doesn't exist send not found
    if(!blog){
        return res.status(404).json({
            error: 'blog not found'
        })
    }

    // get all the articles written inside the given blog that are published
    const articles = await Article.find({
        blog: blog._id,
        published: true,
    })

    // and send them as the response 
    res.json({blog,articles})

}

const createBlog = async(req, res)=>{
    const { title, slug, description } = req.body

    // if the requesting user is neither an author nor an admin
    // don't allow them to create a blog
    if(!['author','admin'].includes(req.user.role)){
        return res.status(403).json({
            error: 'not allowed'
        })
    }

    // creating the blog object 
    const blog = new Blog({
        title,
        slug,
        description,
        // this prevents the author or admin to write articles from any other author's ID
        author: req.user.id,
    })

    // save the blog and send the respective successful status
    const saved = await blog.save()
    res.status(201).json(saved)
}

const updateBlog = async (req, res) => {
  const { title, description } = req.body

  // the only fields that can be edited in a blog are these: 
  req.blog.title = title ?? req.blog.title
  req.blog.description = description ?? req.blog.description

  // send the updated request body
  const updated = await req.blog.save()
  res.json(updated)
}

const deleteBlog = async (req, res) => {
    // delete the requested blog 
  await req.blog.deleteOne()
  res.status(204).end()
}




module.exports = {getAllBlogs,getBlogBySlug,createBlog,updateBlog,deleteBlog}


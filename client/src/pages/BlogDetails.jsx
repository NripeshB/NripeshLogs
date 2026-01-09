import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogsBySlug } from '../api/blogs.api'
import {
  Typography,
  Stack,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material'

const BlogDetail = () => {
  const { blogSlug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogsBySlug(blogSlug)
        console.log('BLOG RESPONSE:', data)

        setBlog(data)
      } catch (err) {
        console.error(err);
        
        setError('Blog not found')
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [blogSlug])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography color="text.secondary">{blog.description}</Typography>
      <Typography variant="caption">
        by {blog.author.username}
      </Typography>

      <Divider />

      <Typography variant="h6">Articles</Typography>

      {blog.articles.length === 0 ? (
        <Typography color="text.secondary">
          No articles published yet.
        </Typography>
      ) : (
        blog.articles.map((article) => (
          <Typography
            key={article.id}
            component={Link}
            to={`/articles/${article.slug}`}
            sx={{ textDecoration: 'none' }}
          >
            {article.title}
          </Typography>
        ))
      )}
    </Stack>
  )
}

export default BlogDetail

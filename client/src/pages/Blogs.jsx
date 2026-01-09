import { useEffect, useState } from 'react'
import { getAllBlogs } from '../api/blogs.api'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  CardActionArea,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs()
        setBlogs(data)
      } catch (err) {
        setError('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Grid container spacing={3}>
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} key={blog.id}>
          <Card>
            <CardActionArea component={Link} to={`/blogs/${blog.slug}`}>
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  by {blog.author.username}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Blogs

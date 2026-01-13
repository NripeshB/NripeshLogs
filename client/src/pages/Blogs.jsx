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
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardActionArea
          component={Link}
          to={`/blogs/${blog.slug}`}
          sx={{ flexGrow: 1, alignItems: 'stretch' }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {blog.title}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {blog.description}
            </Typography>

            {/* Author */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
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

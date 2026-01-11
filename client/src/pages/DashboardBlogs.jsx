import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllBlogs } from '../api/blogs.api'
import {
  Typography,
  Stack,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material'
import { Link } from 'react-router-dom'

const DashboardBlogs = () => {
  const user = useSelector((state) => state.auth.user)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getAllBlogs()
      const owned = data.filter(
        (blog) => blog.author.id === user.id
      )
      setBlogs(owned)
      setLoading(false)
    }
    fetchBlogs()
  }, [user.id])

  if (loading) return <CircularProgress />

  return (
    <Stack spacing={2}>
      <Typography variant="h5">My Blogs</Typography>

      {blogs.length === 0 ? (
        <Typography color="text.secondary">
          You haven’t created any blogs yet.
        </Typography>
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography color="text.secondary">
                {blog.description}
              </Typography>

              <Typography
                component={Link}
                to={`/dashboard/blogs/${blog.id}/edit`}
                sx={{ mt: 1, display: 'inline-block' }}
              >
                Edit Blog
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  )
}

export default DashboardBlogs

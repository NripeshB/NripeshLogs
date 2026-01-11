import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllBlogs } from '../api/blogs.api'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Stack,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material'

const DashboardBlogs = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getAllBlogs()
        const owned = data.filter(
          (blog) => blog.author.id === user.id
        )

        setBlogs(owned)
      } catch (e) {
        setError(
          e.response?.data?.error || 'Failed to load blogs'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [user])

  if (loading) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">My Blogs</Typography>

      {blogs.length === 0 ? (
        <Typography color="text.secondary">
          You haven’t created any blogs yet.
        </Typography>
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id} sx={{ cursor: 'pointer' }}>
            <CardContent
              onClick={() =>
                navigate(`/dashboard/blogs/${blog.id}`)
              }
            >
              <Typography variant="h6">
                {blog.title}
              </Typography>
              <Typography color="text.secondary">
                {blog.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  )
}

export default DashboardBlogs

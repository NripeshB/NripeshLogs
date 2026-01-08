import { useEffect, useState } from 'react'
import { getAllBlogs } from '../api/blogs.api'
import { Typography, Stack } from '@mui/material'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs()
        console.log(data)
        setBlogs(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) return <Typography>Loading blogs...</Typography>

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Blogs</Typography>
      {blogs.map((blog) => (
        <Typography key={blog.id}>{blog.title}</Typography>
      ))}
    </Stack>
  )
}

export default Blogs

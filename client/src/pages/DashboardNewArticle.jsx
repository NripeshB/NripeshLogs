import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../api/articles.api'
import { getAllBlogs } from '../api/blogs.api'
import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
} from '@mui/material'

const DashboardNewArticle = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [blogId, setBlogId] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllBlogs().then(setBlogs)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !slug || !content || !blogId) {
      setError('All fields are required')
      return
    }

    try {
      setLoading(true)
      await createArticle({
        title,
        slug,
        content,
        blogId,
        published: false, // draft by default
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={800}>
        <Typography variant="h5">Create New Article</Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          helperText="Used in the URL"
          required
        />

        <TextField
          select
          label="Blog"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
          required
        >
          {blogs.map((blog) => (
            <MenuItem key={blog.id} value={blog.id}>
              {blog.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Content (Markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          minRows={10}
          required
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving…' : 'Create Article'}
        </Button>
      </Stack>
    </form>
  )
}

export default DashboardNewArticle

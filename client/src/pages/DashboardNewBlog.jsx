import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../api/blogs.api'
import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material'

const DashboardNewBlog = () => {
  const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')           // spaces → hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
}

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setLoading(true)
      await createBlog({ title,slug, description })
      navigate('/dashboard/blogs')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={600}>
        <Typography variant="h5">Create New Blog</Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          value={title}
          onChange={(e) => {
            const newTitle = e.target.value
            setTitle(newTitle)
            setSlug(slugify(newTitle))
          }}
          required
        />
        <TextField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          helperText="Used in the URL"
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Creating…' : 'Create Blog'}
        </Button>
      </Stack>
    </form>
  )
}

export default DashboardNewBlog

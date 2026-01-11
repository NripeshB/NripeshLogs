import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../api/blogs.api'
import { getAllBlogs } from '../api/blogs.api'
import {
  Stack, TextField, Button, Typography, Alert, Dialog,
  DialogTitle, DialogActions
} from '@mui/material'

const DashboardEditBlog = () => {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getAllBlogs().then((blogs) => {
      const blog = blogs.find(b => b.id === blogId)
      if (!blog) return navigate('/dashboard/blogs')
      setTitle(blog.title)
      setDescription(blog.description || '')
    })
  }, [blogId, navigate])

  const handleUpdate = async () => {
    try {
      await updateBlog(blogId, { title, description })
      navigate('/dashboard/blogs')
    } catch (e) {
      setError(e.response?.data?.error || 'Update failed')
    }
  }

  const handleDelete = async () => {
    await deleteBlog(blogId)
    navigate('/dashboard/blogs')
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Edit Blog</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline />

      <Button variant="contained" onClick={handleUpdate}>Save</Button>
      <Button color="error" onClick={() => setOpen(true)}>Delete</Button>

      <Dialog open={open}>
        <DialogTitle>Delete this blog?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default DashboardEditBlog

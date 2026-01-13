import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { updateArticle, togglePublish, deleteArticle } from '../api/articles.api'
import {
  Stack, TextField, Button, Typography, Alert
} from '@mui/material'

const DashboardEditArticle = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()

  const [error, setError] = useState(null)


const location = useLocation()
const [article, setArticle] = useState(
  location.state?.article || null
)
const handleDelete = async()=>{
  await deleteArticle(article.id)
   navigate('/dashboard')
}

const handleTogglePublish = async () => {
  try {
    await togglePublish(article.id, {
      published: !article.published,
    })

    setArticle({
      ...article,
      published: !article.published,
    })
  } catch (e) {
    setError(
      e.response?.data?.error ||
      'You are not allowed to do this'
    )
  }
}

useEffect(() => {
  if (!article) {
    navigate('/dashboard')
  }
}, [article, navigate])

  if (!article) return null

  const handleSave = async () => {
    try {
      await updateArticle(article.id, {
        title: article.title,
        content: article.content,
      })
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.error)
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Edit Article</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Title"
        value={article.title}
        onChange={e => setArticle({ ...article, title: e.target.value })}
      />

      <TextField
        multiline
        minRows={10}
        label="Content"
        value={article.content}
        onChange={e => setArticle({ ...article, content: e.target.value })}
      />

      <Button variant="contained" onClick={handleSave}>Save</Button>

      <Button
        variant="contained "
        onClick={handleTogglePublish}
      >
        {article.published ? 'Unpublish' : 'Publish'}
      </Button>


      <Button color="error" onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  )
}

export default DashboardEditArticle

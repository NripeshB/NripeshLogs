import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from '@mui/material'
import {
  getMyArticles,
  togglePublish,
  deleteArticle,
} from '../api/articles.api'
import { getAllBlogs } from '../api/blogs.api'



const DashboardBlogDetail = () => {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

  const [blog, setBlog] = useState(null)
  const [articles, setArticles] = useState([])
  
  const handleTogglePublish = async (article) => {
  try {
    await togglePublish(article.id, {
      published: !article.published,
    })
    load()
  } catch (e) {
    alert(
      e.response?.data?.error ||
      'You are not allowed to do this'
    )
  }
}


  const handleDelete = async (id) => {
  const ok = window.confirm(
    'Delete this article? This cannot be undone.'
  )
  if (!ok) return

  await deleteArticle(id)
  load()
}


const load = async () => {
  try {
    setLoading(true)
    setError(null)

    const blogs = await getAllBlogs()
    const found = blogs.find((b) => b.id === blogId)
    
    if (!found) {
      setError('Blog not found')
      return
    }

    setBlog(found)

    const allArticles = await getMyArticles()
    setArticles(
      allArticles.filter((a) => a.blog.id === blogId)
    )
  } catch (e) {
    if (e.response?.status === 403) {
      setError('You are not allowed to view this blog')
    } else {
      setError('Failed to load blog data')
    }
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    load()
  }, [blogId])

  if (!blog) return null
  if (loading) {
  return <Typography>Loading blog…</Typography>
}

if (error) {
  return <Typography color="error">{error}</Typography>
}

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography color="text.secondary">
        {blog.description}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
          onClick={() =>
            navigate(`/dashboard/blogs/${blogId}/edit`)
          }
        >
          Edit Blog
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/dashboard/articles/new`
            )
          }
        >
          New Article
        </Button>
      </Stack>

      {articles.length === 0 ? (
        <Typography color="text.secondary">
          No articles in this blog yet.
        </Typography>
      ) : (
        articles.map((article) => (
          <Card key={article.id}>
            <CardContent>
              <Typography variant="h6">
                {article.title}
              </Typography>

              <Chip
                size="small"
                label={
                  article.published ? 'Published' : 'Draft'
                }
                color={
                  article.published ? 'success' : 'default'
                }
              />

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  onClick={() =>
                    navigate(
                      `/dashboard/articles/${article.id}/edit`,
                      { state: { article } }
                    )

                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleTogglePublish(article)}
                >
                  {article.published ? 'Unpublish' : 'Publish'}
                </Button>


                <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(article.id)}
                    >
                    Delete
                </Button>

              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  )
}

export default DashboardBlogDetail

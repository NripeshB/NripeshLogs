import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug } from '../api/articles.api'
import {
  Stack,
  Typography,
  Chip,
  Divider,
  Alert,
  Skeleton,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ArticleDetail = () => {
  const { articleSlug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleBySlug(articleSlug)
        setArticle(data)
      } catch {
        setError('Article not found')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [articleSlug])

  if (loading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="text" height={50} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={300} />
      </Stack>
    )
  }

  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Stack spacing={3}>
      {/* Title */}
      <Typography variant="h3">{article.title}</Typography>

      {/* Meta */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          by{' '}
          <Link to={`/authors/${article.author.username}`}>
            {article.author.username}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          in{' '}
          <Link to={`/blogs/${article.blog.slug}`}>
            {article.blog.title}
          </Link>
        </Typography>

        <Chip
          size="small"
          label={article.published ? 'Published' : 'Draft'}
          color={article.published ? 'success' : 'default'}
        />
      </Stack>

      <Divider />

      {/* Content */}
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ children }) => (
      <Typography variant="h4" gutterBottom component="h1">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h5" gutterBottom component="h2">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h6" gutterBottom component="h3">
        {children}
      </Typography>
    ),

    p: ({ children }) => (
      <Typography
        variant="body1"
        paragraph
        component="p"
      >
        {children}
      </Typography>
    ),

    ul: ({ children }) => (
      <Typography component="ul" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Typography>
    ),

    ol: ({ children }) => (
      <Typography component="ol" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Typography>
    ),

    li: ({ children }) => (
      <li>
        <Typography component="span" variant="body1">
          {children}
        </Typography>
      </li>
    ),
  }}
>
  {article.content}
</ReactMarkdown>

    </Stack>
  )
}

export default ArticleDetail

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug, likeArticle, dislikeArticle, addComment, } from '../api/articles.api'
import { useSelector } from 'react-redux'
import {
  Stack,
  Typography,
  Chip,
  Divider,
  Alert,
  Skeleton,
  Button,
  TextField
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ArticleDetail = () => {
  const { articleSlug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const user = useSelector((state) => state.auth.user)

  const refreshArticle = async () => {
    const updated = await getArticleBySlug(articleSlug)
    setArticle(updated)
  }

  const handleLike = async () => {
    if (!user) return
    setActionLoading(true)
    await likeArticle(article.id)
    await refreshArticle()
    setActionLoading(false)
  }

  const handleDislike = async () => {
    if (!user) return
    setActionLoading(true)
    await dislikeArticle(article.id)
    await refreshArticle()
    setActionLoading(false)
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return
    setActionLoading(true)
    await addComment(article.id, commentText)
    setCommentText('')
    await refreshArticle()
    setActionLoading(false)
  }




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

      {/* Engagement */}
        <Divider />

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>👍 {article.likesCount}</Typography>
          <Typography>👎 {article.dislikesCount}</Typography>

          {user ? (
            <>
              <Button
                size="small"
                onClick={handleLike}
                disabled={actionLoading}
              >
                Like
              </Button>
              <Button
                size="small"
                onClick={handleDislike}
                disabled={actionLoading}
              >
                Dislike
              </Button>
            </>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Login to like or comment
            </Typography>
          )}
        </Stack>

        <Divider />

        <Typography variant="h6">Comments</Typography>

      {(article.comments?.length ?? 0) === 0 ? (
        <Typography color="text.secondary">
        No comments yet.
        </Typography>) 
        :
        (
       (article.comments ?? []).map((comment) => (
          <Stack key={comment.id} spacing={0.5}>
            <Typography variant="body2">
              <strong>{comment.user.username}</strong>
            </Typography> 
            <Typography variant="body1">{comment.content}</Typography>
          </Stack>
        ))
      )}
    {user && (
      <Stack spacing={1}>
        <TextField
          multiline
          minRows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          disabled={actionLoading}
        >
          Post Comment
        </Button>
      </Stack>
    )}


  </Stack>
  )
}

export default ArticleDetail

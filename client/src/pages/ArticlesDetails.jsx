import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug, likeArticle, dislikeArticle, addComment } from '../api/articles.api'
import { useSelector } from 'react-redux'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Stack,
  Typography,
  Chip,
  Divider,
  Alert,
  Skeleton,
  Button,
  TextField,
  Box,
  IconButton,
  Paper
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CommentItem from '../components/commentItem'

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
    <Stack spacing={4}>
      {/* Title */}
      <Typography variant="h2" component="h1" gutterBottom>
        {article.title}
      </Typography>

      {/* Meta */}
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Typography variant="body2" color="text.secondary">
          by{' '}
          <Link 
            to={`/authors/${article.author.username}`}
            style={{
              color: 'rgb(133, 0, 156)',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {article.author.username}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          in{' '}
          <Link 
            to={`/blogs/${article.blog.slug}`}
            style={{
              color: 'rgb(133, 0, 156)',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {article.blog.title}
          </Link>
        </Typography>

        {/* <Chip
          size="small"
          label={article.published ? 'Published' : 'Draft'}
          color={article.published ? 'success' : 'default'}
        /> */}
      </Stack>

      {/* Main Content */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, bgcolor: 'black' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <Typography variant="h4" gutterBottom sx={{ mt: 0 }}>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {children}
              </Typography>
            ),
            h4: ({ children }) => (
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {children}
              </Typography>
            ),
            h5: ({ children }) => (
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                {children}
              </Typography>
            ),
            h6: ({ children }) => (
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {children}
              </Typography>
            ),
            
            // ✅ FIX: Use div instead of Typography paragraph for paragraphs
            p: ({ children }) => (
              <div style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                {children}
              </div>
            ),
            
            code({ inline, className, children }) {
              if (inline) {
                return (
                  <code
                    className={className}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '0.875em',
                      color: '#d63384',
                    }}
                  >
                    {children}
                  </code>
                )
              }

              const language =
                className?.replace('language-', '') || 'plaintext'

              return (
                <SyntaxHighlighter
                  language={language}
                  style={tomorrow}
                  customStyle={{
                    margin: '24px 0',
                    borderRadius: '12px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
            },
            
            blockquote: ({ children }) => (
              <Typography
                component="blockquote"
                sx={{
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 3,
                  pr: 3,
                  py: 2,
                  color: 'text.primary',
                  fontStyle: 'italic',
                  my: 3,
                  bgcolor: 'grey.50',
                  borderRadius: '4px'
                }}
              >
                {children}
              </Typography>
            ),
            
            // ✅ Clean lists - NO Typography wrappers
            ul: ({ children }) => (
              <ul style={{ paddingLeft: '24px', margin: '16px 0' }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol style={{ paddingLeft: '24px', margin: '16px 0' }}>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: '12px', lineHeight: 1.6 }}>
                {children}
              </li>
            ),
            
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'rgb(133, 0, 156)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {children}
              </a>
            )
          }}
        >
          {article.content}
        </ReactMarkdown>
      </Paper>

      {/* Clear visual separation */}
      <Divider sx={{ my: 4, borderBottomWidth: 2 }} />

      {/* Engagement Section */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center" mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={handleLike}
              disabled={actionLoading || !user}
              sx={{ 
                p: 1,
                '&:hover': { bgcolor: 'primary.50' }
              }}
            >
              <img 
                src='/like.svg' 
                alt="Like" 
                style={{ width: 30, height: 30 }}
              />
            </IconButton>
            <Typography variant="h6">{article.likesCount}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={handleDislike}
              disabled={actionLoading || !user}
              sx={{ 
                p: 1,
                '&:hover': { bgcolor: 'error.50' }
              }}
            >
              <img 
                src='/dislike.svg'
                alt="Dislike" 
                style={{ width: 30, height: 30 }}
              />
            </IconButton>
            <Typography variant="h6">{article.dislikesCount}</Typography>
          </Stack>

          {!user && (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              <Link 
                to="/login"
                style={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Login to vote
              </Link>
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Comments Section */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Comments
        </Typography>

        {(article.comments?.length ?? 0) === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No comments yet.
          </Typography>
        ) : (
          (article.comments ?? []).map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdated={refreshArticle}
            />
          ))
        )}

        {user && (
          <Stack spacing={2} sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <TextField
              multiline
              minRows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={actionLoading || !commentText.trim()}
              sx={{ alignSelf: 'flex-start', px: 4 }}
            >
              Post Comment
            </Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  )
}

export default ArticleDetail

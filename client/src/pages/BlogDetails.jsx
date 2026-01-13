import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogsBySlug } from '../api/blogs.api'
import {
  Typography,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
} from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'

const BlogDetail = () => {
  const { blogSlug } = useParams()

  const [blog, setBlog] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //  useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const data = await getBlogsBySlug(blogSlug)
  //       console.log('BLOG RESPONSE:', data)

  //       setBlog(data)
  //     } catch (err) {
  //       console.error(err);
        
  //       setError('Blog not found')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchBlog()
  // }, [blogSlug])

 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogsBySlug(blogSlug)

        setBlog(data)

        // sort latest first
        const sortedArticles = [...data.articles].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        console.log('BLOG RESPONSE:', data)

        setArticles(sortedArticles)
      } catch (err) {
        console.error(err)
        setError('Blog not found')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogSlug])
   if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Stack spacing={3}>
      {/* Blog Header */}
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={600}>
          {blog.title}
        </Typography>

        {blog.description && (
          <Typography color="text.secondary">
            {blog.description}
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary">
          by {blog.author.username}
        </Typography>
      </Stack>

      <Divider />

      {/* Articles Section */}
      <Typography variant="h6" fontWeight={600}>
        Articles
      </Typography>

      {articles.length === 0 ? (
        <Typography color="text.secondary">
          No articles published yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/articles/${article.slug}`}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Article Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {article.title}
                    </Typography>

                    {/* Meta Spacer */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 'auto' }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>

                    {/* Likes / Dislikes */}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1 }}
                    >
                      <Chip
                        icon={<ThumbUpAltOutlinedIcon />}
                        label={article.likesCount}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<ThumbDownAltOutlinedIcon />}
                        label={article.dislikesCount}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  )
}

export default BlogDetail

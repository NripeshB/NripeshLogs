import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Stack, Typography, Card, CardContent } from '@mui/material'
import { getUserByUsername,getBlogsByUsername } from '../api/users.api'

const AuthorProfile = () => {
  const { username } = useParams()

  const [author, setAuthor] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getUserByUsername(username).then(setAuthor)
    getBlogsByUsername(username).then(setBlogs)
  }, [username])

  if (!author ) return null

  return (
    <Stack spacing={3}>
      {/* Profile info */}
      <Typography variant="h4">{author.username}</Typography>


      {/* Authored blogs */}
      <Typography variant="h6">Blogs</Typography>

      {blogs.length === 0 ? (
        <Typography color="text.secondary">
          No blogs published yet.
        </Typography>
      ) : (
        blogs.map(blog => (
          <Card
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.slug}`}
            sx={{ textDecoration: 'none' }}
          >
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography color="text.secondary">
                {blog.description}
              </Typography>

              {blog.articles.length > 0 && (
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Articles: {blog.articles.length}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  )
}

export default AuthorProfile

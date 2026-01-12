import { useEffect, useState } from 'react'
import { getAllUsers } from '../api/users.api'
import { Stack, Typography, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

const Authors = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    getAllUsers().then(users =>
      setAuthors(users.filter(u => u.role === 'author'))
    )
  }, [])

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Authors</Typography>

      {authors.map(author => (
        <Card
          key={author.id}
          component={Link}
          to={`/authors/${author.username}`}
          sx={{ textDecoration: 'none' }}
        >
          <CardContent>
            <Typography variant="h6">{author.username}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export default Authors

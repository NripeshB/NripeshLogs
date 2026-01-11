import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Stack,
  Typography,
  Button,
  TextField,
  Alert,
} from '@mui/material'
import { updateComment, deleteComment } from '../api/comments.api'
import { isAdmin } from '../utils/permission'

const CommentItem = ({ comment, onUpdated }) => {
  const user = useSelector((state) => state.auth.user)
  const canEdit =
    user &&
    (isAdmin(user) || user.id === comment.user.id)

  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(comment.content)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!text.trim()) return
    try {
      setLoading(true)
      await updateComment(comment.id, text)
      setEditing(false)
      onUpdated()
    } catch (e) {
      setError(e.response?.data?.error || 'Not allowed')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteComment(comment.id)
      onUpdated()
    } catch (e) {
      setError(e.response?.data?.error || 'Not allowed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        <strong>{comment.user.username}</strong>
      </Typography>

      {editing ? (
        <TextField
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={2}
        />
      ) : (
        <Typography variant="body1">{comment.content}</Typography>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {canEdit && (
        <Stack direction="row" spacing={1}>
          {editing ? (
            <>
              <Button
                size="small"
                onClick={handleSave}
                disabled={loading}
              >
                Save
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setEditing(false)
                  setText(comment.content)
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="small" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </Button>
            </>
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default CommentItem

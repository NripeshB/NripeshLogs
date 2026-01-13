import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Stack,
  Typography,
  Button,
  Paper,
  Box,
  Divider,
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
    <Paper 
  elevation={1} 
  sx={{ 
    p: 2.5, 
    mb: 2, 
    bgcolor: '#151516',
    borderRadius: 2,
    maxWidth: 600 
  }}
>
  <Stack spacing={1.5}>
    {/* Author Header */}
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Paper 
        sx={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" color="white" fontWeight={600}>
          {comment.user.username[0].toUpperCase()}
        </Typography>
      </Paper>
      
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight={700} noWrap>
          {comment.user.username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Stack>

    <Divider sx={{ borderColor: 'divider', my: 0.5 }} />

    {/* Content */}
    {editing ? (
      <Box sx={{ mt: 1 }}>
        <TextField
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={2}
          fullWidth
          size="small"
        />
      </Box>
    ) : (
      <Typography 
        variant="body1" 
        sx={{ 
          lineHeight: 1.6, 
          color: 'text.primary',
          mb: 1.5 
        }}
      >
        {comment.content}
      </Typography>
    )}

    {/* Error */}
    {error && (
      <Alert severity="error" sx={{ mt: 1 }}>
        {error}
      </Alert>
    )}

    {/* Actions */}
    {canEdit && (
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', pt: 1 }}>
        {editing ? (
          <>
            <Button
              size="small"
              onClick={handleSave}
              disabled={loading}
              variant="outlined"
            >
              Save
            </Button>
            <Button
              size="small"
              onClick={() => {
                setEditing(false)
                setText(comment.content)
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              size="small" 
              onClick={() => setEditing(true)}
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={handleDelete}
              disabled={loading}
              variant="outlined"
            >
              Delete
            </Button>
          </>
        )}
      </Stack>
    )}
  </Stack>
</Paper>

  )
}

export default CommentItem

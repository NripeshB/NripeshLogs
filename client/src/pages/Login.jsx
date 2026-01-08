import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearAuthError } from '../features/auth/authSlice'
import { Button, TextField, Stack, Typography, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, status, token } = useSelector((s) => s.auth)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (token) navigate('/dashboard')
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    }

    if (!payload.username || !payload.password) {
      setFormError('All fields are required')
      return
    }

    setFormError(null)
    dispatch(loginUser(payload))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <Typography variant="h5">Login</Typography>

        {formError && <Alert severity="error">{formError}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField name="username" label="Username" required />
        <TextField name="password" label="Password" type="password" required />

        <Button
          type="submit"
          variant="contained"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in…' : 'Login'}
        </Button>
      </Stack>
    </form>
  )
}

export default Login

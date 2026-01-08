import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../features/auth/authSlice'
import { Button, TextField, Stack, Typography, Alert } from '@mui/material'
import { useState } from 'react'

const Signup = () => {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)
  const [formError, setFormError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const payload = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }

    if (!payload.username || !payload.email || !payload.password) {
      setFormError('All fields are required')
      return
    }

    setFormError(null)
    dispatch(signupUser(payload))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <Typography variant="h5">Sign Up</Typography>

        {formError && <Alert severity="error">{formError}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField name="username" label="Username" required />
        <TextField name="email" label="Email" required />
        <TextField name="password" label="Password" type="password" required />

        <Button type="submit" variant="contained">
          Create Account
        </Button>
      </Stack>
    </form>
  )
}

export default Signup

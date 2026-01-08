import { useDispatch } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { Button, TextField, Stack, Typography } from '@mui/material'

const Login = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    dispatch(loginUser({
      username: data.get('username'),
      password: data.get('password'),
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h5">Login</Typography>
        <TextField name="username" label="Usernmae" required />
        <TextField name="password" label="Password" type="password" required />
        <Button type="submit" variant="contained">Login</Button>
      </Stack>
    </form>
  )
}

export default Login

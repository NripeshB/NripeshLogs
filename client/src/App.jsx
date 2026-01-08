import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './features/auth/authSlice'
import AppRoutes from './routes/appRoutes'

const App = () => {
  // Gets the Redux dispatch function to trigger actions
  const dispatch = useDispatch()

  // Reads the authentication token from the Redux auth state
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    // If a token exists, fetch the logged-in user's data
    if (token) {
      dispatch(fetchMe())
    }
  }, [token, dispatch]) // Runs when the token value changes
  return <AppRoutes />
}

export default App

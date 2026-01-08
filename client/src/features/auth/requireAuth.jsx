import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const { token, hydrated } = useSelector((state) => state.auth)

  if (!hydrated) return null   // prevent flicker

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RequireAuth

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuthor = () => {
  const { user, hydrated } = useSelector((state) => state.auth)

  if (!hydrated) return null

  if (!['author', 'admin'].includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireAuthor

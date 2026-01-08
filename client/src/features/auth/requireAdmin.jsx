import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { isAdmin } from '../../utils/permissions'

const RequireAdmin = () => {
  const { user, hydrated } = useSelector((state) => state.auth)

  if (!hydrated) return null

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireAdmin

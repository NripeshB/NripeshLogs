import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Login from '../pages/Login'
import Blogs from '../pages/Blogs'
import RequireAuth from '../features/auth/requireAuth'
import RequireAdmin from '../features/auth/requireAdmin'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/blogs"
        element={
          <PublicLayout>
            <Blogs />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Route>

      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<h1>Admin Panel</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

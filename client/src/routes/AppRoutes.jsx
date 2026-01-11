import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Blogs from '../pages/Blogs'
import BlogDetail from '../pages/Blogdetails'
import ArticleDetail from '../pages/ArticlesDetails'
import RequireAuth from '../features/auth/requireAuth'
import RequireAdmin from '../features/auth/requireAdmin'
import RequireAuthor from '../features/auth/requireAuthor'
import DashboardHome from '../pages/DashboardHome'
import DashboardBlogs from '../pages/DashboardBlogs'
import DashboardLayout from '../layouts/DashboardLayout'
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            {<h1>Profile Page</h1>}
          </PublicLayout>
        }
      />
    <Route
      path="/blogs"
      element={
        <PublicLayout>
          <Blogs />
        </PublicLayout>
      }
    />
    <Route
      path="/blogs/:blogSlug"
      element={
        <PublicLayout>
          <BlogDetail />
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

<Route
  path="/articles/:articleSlug"
  element={
    <PublicLayout>
      <ArticleDetail />
    </PublicLayout>
  }
/>
      
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />

      <Route element={<RequireAuth />}>
      <Route element={<RequireAuthor />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="blogs" element={<DashboardBlogs />} />
        </Route>
      </Route>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Route>

      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<h1>Admin Panel</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

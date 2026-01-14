import { Routes, Route } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Blogs from '../pages/Blogs'
import BlogDetail from '../pages/Blogdetails'
import ArticleDetail from '../pages/ArticlesDetails'

import RequireAuth from '../features/auth/RequireAuth'
import RequireAuthor from '../features/auth/requireAuthor'
import RequireAdmin from '../features/auth/RequireAdmin'

import DashboardLayout from '../layouts/DashboardLayout'
import DashboardHome from '../pages/DashboardHome'
import DashboardBlogs from '../pages/DashboardBlogs'
import DashboardNewBlog from '../pages/DashboardNewBlog'
import DashboardNewArticle from '../pages/DashboardNewArticle'
import DashboardEditBlog from '../pages/DashboardEditBlog'
import DashboardEditArticle from '../pages/DashboardEditArticle'
import DashboardBlogDetail from '../pages/DashboardBlogDetails'
import Home from '../pages/Home'
import AuthorProfile from '../pages/AuthorProfile'
import Authors from '../pages/Authors'
import AdminUsers from '../pages/AdminUsers'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/authors"
        element={
          <PublicLayout>
            <Authors />
          </PublicLayout>
        }
      />

      <Route
        path="/authors/:username"
        element={
          <PublicLayout>
            <AuthorProfile />
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
        path="/articles/:articleSlug"
        element={
          <PublicLayout>
            <ArticleDetail />
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
        path="/signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />

      {/* Author/Admin dashboard */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireAuthor />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            <Route path="blogs" element={<DashboardBlogs />} />
            <Route path="blogs/new" element={<DashboardNewBlog />} />
            <Route path="blogs/:blogId" element={<DashboardBlogDetail />} />
            <Route path="articles/new" element={<DashboardNewArticle />} />
            <Route path="blogs/:blogId/edit" element={<DashboardEditBlog />} />
            <Route path="articles/:articleId/edit" element={<DashboardEditArticle />} />
          </Route>
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>

      </Route>

    </Routes>
  )
}

export default AppRoutes

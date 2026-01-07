// import { Routes, Route} from 'react-router-dom'

// const AppRoutes = ()=>{
//     return (
//         <Routes>
//             <Route path="/" element={<h1>Landing</h1>} />
//             <Route path="/blogs" element={<h1>Blogs</h1>} />
//             <Route path="/login" element={<h1>Login</h1>} />
//         </Routes>
//     )
// }

// export default AppRoutes

import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <h1>Landing</h1>
          </PublicLayout>
        }
      />
      <Route
        path="/blogs"
        element={
          <PublicLayout>
            <h1>Blogs</h1>
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <h1>Login</h1>
          </PublicLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes

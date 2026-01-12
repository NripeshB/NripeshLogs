import api from './axios' 

// GET /api/users
export const getAllUsers = async () => {
  const res = await api.get('/api/users')
  return res.data
}
export const getBlogsByUsername = async (username) => {
  const res = await api.get(`/api/users/${username}/blogs`)
  return res.data
}

// GET /api/users/:username
export const getUserByUsername = async (username) => {
  const res = await api.get(`/api/users/${username}`)
  return res.data
}

// PATCH /api/users/:id/role  (admin only)
export const updateUserRole = async (id, role) => {
  const res = await api.patch(`/api/users/${id}/role`, { role })
  return res.data
}

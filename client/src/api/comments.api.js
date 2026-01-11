import api from './axios'

export const updateComment = async (id, content) => {
  const res = await api.put(`/api/comments/${id}`, { content })
  return res.data
}

export const deleteComment = async (id) => {
  await api.delete(`/api/comments/${id}`)
}

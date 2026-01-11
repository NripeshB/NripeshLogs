import api from './axios'

export const getMyArticles = async () => {
  const res = await api.get('/api/articles')
  return res.data
}
// the following async function (redux thunk) gets the specific article on the basis of slug
export const getArticleBySlug = async (slug) => {
  const res = await api.get(`/api/articles/${slug}`)
  return res.data
}

export const likeArticle = async (id) => {
  const res = await api.post(`/api/articles/${id}/like`)
  return res.data
}

export const dislikeArticle = async (id) => {
  const res = await api.post(`/api/articles/${id}/dislike`)
  return res.data
}

export const addComment = async (articleId, content) => {
  const res = await api.post(`/api/articles/${articleId}/comments`, {
    content,
  })
  return res.data
}

export const createArticle = async (payload) => {
  const res = await api.post('/api/articles', payload)
  return res.data
}

export const updateArticle = async (id, payload) => {
  const res = await api.put(`/api/articles/${id}`, payload)
  return res.data
}

export const togglePublish = async (id,payload) => {
  const res = await api.put(`/api/articles/${id}`,payload)
  return res.data
}

export const deleteArticle = async (id) => {
  await api.delete(`/api/articles/${id}`)
}

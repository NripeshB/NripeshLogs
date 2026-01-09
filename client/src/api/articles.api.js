import api from './axios'

export const getArticleBySlug = async (slug) => {
  const res = await api.get(`/api/articles/${slug}`)
  return res.data
}

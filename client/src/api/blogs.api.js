import api from './axios'

export const getAllBlogs = async()=>{
    const response = await api.get('/api/blogs')
    return response.data
}

export const getBlogsBySlug = async (slug) => {
  const res = await api.get(`/api/blogs/${slug}`)
  return {
    ...res.data.blog,
    articles: res.data.articles,
  }
}

export const createBlog = async (payload) => {
  const res = await api.post('/api/blogs', payload)
  return res.data
}

export const updateBlog = async (id, payload) => {
  const res = await api.put(`/api/blogs/${id}`, payload)
  return res.data
}

export const deleteBlog = async (id) => {
  await api.delete(`/api/blogs/${id}`)
}

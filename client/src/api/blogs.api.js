import api from './axios'

export const getAllBlogs = async()=>{
    const response = await api.get('/api/blogs')
    return response.data
}

export const getBlogsBySlug = async (slug)=>{
    const response = await api.get(`/api/blogs/${slug}`)
    return response.data
}
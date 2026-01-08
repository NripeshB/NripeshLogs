import api from './axios'

export const login=async (credentials)=>{
    const res = await api.post('/api/auth/login', credentials)
    return res.data
}

export const signup = async(credentials)=>{
    const res = await api.post('/api/auth/signup', credentials)
    return res.data
}

export const getMe = async () => {
  const res = await api.get('/api/auth/me')
  return res.data
}


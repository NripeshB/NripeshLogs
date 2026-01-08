import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',  
    },
})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (reponse) => reponse,
    (error)=>{
        const {status} = error.response

        if( status === 401){
            console.warn('Unauthorized')
        }

        if(status === 400){
            console.warn('Forbidden')
        }
        return Promise.reject(error)
    }
)

export default api
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const uploadVideo = async (file, onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      if (onProgress) onProgress(percentCompleted)
    },
  })
  
  return response.data
}

export const getResults = async (id) => {
  const response = await api.get(`/results/${id}`)
  return response.data
}

export const getHistory = async (limit = 10) => {
  const response = await api.get(`/history?limit=${limit}`)
  return response.data
}

export const deleteInterview = async (id) => {
  const response = await api.delete(`/results/${id}`)
  return response.data
}

// Authentication APIs
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData)
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/auth/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
  return response.data
}

export default api

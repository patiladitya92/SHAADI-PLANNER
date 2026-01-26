import axios from 'axios'

// YOUR BACKEND - Confirmed from your paste.txt
const API_BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auto-add JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle backend ApiError responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      // Your Spring Boot ApiError format
      console.error('Backend Error:', error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient

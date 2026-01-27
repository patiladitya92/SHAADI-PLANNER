import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const Login = () => {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ✅ SEND CORRECT PAYLOAD
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })

      const { token, role } = response.data

      // ✅ SAVE AUTH DATA
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      toast.success('✅ Welcome back!')

      // ✅ HANDLE REDIRECTION
      const intendedPath = localStorage.getItem('intendedPath')

      if (intendedPath && intendedPath !== '/login') {
        localStorage.removeItem('intendedPath')
        navigate(intendedPath)
      } else if (role === 'ROLE_CUSTOMER') {
        navigate('/customer/home')
      } else if (role === 'ROLE_VENDOR') {
        navigate('/vendor/dashboard')
      } else if (role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard') // if exists
      } else {
        navigate('/')
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 glass-card p-10 rounded-3xl shadow-2xl">

        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back ✨
          </h2>
          <p className="text-gray-600 mt-2">Wedding Booking Platform</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full wedding-btn py-4 text-lg font-bold disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

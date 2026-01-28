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
      console.log('🔐 Logging in:', { email }) // Debug

      // ✅ FIXED: Handle ApiResponse<T> wrapper from backend
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })

      console.log('✅ Login response:', response.data) // Debug

      // ✅ Extract from ApiResponse wrapper OR direct response
      const authData = response.data.data || response.data
      const { token, id, name, role, email: userEmail } = authData

      if (!token || !role) {
        throw new Error('Invalid login response')
      }

      // ✅ SAVE ALL AUTH DATA
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('userId', id?.toString() || '')
      localStorage.setItem('userName', name || '')
      localStorage.setItem('userEmail', userEmail || email)

      toast.success(`✅ Welcome ${name || 'back'}!`)

      // ✅ ROLE-BASED REDIRECT
      const intendedPath = localStorage.getItem('intendedPath')
      
      if (intendedPath && intendedPath !== '/login') {
        localStorage.removeItem('intendedPath')
        navigate(intendedPath)
      } else if (role === 'ROLE_CUSTOMER') {
        navigate('/customer/home')
      } else if (role === 'ROLE_VENDOR') {
        navigate('/vendor/dashboard')
      } else if (role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }

    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error)
      toast.error(error.response?.data?.message || error.response?.data?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 glass-card p-10 rounded-3xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back ✨
          </h2>
          <p className="text-gray-600">Wedding Booking Platform</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all"
              placeholder="admin@gmail.com"
              required
              disabled={loading}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder="admin"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full wedding-btn py-4 text-lg font-bold shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              '🔐 Sign In'
            )}
          </button>
        </form>

        <div className="text-center space-y-2 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Test Accounts:
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <div>👑 Admin: <code>admin@gmail.com</code> / <code>admin</code></div>
            <div>💼 Vendor: Register new</div>
            <div>👰‍♀️ Customer: Register new</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

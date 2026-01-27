import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api.js'  // YOUR axios instance

const Login = () => {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // SIMPLE POST to YOUR backend
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })
      
      console.log('✅ LOGIN SUCCESS:', response.data)
      
      // Store in localStorage (SIMPLE)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('userId', response.data.id)
      
      toast.success(`Welcome ${response.data.name || 'User'}!`)
      
      // Auto-redirect by role
      setTimeout(() => {
        switch(response.data.role) {
          case 'CUSTOMER': navigate('/customer/home'); break
          case 'VENDOR': navigate('/vendor/dashboard'); break
          case 'ADMIN': navigate('/admin/users'); break
          default: navigate('/customer/home')
        }
      }, 1500)
      
    } catch (error) {
      console.error('❌ LOGIN ERROR:', error.response?.data)
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-pink-200 focus:border-transparent transition-all"
              placeholder="admin@gmail.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-pink-200 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full wedding-btn py-4 text-lg font-bold flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

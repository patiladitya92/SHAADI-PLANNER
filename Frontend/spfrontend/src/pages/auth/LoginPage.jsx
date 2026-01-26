import { useState } from 'react'
import { useLoginMutation } from '../../features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials(result))
      
      // Role-based redirect
      if (result.role === 'ROLE_CUSTOMER') navigate('/dashboard')
      else if (result.role === 'ROLE_VENDOR') navigate('/vendor/dashboard')
      else navigate('/admin')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ShaadiPlanner
          </h1>
          <p className="text-gray-500 mt-2">Welcome back! Please login.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-600 hover:underline font-medium">
            Register here
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

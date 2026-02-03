// src/pages/auth/ResetPasswordPage.jsx
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useResetPasswordMutation } from '../../store/api/authApi'
import toast from 'react-hot-toast'

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')
  const [resetPassword] = useResetPasswordMutation()

  useEffect(() => {
    const urlToken = searchParams.get('token')
    if (!urlToken) {
      toast.error('Invalid reset link')
      navigate('/login')
    }
    setToken(urlToken)
  }, [searchParams, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      await resetPassword({ token, newPassword }).unwrap()
      toast.success('Password reset successfully!')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      toast.error(err?.data?.message || 'Reset failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="New password"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage

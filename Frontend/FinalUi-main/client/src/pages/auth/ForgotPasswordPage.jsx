// src/pages/auth/ForgotPasswordPage.jsx - COMPLETE + FIXED
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForgotPasswordMutation } from '../../store/api/authApi'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)  
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    console.log('Sending email:', email)
    
    try {
      const response = await forgotPassword({ email }).unwrap()
      console.log('SUCCESS:', response)
      setSent(true)  //  FIXED: Now defined
      toast.success('Reset link sent to your email!')
    } catch (err) {
      console.error('ERROR:', err)
      toast.error(err?.data?.message || 'Failed to send reset link')
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-emerald-100">
          <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle className="w-14 h-14 text-emerald-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a password reset link to <br />
            <span className="font-semibold text-emerald-600">
              {email}
            </span>
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xl"
          >
            Back to Login
          </button>
          
          <p className="text-xs text-gray-500 mt-6">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-blue-100">
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Login
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Forgot Password?
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm disabled:opacity-50"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <Mail size={20} />
                <span>Send Reset Link</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

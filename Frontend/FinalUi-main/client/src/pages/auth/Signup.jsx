import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'ROLE_CUSTOMER'
  })
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [showVendorFields, setShowVendorFields] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories')
      const cats = response.data.data || response.data || []
      setCategories(Array.isArray(cats) ? cats : [])
    } catch (error) {
      console.error('Categories fetch failed:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'role' && value === 'ROLE_VENDOR') {
      setShowVendorFields(true)
    }
  }

  const validateVendorFields = () => {
    if (formData.role !== 'ROLE_VENDOR') return true
    return formData.bizname && formData.addr && formData.city && formData.state && formData.catId
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateVendorFields()) {
      toast.error('Vendors must fill ALL business fields!')
      return
    }

    setLoading(true)
    try {
      console.log('📤 Registering:', formData)
      
      // ✅ FIXED: Handle ApiResponse wrapper
      const response = await apiClient.post('/auth/register', formData)
      console.log('✅ Register response:', response.data)
      
      toast.success('✅ Account created! Please login.')
      setTimeout(() => navigate('/login'), 2000)
      
    } catch (error) {
      console.error('❌ Register error:', error.response?.data)
      const errorMsg = error.response?.data?.message || error.response?.data?.data?.message || 'Registration failed'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center pt-24 pb-12">
      <div className="glass-card p-12 rounded-4xl max-w-2xl w-full mx-6 shadow-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✨ Create Account
          </h1>
          <p className="text-xl text-gray-600">Join WeddingBook as Customer or Vendor</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC FIELDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
              required
              disabled={loading}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              maxLength={10}
               minLength={10}
  pattern="[0-9]{10}"
              onChange={handleChange}
              className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg"
              required
              disabled={loading}
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all text-lg"
            required
            disabled={loading}
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
            required
            minLength={6}
            disabled={loading}
          />

          {/* ROLE SELECTOR */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all text-lg"
            disabled={loading}
          >
            <option value="ROLE_CUSTOMER">👰‍♀️ Customer</option>
            <option value="ROLE_VENDOR">💼 Wedding Vendor</option>
          </select>

          {/* VENDOR FIELDS */}
          {showVendorFields && (
            <div className="space-y-4 pt-6 border-t-2 border-dashed border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-3xl">
              <h3 className="text-2xl font-bold text-purple-800 text-center">
                📋 Vendor Business Details (Required)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="bizname"
                  type="text"
                  placeholder="Business Name"
                  value={formData.bizname || ''}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg bg-purple-50"
                  required={formData.role === 'ROLE_VENDOR'}
                  disabled={loading}
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg bg-purple-50"
                  required={formData.role === 'ROLE_VENDOR'}
                  disabled={loading}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="addr"
                  type="text"
                  placeholder="Address"
                  value={formData.addr || ''}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg bg-purple-50 md:col-span-2"
                  required={formData.role === 'ROLE_VENDOR'}
                  disabled={loading}
                />
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg bg-purple-50"
                  required={formData.role === 'ROLE_VENDOR'}
                  disabled={loading}
                />
                <select
                  name="catId"
                  value={formData.catId || ''}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg bg-purple-50"
                  required={formData.role === 'ROLE_VENDOR'}
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading || !validateVendorFields()}
            className="w-full wedding-btn py-6 text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              '✨ Create My Account'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center space-y-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/login')}
            className="text-pink-600 hover:text-pink-700 font-semibold text-xl transition-all duration-200 hover:underline flex items-center justify-center space-x-2 mx-auto"
            disabled={loading}
          >
            👈 Already have account? Login Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState(null)
  const [bookingsCount, setBookingsCount] = useState(0)
  const [loadingBookings, setLoadingBookings] = useState(false)

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const storedRole = localStorage.getItem('role')

    console.log('🔍 Navbar auth check:', {
      token: !!token,
      role: storedRole,
      path: location.pathname
    })

    if (token && storedRole) {
      setRole(storedRole)
      if (storedRole === 'ROLE_CUSTOMER') {
        fetchBookingsCount()
      }
    } else {
      setRole(null)
      setBookingsCount(0)
    }
  }

  useEffect(() => {
    checkAuth()
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'role') {
        checkAuth()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [location.pathname])

  const fetchBookingsCount = async () => {
    try {
      setLoadingBookings(true)
      const response = await apiClient.get('/bookings/me')
      setBookingsCount(response.data.data?.length || response.data.length || 0)
    } catch (error) {
      console.error('Bookings count error:', error)
      setBookingsCount(0)
    } finally {
      setLoadingBookings(false)
    }
  }

  const logout = () => {
    localStorage.clear()
    setRole(null)
    setBookingsCount(0)
    toast.success('Logged out successfully!')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass-card shadow-xl sticky top-0 z-50 py-4 px-6 bg-white/90 backdrop-blur-xl border-b border-pink-100/50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* ✅ FIXED: Logo ALWAYS goes to landing */}
        <div
          className="text-3xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-all duration-300 select-none"
          onClick={() => navigate('/')}  
          title="Shaadi Planner"
        >
          Shaadi Planner ✨
        </div>

        {/* Notifications Badge */}
        {role === 'ROLE_CUSTOMER' && bookingsCount > 0 && !loadingBookings && (
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse ml-4">
            📅 {bookingsCount > 99 ? '99+' : bookingsCount}
          </div>
        )}

        {/* User Menu */}
        {role && (
          <div className="flex items-center space-x-4">
            {role === 'ROLE_CUSTOMER' && (
              <>
                <button
                  onClick={() => navigate('/customer/home')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/customer/home')
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-rose-50 hover:shadow-lg'
                  }`}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => navigate('/customer/mybookings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/customer/mybookings')
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-purple-50 hover:shadow-lg'
                  }`}
                >
                  📅 Bookings
                </button>
              </>
            )}

            {role === 'ROLE_VENDOR' && (
              <>
                <button
                  onClick={() => navigate('/vendor/dashboard')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/vendor/dashboard')
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-emerald-50 hover:shadow-lg'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => navigate('/vendor/listings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/vendor/listings')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-blue-50 hover:shadow-lg'
                  }`}
                >
                  📝 Listings
                </button>
                <button
                  onClick={() => navigate('/vendor/bookings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/vendor/bookings')
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-purple-50 hover:shadow-lg'
                  }`}
                >
                  📋 Bookings
                </button>
              </>
            )}

            {role === 'ROLE_ADMIN' && (
              <>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/admin/dashboard')
                      ? 'bg-gradient-to-r from-slate-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-slate-50 hover:shadow-lg'
                  }`}
                >
                  🛡️ Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/users')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition-all ${
                    isActive('/admin/users')
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-indigo-50 hover:shadow-lg'
                  }`}
                >
                  👥 Users
                </button>
              </>
            )}

            <button
              onClick={logout}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              🚪 Logout
            </button>
          </div>
        )}

        {/* Guest Menu */}
        {!role && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              🔐 Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              ✨ Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

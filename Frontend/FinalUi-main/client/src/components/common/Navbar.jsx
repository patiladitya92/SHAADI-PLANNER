import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass-card shadow-xl sticky top-0 z-50 py-4 px-6 bg-white/80 backdrop-blur-xl border-b border-pink-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div
            className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => {
              if (role === 'ROLE_CUSTOMER') navigate('/customer/home')
              else if (role === 'ROLE_VENDOR') navigate('/vendor/dashboard')
              else if (role === 'ROLE_ADMIN') navigate('/admin/dashboard')
              else navigate('/login')
            }}
          >
            WeddingBook ✨
          </div>
          {role === 'ROLE_CUSTOMER' && bookingsCount > 0 && !loadingBookings && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              📅 {bookingsCount > 99 ? '99+' : bookingsCount}
            </div>
          )}
        </div>

        {role && (
          <div className="flex items-center space-x-4">
            {role === 'ROLE_CUSTOMER' && (
              <>
                <button
                  onClick={() => navigate('/customer/home')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/customer/home')
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => navigate('/customer/mybookings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/customer/mybookings')
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-purple-50'
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
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/vendor/dashboard')
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => navigate('/vendor/listings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/vendor/listings')
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  📝 Listings
                </button>
                <button
                  onClick={() => navigate('/vendor/bookings')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/vendor/bookings')
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-blue-50'
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
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/admin/dashboard')
                      ? 'bg-gradient-to-r from-slate-500 to-indigo-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  🛡️ Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/users')}
                  className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm ${
                    isActive('/admin/users')
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : 'bg-white/50 text-gray-700 hover:bg-indigo-50'
                  }`}
                >
                  👥 Users
                </button>
              </>
            )}

            <button
              onClick={logout}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              🚪 Logout
            </button>
          </div>
        )}

        {!role && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg"
            >
              🔐 Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg"
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

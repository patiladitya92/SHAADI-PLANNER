import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiClient from '../../utils/api'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [role, setRole] = useState(null)
  const [bookingsCount, setBookingsCount] = useState(0)
  const [loadingBookings, setLoadingBookings] = useState(false)

  // 🔐 AUTH CHECK (UI ONLY — no authorization here)
  useEffect(() => {
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

    checkAuth()

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'role') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [location.pathname])

  // 📅 CUSTOMER BOOKINGS COUNT
  const fetchBookingsCount = async () => {
    try {
      setLoadingBookings(true)
      const response = await apiClient.get('/bookings/me')
      setBookingsCount(response.data.length || 0)
    } catch (error) {
      console.error('Bookings count error:', error)
      setBookingsCount(0)
    } finally {
      setLoadingBookings(false)
    }
  }

  // 🚪 LOGOUT
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

        {/* 🔷 LOGO */}
        <div className="flex items-center space-x-4">
          <div
            className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => {
              if (role === 'ROLE_CUSTOMER') navigate('/customer/home')
              else if (role === 'ROLE_VENDOR') navigate('/vendor/dashboard')
              else navigate('/login')
            }}
          >
            WeddingBook ✨
          </div>

          {/* 📅 CUSTOMER BADGE */}
          {role === 'ROLE_CUSTOMER' && bookingsCount > 0 && !loadingBookings && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              📅 {bookingsCount > 99 ? '99+' : bookingsCount}
            </div>
          )}
        </div>

        {/* ✅ AUTHENTICATED NAV */}
        {role && (
          <div className="flex items-center space-x-4">

            {/* CUSTOMER LINKS */}
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

            {/* VENDOR LINKS */}
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

            {/* 🚪 LOGOUT */}
            <button
              onClick={logout}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
            >
              🚪 Logout
            </button>
          </div>
        )}

        {/* ❌ GUEST NAV */}
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

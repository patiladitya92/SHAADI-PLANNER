import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState(localStorage.getItem('role'))

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass-card shadow-xl sticky top-0 z-50 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate('/')}
        >
          WeddingBook ✨
        </div>
        
        {role && (
          <>
            <div className="flex space-x-4">
              {role === 'CUSTOMER' && (
                <>
                  <button 
                    onClick={() => navigate('/customer/home')}
                    className={`px-4 py-2 rounded-xl font-medium ${isActive('/customer/home') ? 'bg-pink-100 text-pink-700' : 'text-gray-700 hover:text-pink-600'}`}
                  >
                    Home
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl font-medium ${isActive('/customer/bookings') ? 'bg-pink-100 text-pink-700' : 'text-gray-700 hover:text-pink-600'}`}
                  >
                    My Bookings
                  </button>
                </>
              )}
              {role === 'VENDOR' && (
                <>
                  <button 
                    onClick={() => navigate('/vendor/dashboard')}
                    className={`px-4 py-2 rounded-xl font-medium ${isActive('/vendor/dashboard') ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:text-purple-600'}`}
                  >
                    Dashboard
                  </button>
                  <button className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:text-purple-600">
                    My Listings
                  </button>
                </>
              )}
            </div>
            <button
              onClick={logout}
              className="wedding-btn px-6 py-2 text-sm font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
    
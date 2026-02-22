import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    console.log(' ProtectedRoute check:', {
      token: !!token,
      role,
      path: location.pathname
    })

    
    if (token && (role === 'ROLE_CUSTOMER' || role === 'ROLE_VENDOR' || role === 'ROLE_ADMIN')) {
      setIsAuthenticated(true)
    } else {
      localStorage.setItem('intendedPath', location.pathname)
      setIsAuthenticated(false)
    }
  }, [location.pathname])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-xl text-gray-600 animate-pulse">Checking authentication...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute

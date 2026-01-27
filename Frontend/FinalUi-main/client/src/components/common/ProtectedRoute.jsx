import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    console.log('🔍 ProtectedRoute check:', {
      token: !!token,
      role,
      path: location.pathname
    })

    if (
      token &&
      (role === 'ROLE_CUSTOMER' || role === 'ROLE_VENDOR')
    ) {
      setIsAuthenticated(true)
    } else {
      localStorage.setItem('intendedPath', location.pathname)
      setIsAuthenticated(false)
    }
  }, [location.pathname])

  // ⏳ while checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-xl text-gray-600">
          Checking authentication...
        </div>
      </div>
    )
  }

  // ❌ not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // ✅ logged in
  return <Outlet />
}

export default ProtectedRoute

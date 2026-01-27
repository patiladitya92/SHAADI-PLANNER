import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  // Check if user logged in (from localStorage)
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  // Not logged in → redirect to login
  if (!token || !role) {
    return <Navigate to="/login" replace />
  }
  
  // Logged in → show protected page
  return <Outlet />
}

export default ProtectedRoute

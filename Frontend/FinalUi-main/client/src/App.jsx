import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'

import VendorListings from './pages/vendor/VendorListings'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import CustomerHome from './pages/customer/CustomerHome'
import VendorDetail from './pages/customer/VendorDetail'
import CustomerMyBookings from './pages/customer/CustomerMyBookings'
import VendorBookings from './pages/vendor/VendorBookings'
import VendorDashboard from './pages/vendor/VendorDashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          {/* Customer Routes */}
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/vendor/:id" element={<VendorDetail />} />
          <Route path="/customer/mybookings" element={<CustomerMyBookings />} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/listings" element={<VendorListings />} />
          <Route path="/vendor/bookings" element={<VendorBookings />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

    </Router>
  )
}

export default App

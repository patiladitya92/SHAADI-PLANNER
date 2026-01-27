import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'

import VendorListings from './pages/vendor/VendorListings'
import Login from './pages/auth/Login'
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

        <Route element={<ProtectedRoute />}>
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/vendor/:id" element={<VendorDetail />} />
          <Route path="/customer/mybookings" element={<CustomerMyBookings />} />
          <Route path="/vendor/listings" element={<VendorListings />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/bookings" element={<VendorBookings />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App

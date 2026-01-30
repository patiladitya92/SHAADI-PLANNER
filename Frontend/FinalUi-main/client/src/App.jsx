import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'                    // ✅ FIXED: components/Navbar
import ProtectedRoute from './components/common/ProtectedRoute'    // ✅ FIXED: components/ProtectedRoute

// Auth Pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

// Public Landing
import LandingHome from './pages/home/LandingHome'

// Customer Pages
import CustomerHome from './pages/customer/CustomerHome'
import VendorDetail from './pages/customer/VendorDetail'
import CustomerMyBookings from './pages/customer/CustomerMyBookings'

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorListings from './pages/vendor/VendorListings'
import VendorBookings from './pages/vendor/VendorBookings'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar - Shows on ALL pages */}
        <Navbar />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              backdropFilter: 'blur(10px)',
            },
          }}
        />

        {/* ✅ FIXED ROUTES STRUCTURE */}
        <Routes>
          {/* PUBLIC LANDING (Guests see first) */}
          <Route path="/" element={<LandingHome />} />
          
          {/* PUBLIC AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            {/* Customer */}
            <Route path="/customer/home" element={<CustomerHome />} />
            <Route path="/customer/vendor/:id" element={<VendorDetail />} />
            <Route path="/customer/mybookings" element={<CustomerMyBookings />} />
            
            {/* Vendor */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/listings" element={<VendorListings />} />
            <Route path="/vendor/bookings" element={<VendorBookings />} />
            
            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
          
          {/* ✅ FIXED: 404 → Landing page (NOT login) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

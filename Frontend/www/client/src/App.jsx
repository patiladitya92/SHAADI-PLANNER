import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import Login from './pages/auth/Login'

// Placeholder dashboards (INLINE - no duplicate import)
const CustomerHome = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-20">
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-20 glass-card p-12 rounded-4xl max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Find Your Perfect Wedding Vendors ✨
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          5000+ verified vendors across 50+ cities
        </p>
        <div className="grid md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <input placeholder="City (Mumbai)" className="p-4 rounded-xl border" />
          <select className="p-4 rounded-xl border"><option>Category</option></select>
          <input placeholder="Budget" className="p-4 rounded-xl border" />
          <button className="wedding-btn p-4">Search</button>
        </div>
      </div>
    </div>
  </div>
)

const VendorDashboard = () => (
  <div className="min-h-screen p-20 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
    <div className="glass-card p-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Vendor Dashboard</h1>
      <p>Manage your listings & bookings</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navbar />
        <Toaster position="top-right" />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/customer/home" element={<CustomerHome />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

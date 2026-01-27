import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../utils/api'
import { toast } from 'react-hot-toast'

const VendorDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    listingsCount: 0,
    pendingBookings: 0,
    totalRevenue: 0
  })
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [profileRes, listingsRes, bookingsRes] = await Promise.all([
        apiClient.get('/auth/me'),
        apiClient.get('/vendors/me/listings'),
        apiClient.get('/bookings/vendor/me')
      ])

      const profileData = profileRes.data
      const listings = listingsRes.data || []
      const bookings = bookingsRes.data || []

      const pendingBookings = bookings.filter(b => b.status === 'PENDING').length
      const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.amt || 0), 0)

      setProfile(profileData)
      setStats({
        listingsCount: listings.length,
        pendingBookings,
        totalRevenue: totalRevenue.toLocaleString('en-IN')
      })
    } catch (error) {
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Welcome */}
        <div className="glass-card p-12 text-center rounded-4xl">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome back, {profile?.vendorBizname || 'Vendor'}! ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your wedding services and bookings from one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl text-center hover:shadow-2xl transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📝</div>
            <div className="text-3xl font-bold text-purple-600">{stats.listingsCount}</div>
            <div className="text-gray-600 font-semibold">Active Listings</div>
            <button
              onClick={() => navigate('/vendor/listings')}
              className="mt-4 wedding-btn px-6 py-2 text-sm"
            >
              Manage Listings
            </button>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center hover:shadow-2xl transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📋</div>
            <div className="text-3xl font-bold text-orange-600">{stats.pendingBookings}</div>
            <div className="text-gray-600 font-semibold">Pending Bookings</div>
            <button
              onClick={() => navigate('/vendor/bookings')}
              className="mt-4 wedding-btn px-6 py-2 text-sm bg-orange-500 hover:bg-orange-600"
            >
              View Bookings
            </button>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center hover:shadow-2xl transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
            <div className="text-3xl font-bold text-green-600">₹{stats.totalRevenue}</div>
            <div className="text-gray-600 font-semibold">Total Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/vendor/listings')}
              className="group p-8 rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">➕</div>
              <h3 className="font-bold text-xl mb-2">New Listing</h3>
              <p className="text-gray-600">Add a new service</p>
            </button>
            <button
              onClick={() => navigate('/vendor/bookings')}
              className="group p-8 rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="font-bold text-xl mb-2">Pending Bookings</h3>
              <p className="text-gray-600">{stats.pendingBookings} waiting</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard

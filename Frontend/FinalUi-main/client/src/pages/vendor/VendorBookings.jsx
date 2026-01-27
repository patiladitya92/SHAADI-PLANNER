import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const VendorBookings = () => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/bookings/vendor/me')
      setBookings(response.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (bookingId, status) => {
    try {
      setUpdatingId(bookingId)
      const response = await apiClient.put(`/bookings/${bookingId}/status`, { status })
      toast.success(response.data?.message || `Booking ${status.toLowerCase()}d`)
      await fetchBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Status update failed')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'pending') return booking.status === 'PENDING'
    if (activeTab === 'accepted') return booking.status === 'ACCEPTED'
    return true // all
  })

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      ACCEPTED: 'bg-green-100 text-green-800 border-green-300',
      REJECTED: 'bg-red-100 text-red-800 border-red-300',
      CANCELLED: 'bg-gray-100 text-gray-800 border-gray-300',
      PAID: 'bg-blue-100 text-blue-800 border-blue-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              My Bookings ({bookings.length})
            </h1>
            <p className="text-xl text-gray-600">
              Manage customer bookings for your services
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card p-1 rounded-2xl">
          <div className="flex bg-white rounded-xl overflow-hidden">
            {[
              { id: 'all', label: 'All', count: bookings.length },
              { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'PENDING').length },
              { id: 'accepted', label: 'Accepted', count: bookings.filter(b => b.status === 'ACCEPTED').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="space-y-4">
          {filteredBookings.length ? (
            filteredBookings.map(booking => (
              <div key={booking.id} className="glass-card p-6 rounded-3xl hover:shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{booking.listingTitle}</h3>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                        <span>Event: {new Date(booking.eventdate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span>₹{parseFloat(booking.amt).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                        <span>{booking.customerName}, {booking.customerCity}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Actions */}
                  {booking.status === 'PENDING' && (
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                        disabled={updatingId === booking.id}
                        className="px-6 py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 shadow-lg transition-all disabled:opacity-50"
                      >
                        {updatingId === booking.id ? '...' : '✅ Accept'}
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'REJECTED')}
                        disabled={updatingId === booking.id}
                        className="px-6 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 shadow-lg transition-all disabled:opacity-50"
                      >
                        {updatingId === booking.id ? '...' : '❌ Reject'}
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'CANCELLED')}
                        disabled={updatingId === booking.id}
                        className="px-6 py-3 bg-gray-500 text-white font-bold rounded-2xl hover:bg-gray-600 shadow-lg transition-all disabled:opacity-50"
                      >
                        {updatingId === booking.id ? '...' : '↩️ Cancel'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-16 text-center">
              <div className="text-6xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {activeTab === 'pending' ? 'No pending bookings' : 'No bookings yet'}
              </h3>
              <p className="text-gray-600 mb-8">
                {activeTab === 'pending'
                  ? 'Bookings will appear here when customers book your services'
                  : 'Create listings to start receiving bookings!'}
              </p>
              <button
                onClick={() => navigate('/vendor/listings')}
                className="wedding-btn px-8 py-4 text-lg"
              >
                Create Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VendorBookings

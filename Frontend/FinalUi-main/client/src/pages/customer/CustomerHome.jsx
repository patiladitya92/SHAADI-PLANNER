import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'
import PaymentModal from '../payment/PaymentModal'

const CustomerHome = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState({})
  const [searchParams, setSearchParams] = useState({
    city: '',
    categoryId: ''
  })
  // 💳 RAZORPAY STATES
  const [paymentModal, setPaymentModal] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const [razorpayOrderId, setRazorpayOrderId] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories')
      setCategories(response.data.data || response.data)
    } catch (error) {
      console.error('Categories error:', error)
      toast.error('Failed to load categories')
    }
  }

  const handleSearch = async () => {
    if (!searchParams.city || !searchParams.categoryId) {
      toast.error('Please fill city and category')
      return
    }

    try {
      setLoading(true)
      const response = await apiClient.get('/listings', {
        params: {
          city: searchParams.city,
          catId: parseInt(searchParams.categoryId)
        }
      })
      setVendors(response.data.data || response.data)
      toast.success(`${(response.data.data || response.data).length} vendors found!`)
    } catch (error) {
      toast.error('No vendors found')
      setVendors([])
    } finally {
      setLoading(false)
    }
  }

// ✅ REPLACE handleBookNow in CustomerHome.jsx
const handleBookNow = async (vendor) => {
  console.log('🚀 Book Now clicked for:', vendor.id, vendor.title) // DEBUG

  try {
    setBookingLoading(prev => ({ ...prev, [vendor.id]: true }))

    // 1. Create booking
    toast.loading('Creating your booking...', { id: 'booking' })
    const bookingRes = await apiClient.post('/bookings', {
      listingId: vendor.id,
      vendorId: vendor.user_id || vendor.userId,
      date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0], // Tomorrow
      guests: 100,
      notes: `Shaadi Planner booking - ${searchParams.city}`
    })

    const booking = bookingRes.data.data || bookingRes.data
    console.log('✅ Booking created:', booking.id)

    // 2. Show payment modal IMMEDIATELY (your backend handles Razorpay)
    setBookingData({
      bookingId: booking.id,
      amount: Number(vendor.price) || 5000,
      listingTitle: vendor.title,
      vendorName: vendor.bizname || vendor.vendorName || 'Premium Vendor',
      customerName: localStorage.getItem('userName') || 'Bride/Groom',
      customerEmail: localStorage.getItem('userEmail') || 'customer@example.com',
      customerPhone: '9876543210'
    })

    toast.success('Booking confirmed! Proceed to payment', { id: 'booking' })
    setPaymentModal(true) // ✅ THIS OPENS MODAL

  } catch (error) {
    console.error('❌ Booking error:', error.response?.data || error)
    toast.error(error.response?.data?.message || 'Booking failed - try again')
  } finally {
    setBookingLoading(prev => ({ ...prev, [vendor.id]: false }))
  }
}



  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return 'https://images.unsplash.com/photo-1519058082700-6d69b930b325?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    const match = photoUrl.match(/\[.*?\]\((https?:\/\/[^)]+)\)/)
    return match ? match[1] : photoUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-24">
      {/* 💳 RAZORPAY MODAL */}
      <PaymentModal
        isOpen={paymentModal}
        onClose={() => setPaymentModal(false)}
        bookingData={bookingData}
        razorpayOrderId={razorpayOrderId}
      />

      <div className="container mx-auto px-6 py-20">
        {/* Hero Search */}
        <div className="text-center mb-20 glass-card p-12 rounded-4xl max-w-4xl mx-auto shadow-3xl">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Find Perfect Wedding Vendors ✨
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            5,000+ verified professionals across India. Transparent pricing. Secure payments.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <input
              placeholder="Enter city (e.g. Pune, Mumbai)"
              value={searchParams.city}
              onChange={(e) =>
                setSearchParams({ ...searchParams, city: e.target.value })
              }
              className="p-5 rounded-3xl border-2 border-pink-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-200 transition-all bg-white/80 backdrop-blur-sm text-lg"
            />

            <select
              value={searchParams.categoryId}
              onChange={(e) =>
                setSearchParams({ ...searchParams, categoryId: e.target.value })
              }
              className="p-5 rounded-3xl border-2 border-purple-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white/80 backdrop-blur-sm text-lg"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="wedding-btn p-5 text-xl shadow-2xl hover:shadow-3xl h-[70px]"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block" />
                  Searching...
                </>
              ) : (
                '🔍 Find Vendors'
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {vendors.map((vendor) => {
              const imageUrl = getImageUrl(vendor.photo_url || vendor.photoUrl)
              return (
                <div
                  key={vendor.id}
                  className="glass-card p-8 rounded-3xl hover:shadow-3xl transition-all duration-300 group hover:-translate-y-2 border-2 border-white/50"
                >
                  {/* Image */}
                  <div className="relative mb-6">
                    <img
                      src={imageUrl}
                      alt={vendor.title}
                      className="h-64 w-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1519058082700-6d69b930b325?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg">
                      ✅ Verified
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {vendor.title}
                  </h3>
                  
                  <div className="flex items-center text-2xl font-black text-emerald-600 mb-4">
                    ₹{vendor.price?.toLocaleString()} 
                    <span className="text-lg text-gray-500 font-normal ml-2">per event</span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {vendor.description || `${vendor.title} - Premium service in ${searchParams.city}`}
                  </p>

                  {/* 💳 BOOK NOW BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()      // ✅ CRITICAL: Stop card click
                      e.preventDefault()
                      console.log('🔥 PAY NOW CLICKED')  // ✅ DEBUG
                      handleBookNow(vendor)
                    }}
                    disabled={bookingLoading[vendor.id]}
                    className="w-full wedding-btn py-5 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    {bookingLoading[vendor.id] ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>💳 Book Now</span>
                        <span className="text-sm">Secure Payment</span>
                      </>
                    )}
                  </button>


                  <p className="text-xs text-center text-gray-500 mt-4">
                    🔒 100% Secure • Instant Confirmation
                  </p>
                </div>
              )
            })}
          </div>
        ) : searchParams.city && (
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">No vendors found</h2>
            <p className="text-lg text-gray-500 mb-8">Try different city or category</p>
            <button
              onClick={handleSearch}
              className="wedding-btn px-12 py-4 text-lg"
            >
              🔄 Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerHome

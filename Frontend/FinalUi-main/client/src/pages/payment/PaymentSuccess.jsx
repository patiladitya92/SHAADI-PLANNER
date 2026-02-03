import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const searchParams = new URLSearchParams(location.search)
  const bookingId = searchParams.get('bookingId')
  const paymentId = searchParams.get('paymentId')

    useEffect(() => {
    const bookingId = searchParams.get('bookingId')
    if (!bookingId) {
    toast.error('Invalid payment link')
    navigate('/customer/home')
    }
    }, [])


  useEffect(() => {
    if (bookingId) {
      toast.success('🎉 Payment successful! Booking confirmed.')
    }
  }, [bookingId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-pink-50 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl flex flex-col items-center justify-center mx-auto mb-12 shadow-2xl">
          <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-8">
          Payment Successful!
        </h1>
        
        <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Your booking has been confirmed. Vendor will contact you within 24 hours.
        </p>
        
        <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Transaction Details</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <span className="text-sm text-gray-500">Booking ID:</span>
              <p className="font-bold text-xl text-emerald-600">{bookingId || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Payment ID:</span>
              <p className="font-bold text-xl text-purple-600">{paymentId || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/customer/mybookings')}
            className="wedding-btn px-12 py-4 text-lg"
          >
            📋 View Bookings
          </button>
          <button
            onClick={() => navigate('/customer/home')}
            className="px-12 py-4 border-2 border-emerald-500 text-emerald-600 font-bold rounded-2xl bg-white hover:bg-emerald-50 shadow-lg transition-all"
          >
            🏠 Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const PaymentModal = ({ isOpen, onClose, bookingData }) => {
  const [loading, setLoading] = useState(false)
  const [razorpayOrderId, setRazorpayOrderId] = useState('')

  // ✅ Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      console.log('🚀 Creating payment for booking:', bookingData.bookingId)
      
      // ✅ Call YOUR backend endpoint with PaymentCreateDto
      const response = await apiClient.post(`/api/payments/booking/${bookingData.bookingId}`, {
        amount: bookingData.amount * 100, // Backend expects paise
        currency: 'INR'
      })

      console.log('✅ Backend response:', response.data)
      
      // ✅ Extract order ID from your PaymentRes structure
      const orderId = response.data.razorpayOrderId || response.data.orderId || response.data.id
      setRazorpayOrderId(orderId)

      // ✅ Open Razorpay (SIMPLEST method)
      const options = {
        key: 'rzp_test_1DPaCW8JWcXvBG', // Replace with YOUR key
        amount: bookingData.amount * 100,
        currency: 'INR',
        name: 'Shaadi Planner',
        description: `Booking: ${bookingData.listingTitle}`,
        order_id: orderId,
        handler: function(response) {
          toast.success('✅ Payment Success!')
          window.location.href = `/payment-success?bookingId=${bookingData.bookingId}&paymentId=${response.razorpay_payment_id}`
        },
        prefill: {
          name: bookingData.customerName,
          email: bookingData.customerEmail || '',
          contact: bookingData.customerPhone || '9999999999'
        },
        theme: { color: '#EC4899' }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      
    } catch (error) {
      console.error('❌ Payment error:', error.response?.data || error)
      toast.error(error.response?.data?.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !bookingData) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl shadow-3xl bg-white/90">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-pink-900 bg-clip-text text-transparent">
            Secure Payment
          </h2>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700">Service:</span>
            <span className="font-bold">{bookingData.listingTitle}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700">Vendor:</span>
            <span className="font-bold text-purple-700">{bookingData.vendorName}</span>
          </div>
          <div className="flex justify-between text-2xl font-black text-emerald-600 pt-2 border-t border-emerald-200">
            <span>Total:</span>
            <span>₹{bookingData.amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="wedding-btn py-4 text-xl font-bold shadow-2xl hover:shadow-3xl disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>💳</span>
                <span>Pay Now Securely</span>
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={loading}
            className="py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-6">
          🔒 100% Secure | Powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default PaymentModal

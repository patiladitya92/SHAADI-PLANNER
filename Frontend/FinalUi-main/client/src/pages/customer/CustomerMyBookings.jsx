import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const CustomerMyBookings = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await apiClient.get('/bookings/me')
      setBookings(res.data)
    } catch {
      toast.error('Failed to load bookings')
    }
  }

  const handlePayment = (booking) => {
    toast.success(`Payment of ₹${booking.amt} successful (mock)`)
    // 🔴 Real payment integration can come later
  }

  return (
    <div className="pt-24 p-10">
      <h1 className="text-4xl font-bold mb-6">My Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id} className="border p-4 mb-4 rounded">
          <h3 className="text-xl font-bold">{b.listingTitle}</h3>
          <p>Status: {b.status}</p>
          <p>Amount: ₹{b.amt}</p>

          {b.status === 'PENDING' && (
            <p className="text-yellow-600 font-semibold">
              Waiting for vendor approval
            </p>
          )}

          {b.status === 'ACCEPTED' && (
            <button
              onClick={() => handlePayment(b)}
              className="wedding-btn mt-2"
            >
              💳 Pay Now
            </button>
          )}

          {b.status === 'PAID' && (
            <p className="text-green-600 font-semibold">
              ✅ Payment completed
            </p>
          )}

          {b.status === 'REJECTED' && (
            <p className="text-red-600 font-semibold">
              ❌ Booking rejected by vendor
            </p>
          )}
        </div>
      ))}

      {bookings.length === 0 && (
        <button
          onClick={() => navigate('/customer/home')}
          className="wedding-btn"
        >
          Book Vendors
        </button>
      )}
    </div>
  )
}

export default CustomerMyBookings

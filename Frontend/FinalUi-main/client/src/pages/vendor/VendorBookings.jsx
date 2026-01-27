import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const VendorBookings = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const res = await apiClient.get('/bookings/vendor/me')
    setBookings(res.data)
  }

  const updateStatus = async (id, status) => {
    try {
      await apiClient.put(`/bookings/${id}/status`, { status })
      toast.success(`Booking ${status}`)
      fetchBookings()
    } catch {
      toast.error('Status update failed')
    }
  }

  return (
    <div className="pt-24 p-10">
      <h1 className="text-4xl font-bold mb-6">Vendor Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id} className="border p-4 mb-4 rounded">
          <h3 className="text-xl font-bold">{b.listingTitle}</h3>
          <p>Customer: {b.customerName}</p>
          <p>Status: {b.status}</p>

          {b.status === 'PENDING' && (
            <>
              <button
                onClick={() => updateStatus(b.id, 'ACCEPTED')}
                className="mr-2"
              >
                ✅ Accept
              </button>

              <button
                onClick={() => updateStatus(b.id, 'REJECTED')}
              >
                ❌ Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default VendorBookings

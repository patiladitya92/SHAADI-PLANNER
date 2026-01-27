import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const VendorDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [bookingEventDate, setBookingEventDate] = useState('')

  useEffect(() => {
    fetchListing()
  }, [id])

  const fetchListing = async () => {
    try {
      const res = await apiClient.get(`/listings/${id}`)
      setListing(res.data)
    } catch {
      toast.error('Failed to load vendor')
    }
  }

  const handleBookNow = async () => {
    if (!bookingEventDate) {
      toast.error('Select event date')
      return
    }

    try {
      await apiClient.post('/bookings', {
        listingId: parseInt(id),
        eventdate: bookingEventDate
      })

      toast.success('Booking request sent! Waiting for vendor approval.')
      navigate('/customer/mybookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    }
  }

  if (!listing) return <div className="pt-24">Loading...</div>

  return (
    <div className="pt-24 p-10">
      <h1 className="text-4xl font-bold">{listing.title}</h1>
      <p className="text-green-600 text-2xl">₹{listing.price}</p>

      <input
        type="date"
        value={bookingEventDate}
        onChange={(e) => setBookingEventDate(e.target.value)}
        className="border p-3 mt-4"
      />

      <button onClick={handleBookNow} className="wedding-btn mt-4">
        Book Now
      </button>
    </div>
  )
}

export default VendorDetail

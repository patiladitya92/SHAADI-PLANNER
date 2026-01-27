import { useEffect, useState } from 'react'
import apiClient from '../../utils/api'

const VendorDashboard = () => {
  const [bookingsCount, setBookingsCount] = useState(0)

  useEffect(() => {
    fetchBookingsCount()
  }, [])

  const fetchBookingsCount = async () => {
    try {
      const response = await apiClient.get('/bookings/vendor/me')
      setBookingsCount(response.data.length || 0)
    } catch (error) {
      console.error('Vendor bookings error:', error)
    }
  }

  return (
    <div className="min-h-screen pt-24 p-12">
      <h1 className="text-4xl font-bold mb-6">Vendor Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-bold">{bookingsCount}</h2>
          <p>Bookings</p>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard

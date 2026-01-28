import { useState, useEffect } from 'react'
import { useAdminData } from '../../hooks/useAdminData'
import AdminList from '../../components/admin/AdminList'

const AdminDashboard = () => {
  const { fetchUsers, fetchVendors, fetchCustomers, fetchBookings, loading } = useAdminData()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalBookings: 0
  })
  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    const [users, vendors, customers, bookings] = await Promise.all([
      fetchUsers(),
      fetchVendors(),
      fetchCustomers(),
      fetchBookings()
    ])

    const recent = bookings.slice(0, 5).reverse()

    setStats({
      totalUsers: users.length,
      totalVendors: vendors.length,
      totalCustomers: customers.length,
      totalBookings: bookings.length
    })
    setRecentBookings(recent)
  }

  const recentColumns = [
    { label: 'Customer', key: 'customerName', render: item => item.customerName || '-' },
    { label: 'Service', key: 'listingTitle', render: item => item.listingTitle || '-' },
    { label: 'Vendor', key: 'vendorBizname', render: item => item.vendorBizname || '-' },
    { label: 'Amount', key: 'amt', render: item => `₹${parseFloat(item.amt || 0).toLocaleString()}` },
    { label: 'Status', key: 'status', render: item => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
        item.status === 'PAID' ? 'bg-green-100 text-green-800' :
        item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {item.status?.toLowerCase()}
      </span>
    )},
    { label: 'Event', key: 'eventdate', render: item => new Date(item.eventdate).toLocaleDateString('en-IN') }
  ]

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="glass-card p-12 text-center rounded-4xl shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete platform oversight. Manage users, monitor bookings, and maintain quality.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="glass-card p-8 rounded-3xl text-center group hover:shadow-2xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
            <div className="text-4xl font-bold text-indigo-600">{stats.totalUsers}</div>
            <div className="text-gray-600 font-semibold">Total Users</div>
          </div>
          <div className="glass-card p-8 rounded-3xl text-center group hover:shadow-2xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
            <div className="text-4xl font-bold text-purple-600">{stats.totalVendors}</div>
            <div className="text-gray-600 font-semibold">Vendors</div>
          </div>
          <div className="glass-card p-8 rounded-3xl text-center group hover:shadow-2xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👰‍♀️</div>
            <div className="text-4xl font-bold text-emerald-600">{stats.totalCustomers}</div>
            <div className="text-gray-600 font-semibold">Customers</div>
          </div>
          <div className="glass-card p-8 rounded-3xl text-center group hover:shadow-2xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📋</div>
            <div className="text-4xl font-bold text-orange-600">{stats.totalBookings}</div>
            <div className="text-gray-600 font-semibold">Bookings</div>
          </div>
        </div>

        {/* Recent Activity */}
        <AdminList
          title="Recent Bookings"
          data={recentBookings}
          columns={recentColumns}
          loading={loading}
          emptyMessage="No recent bookings"
        />
      </div>
    </div>
  )
}

export default AdminDashboard

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminData } from '../../hooks/useAdminData'
import AdminList from '../../components/admin/AdminList'
import { toast } from 'react-hot-toast'

const AdminUsers = () => {
  const navigate = useNavigate()
  const { fetchUsers, toggleUserActive, loading } = useAdminData()
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const data = await fetchUsers()
    setUsers(data)
  }

  const handleToggleActive = async (user) => {
    if (window.confirm(`Toggle ${user.name} (${user.email}) ${user.deleted ? 'active' : 'inactive'}?`)) {
      try {
        await toggleUserActive(user.id)
        await loadUsers() // Refresh
      } catch (error) {
        // Error handled in hook
      }
    }
  }

  const userColumns = [
    { 
      label: 'Name', 
      key: 'name',
      render: item => (
        <div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    { 
      label: 'Role', 
      render: item => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          item.role === 'ROLE_ADMIN' ? 'bg-indigo-100 text-indigo-800' :
          item.role === 'ROLE_VENDOR' ? 'bg-purple-100 text-purple-800' :
          'bg-emerald-100 text-emerald-800'
        }`}>
          {item.role.replace('ROLE_', '')}
        </span>
      )
    },
    { 
      label: 'Phone', 
      key: 'phone' 
    },
    { 
      label: 'Status', 
      render: item => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
          item.deleted 
            ? 'bg-red-100 text-red-800 border-red-300' 
            : 'bg-green-100 text-green-800 border-green-300'
        }`}>
          {item.deleted ? 'Inactive' : 'Active'}
        </span>
      )
    },
    { 
      label: 'Created', 
      render: item => new Date(item.createdAt).toLocaleDateString('en-IN')
    }
  ]

  const userActions = {
    render: (user) => (
      <button
        onClick={() => handleToggleActive(user)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          user.deleted
            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
            : 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
        }`}
      >
        {user.deleted ? 'Activate' : 'Deactivate'}
      </button>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-indigo-700 bg-clip-text text-transparent">
            User Management
          </h1>
        </div>

        <AdminList
          title="All Platform Users"
          data={users}
          columns={userColumns}
          actions={userActions}
          loading={loading}
          emptyMessage="No users found"
        />
      </div>
    </div>
  )
}

export default AdminUsers

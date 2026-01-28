import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import apiClient from '../utils/api'

export const useAdminData = () => {
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/admin/users')
      return response.data || []
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load users')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/admin/vendors')
      return response.data || []
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load vendors')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/admin/customers')
      return response.data || []
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load customers')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/admin/bookings')
      return response.data || []
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load bookings')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleUserActive = async (userId) => {
    try {
      setLoading(true)
      const response = await apiClient.put(`/admin/users/${userId}/toggle-active`)
      toast.success(response.data?.message || 'User status updated')
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    fetchUsers,
    fetchVendors,
    fetchCustomers,
    fetchBookings,
    toggleUserActive
  }
}

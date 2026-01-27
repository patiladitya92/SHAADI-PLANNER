import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import apiClient from '../utils/api'

export const useVendorListings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/vendors/me/listings')
      setListings(response.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load listings')
      setListings([])
    } finally {
      setLoading(false)
    }
  }, [])

  const createListing = async (data) => {
    try {
      setLoadingAction(true)
      const response = await apiClient.post('/vendors/me/listings', data)
      toast.success('Listing created successfully!')
      await fetchListings() // Refresh
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create listing')
      throw error
    } finally {
      setLoadingAction(false)
    }
  }

  const updateListing = async (id, data) => {
    try {
      setLoadingAction(true)
      const response = await apiClient.put(`/vendors/me/listings/${id}`, data)
      toast.success('Listing updated successfully!')
      await fetchListings()
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update listing')
      throw error
    } finally {
      setLoadingAction(false)
    }
  }

  const deleteListing = async (id) => {
    try {
      setLoadingAction(true)
      const response = await apiClient.delete(`/vendors/me/listings/${id}`)
      toast.success('Listing deleted successfully!')
      await fetchListings()
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete listing')
      throw error
    } finally {
      setLoadingAction(false)
    }
  }

  return {
    listings,
    loading,
    loadingAction,
    fetchListings,
    createListing,
    updateListing,
    deleteListing
  }
}

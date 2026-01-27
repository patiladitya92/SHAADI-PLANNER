import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVendorListings } from '../../hooks/useVendorListings'
import ListingForm from '../../components/vendor/ListingForm'
import ListingTable from '../../components/vendor/ListingTable'
import { toast } from 'react-hot-toast'

const VendorListings = () => {
  const navigate = useNavigate()
  const { listings, loading, loadingAction, fetchListings, createListing, updateListing, deleteListing } = useVendorListings()
  const [showForm, setShowForm] = useState(false)
  const [editingListing, setEditingListing] = useState(null)

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const handleEdit = (listing) => {
    setEditingListing(listing)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this listing? This cannot be undone.')) {
      await deleteListing(id)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingListing(null)
    toast.success('Listing saved!')
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              My Service Listings
            </h1>
            <p className="text-xl text-gray-600">
              Manage your wedding services ({listings.length} active)
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="wedding-btn px-8 py-4 text-lg font-bold self-start md:self-auto shadow-2xl hover:shadow-3xl"
          >
            + New Service Listing
          </button>
        </div>

        {/* Table */}
        <ListingTable
          listings={listings}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Form Modal */}
        <ListingForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false)
            setEditingListing(null)
          }}
          editingListing={editingListing}
          onSuccess={handleFormSuccess}
          createListing={createListing}
          updateListing={updateListing}
        />
      </div>
    </div>
  )
}

export default VendorListings

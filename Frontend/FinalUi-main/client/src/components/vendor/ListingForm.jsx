import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const ListingForm = ({ isOpen, onClose, editingListing = null, onSuccess, createListing, updateListing }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    photoUrl: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingListing) {
      setFormData({
        title: editingListing.title || '',
        description: editingListing.description || '',
        price: editingListing.price || '',
        photoUrl: editingListing.photoUrl || ''
      })
    } else {
      setFormData({ title: '', description: '', price: '', photoUrl: '' })
    }
  }, [editingListing, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Title and valid price required')
      return
    }

    try {
      setLoading(true)
      if (editingListing) {
        await updateListing(editingListing.id, formData)
      } else {
        await createListing(formData)
      }
      onSuccess()
      onClose()
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {editingListing ? 'Edit Listing' : 'Create New Service'}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Service Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder="e.g. Premium Wedding Photography Package"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all resize-vertical"
              placeholder="Describe your service, what's included, experience..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all"
                placeholder="50000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Photo URL (optional)
              </label>
              <input
                type="url"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="wedding-btn flex-1 py-4 text-lg font-bold disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingListing ? 'Update Listing' : 'Create Listing'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListingForm

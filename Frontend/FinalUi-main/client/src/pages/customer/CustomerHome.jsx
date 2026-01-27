import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import apiClient from '../../utils/api'

const CustomerHome = () => {
  const [categories, setCategories] = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    city: '',
    categoryId: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Categories error:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchParams.city || !searchParams.categoryId) {
      toast.error('Please fill city and category')
      return
    }

    try {
      setLoading(true)
      const response = await apiClient.get('/listings', {
        params: {
          city: searchParams.city,
          catId: parseInt(searchParams.categoryId)
        }
      })
      setVendors(response.data)
      toast.success(`${response.data.length} vendors found!`)
    } catch (error) {
      toast.error('No vendors found')
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return null
    const match = photoUrl.match(/\[.*?\]\((https?:\/\/[^)]+)\)/)
    return match ? match[1] : photoUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-24">
      <div className="container mx-auto px-6 py-20">

        <div className="text-center mb-20 glass-card p-12 rounded-4xl max-w-4xl mx-auto shadow-2xl">
          <h1 className="text-6xl font-bold mb-6">
            Find Perfect Wedding Vendors ✨
          </h1>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <input
              placeholder="Pune"
              value={searchParams.city}
              onChange={(e) =>
                setSearchParams({ ...searchParams, city: e.target.value })
              }
              className="p-5 rounded-2xl border-2"
            />

            <select
              value={searchParams.categoryId}
              onChange={(e) =>
                setSearchParams({ ...searchParams, categoryId: e.target.value })
              }
              className="p-5 rounded-2xl border-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="wedding-btn p-5"
            >
              {loading ? 'Searching...' : 'Search Vendors'}
            </button>
          </div>
        </div>

        {vendors.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {vendors.map((vendor) => {
              const imageUrl = getImageUrl(vendor.photo_url)
              return (
                <div
                  key={vendor.id}
                  className="glass-card p-8 rounded-3xl cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/customer/vendor/${vendor.id}`)
                  }
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={vendor.title}
                      className="h-48 w-full object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-bold">{vendor.title}</h3>
                  <p className="text-green-600 font-bold">
                    ₹{vendor.price}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerHome

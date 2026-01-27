const ListingTable = ({ listings, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600">Loading your listings...</p>
      </div>
    )
  }

  if (!listings?.length) {
    return (
      <div className="glass-card p-16 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No listings yet</h3>
        <p className="text-gray-600 mb-6">Create your first service to start receiving bookings!</p>
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-800">Service</th>
              <th className="p-4 text-left font-semibold text-gray-800">Price</th>
              <th className="p-4 text-left font-semibold text-gray-800 hidden md:table-cell">Description</th>
              <th className="p-4 text-left font-semibold text-gray-800 hidden lg:table-cell">Created</th>
              <th className="p-4 text-right font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                <td className="p-4 font-semibold text-lg">{listing.title}</td>
                <td className="p-4">
                  <span className="text-2xl font-bold text-green-600">₹{parseFloat(listing.price).toLocaleString()}</span>
                </td>
                <td className="p-4 max-w-md hidden md:table-cell">
                  <p className="text-gray-600 line-clamp-2">{listing.description}</p>
                </td>
                <td className="p-4 hidden lg:table-cell text-sm text-gray-500">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(listing)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(listing.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListingTable

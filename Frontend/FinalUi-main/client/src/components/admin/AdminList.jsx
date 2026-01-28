import { useState } from 'react'

const AdminList = ({ 
  data = [], 
  title, 
  columns, 
  actions = null,
  loading,
  emptyMessage = 'No data found',
  onAction 
}) => {
  const [search, setSearch] = useState('')

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600">Loading {title.toLowerCase()}...</p>
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden rounded-3xl">
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {title} ({filteredData.length})
          </h2>
          {search === '' && (
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 text-left font-semibold text-gray-800 text-sm uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && <th className="p-4 text-right font-semibold text-gray-800 w-32">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, idx) => (
              <tr key={item.id || idx} className="hover:bg-indigo-50 transition-colors">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="p-4">
                    {col.render ? col.render(item) : item[col.key] || '-'}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 text-right">
                    {actions.render(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="p-16 text-center">
          <div className="text-6xl mb-6 opacity-40">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{emptyMessage}</h3>
          <p className="text-gray-600">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

export default AdminList

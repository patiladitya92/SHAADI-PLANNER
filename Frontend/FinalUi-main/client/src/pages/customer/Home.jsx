const CustomerHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navbar will be added in App.jsx */}
      
      <div className="container mx-auto px-6 py-20">
        {/* Hero Search */}
        <div className="text-center mb-20 glass-card p-12 rounded-4xl max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Find Your Perfect Wedding Vendors
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            5000+ verified vendors across 50+ cities. 
            Photographers, venues, makeup artists, decorators & more.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <input 
              placeholder="City (e.g. Mumbai)" 
              className="p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-pink-100"
            />
            <select className="p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-purple-100">
              <option>Category</option>
              <option>Venue</option>
              <option>Photographer</option>
              <option>Makeup Artist</option>
            </select>
            <input 
              placeholder="Budget (₹50k - ₹5L)" 
              className="p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-pink-100"
            />
            <button className="wedding-btn p-4 text-lg font-bold">
              Search Vendors
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
          <div>
            <div className="text-4xl font-bold text-pink-600">5K+</div>
            <div className="text-gray-600">Vendors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600">10K+</div>
            <div className="text-gray-600">Bookings</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-rose-600">4.9⭐</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="grid md:grid-cols-4 gap-6">
          {['Venue', 'Photographer', 'Makeup', 'Decorator'].map((category) => (
            <div key={category} className="glass-card p-8 rounded-3xl hover:scale-105 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-all">
                <span className="text-white font-bold text-lg">{category[0]}</span>
              </div>
              <h3 className="font-bold text-xl mb-2">{category}</h3>
              <p className="text-gray-600 text-sm">1000+ verified experts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerHome

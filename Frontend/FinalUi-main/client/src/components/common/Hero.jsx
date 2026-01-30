import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-24">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Shaadi Planner - Luxury Indian Wedding"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-6 px-4 fade-in-up">
        {/* Badge */}
        <div className="inline-block mb-8 p-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
          <span className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white text-lg font-bold shadow-lg">
            ⭐ #1 Wedding Planner in India
          </span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight bg-gradient-to-r from-gray-900 via-rose-900 to-pink-900 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
          Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 drop-shadow-2xl">Shaadi</span>
          <br />
          <span className="text-5xl md:text-6xl lg:text-7xl">Starts Here</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
          10,000+ Happy Couples | 5,000+ Verified Vendors | 50+ Cities Across India
        </p>
        
        {/* ✅ FIXED: Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link
            to="/signup"  // ✅ FIXED: Direct to signup
            className="wedding-btn px-16 py-7 text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >
            ✨ Start Planning Free
          </Link>
          <Link
            to="/signup"  // ✅ FIXED: Direct to signup (vendor)
            className="px-16 py-7 border-4 border-white/60 rounded-2xl font-bold text-xl bg-white/30 backdrop-blur-xl hover:bg-white/50 hover:border-white/80 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            💼 Become Vendor
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20 opacity-0 data-aos-fade-up">
          <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-black text-rose-500 mb-2">10K+</div>
            <div className="text-lg font-semibold text-gray-700">Weddings Planned</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-black text-pink-500 mb-2">5K+</div>
            <div className="text-lg font-semibold text-gray-700">Verified Vendors</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-black text-purple-500 mb-2">50+</div>
            <div className="text-lg font-semibold text-gray-700">Cities Covered</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-black text-emerald-500 mb-2">4.9⭐</div>
            <div className="text-lg font-semibold text-gray-700">Average Rating</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce mx-auto" title="Scroll down">
          <svg className="w-10 h-10 text-white/80 mx-auto drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero

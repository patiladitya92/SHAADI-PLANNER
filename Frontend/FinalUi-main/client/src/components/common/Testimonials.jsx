const Testimonials = () => {
  const reviews = [
    {
      name: "Priya & Rahul",
      text: "Booked our entire wedding through Shaadi Planner. Saved ₹2 lakhs and had the most beautiful wedding! 10/10 recommend.",
      rating: 5,
      city: "Mumbai"
    },
    {
      name: "Aishwarya Events",
      text: "Got 25+ bookings in first month. Transparent platform with genuine customers. Best decision for our business!",
      rating: 5,
      city: "Bangalore"
    },
    {
      name: "Neha & Vikram",
      text: "Perfect makeup artist & photographer. Everything went smoothly. Highly professional platform.",
      rating: 5,
      city: "Delhi"
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="section-title">Loved by Thousands of Couples</h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="glass-card p-10 text-center group hover:shadow-3xl transition-all duration-500 fade-in-up" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed italic">"{review.text}"</p>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{review.name}</h4>
                <p className="text-gray-500">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

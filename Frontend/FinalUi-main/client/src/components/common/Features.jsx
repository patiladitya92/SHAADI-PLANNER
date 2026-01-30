const Features = () => (
  <section className="py-32 bg-gradient-to-b from-white to-pink-50/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="section-title">Everything You Need for Your Dream Wedding</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
          One platform. Verified vendors. Transparent pricing. Perfect planning.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {/* Feature 1 */}
        <div className="group text-center fade-in-up" data-aos="fade-up">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors">Verified Vendors</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            5,000+ handpicked professionals across 50+ cities. Background checked & reviewed.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="group text-center fade-in-up" data-aos="fade-up" data-aos-delay="100">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-purple-600 transition-colors">Transparent Pricing</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            No hidden fees. See exact prices upfront. Secure payments with 100% refund guarantee.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="group text-center fade-in-up" data-aos="fade-up" data-aos-delay="200">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-emerald-600 transition-colors">End-to-End Planning</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Budget tracker, guest list, timeline, vendor coordination. We've got it all covered.
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default Features

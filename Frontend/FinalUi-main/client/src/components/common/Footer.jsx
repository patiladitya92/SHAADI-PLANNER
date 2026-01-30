const Footer = () => (
  <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-6">
            Shaadi Planner
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            India's #1 wedding planning platform connecting 10,000+ couples with verified vendors across 50+ cities.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">For Couples</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Find Vendors</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Wedding Checklist</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Budget Planner</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Guest Manager</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">For Vendors</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/signup" className="hover:text-white transition-colors">Join Platform</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Manage Bookings</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing Tools</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Marketing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Company</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-12 text-center text-gray-400 text-sm">
        <p>&copy; 2026 Shaadi Planner. All rights reserved. Made with ❤️ for Indian weddings.</p>
      </div>
    </div>
  </footer>
)

export default Footer


const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-padding py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-base sm:text-xl font-display text-neutral-800">classcorner</span>
            </div>
            <p className="text-neutral-600 text-sm">
              Connect with Local Craft Classes
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Browse Classes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Teachers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Teach</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-primary transition-colors">Start Teaching</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © 2024 ClassCorner. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Pinterest
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

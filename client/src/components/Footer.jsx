import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="mt-auto text-white bg-secondary">
      <div className="container px-4 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 py-12 md:grid-cols-4 gap-x-8 gap-y-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl">LUXE JEWELS</h4>
            <p className="text-gray-300">
              Crafting timeless elegance since 1990
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 transition-colors hover:text-primary">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-primary">
                <FaInstagram size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-primary">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 transition-colors hover:text-primary">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 transition-colors hover:text-primary">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 transition-colors hover:text-primary">Contact</Link>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-300 transition-colors hover:text-primary">Shipping</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 transition-colors hover:text-primary">Returns</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 transition-colors hover:text-primary">Size Guide</Link>
              </li>
              <li>
                <Link to="/care" className="text-gray-300 transition-colors hover:text-primary">Care</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt className="text-primary" />
                <span>1234 Luxury Lane<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaPhone className="text-primary" />
                <span>(800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaEnvelope className="text-primary" />
                <span>contact@luxejewels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 text-sm text-center text-gray-300 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} LUXE JEWELS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
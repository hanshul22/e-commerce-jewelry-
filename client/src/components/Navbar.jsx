import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaShoppingBag,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaQrcode
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import CartModal from './CartModal';
import BarcodeScanner from './BarcodeScanner';
import toast from 'react-hot-toast';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const location = useLocation();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const { itemCount } = useCart();
  const { searchQuery, handleSearch } = useSearch();

  // Check if current route is an auth route
  const isAuthRoute = location.pathname === '/auth';

  // Don't render navbar on auth routes
  if (isAuthRoute) return null;

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
    setIsCartOpen(false);
    setIsScannerOpen(false);
  }, [location]);

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value.trim();
    if (query) {
      handleSearch(query);
      setSearchOpen(false);
    }
  };

  const handleScan = (result) => {
    // Handle the scanned code result
    // You can implement custom logic based on the code format
    toast.success(`Code scanned: ${result}`);
    
    // Example: If the code contains a product ID, navigate to that product
    if (result.startsWith('product:')) {
      const productId = result.split(':')[1];
      window.location.href = `/product/${productId}`;
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="font-serif bold-900 text-2xl tracking-wider text-secondary hover:text-primary transition-all duration-300"
            >
              LUXE JEWELS
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex space-x-8 transition-all duration-300 ${
              searchOpen ? 'opacity-0' : 'opacity-100'
            }`}>
              {['Shop', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`relative group text-secondary hover:text-primary font-medium tracking-wide transition-all duration-300`}
                >
                  <span className="relative z-10">{item}</span>
                  {/* Hover effect line */}
                  <span 
                    className={`absolute inset-x-0 bottom-0 h-0.5 transform origin-left transition-transform duration-300 ${
                      isActive(`/${item.toLowerCase()}`)
                        ? 'scale-x-100 bg-primary'
                        : 'scale-x-0 group-hover:scale-x-100 bg-primary'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Search Overlay */}
            <div
              ref={searchContainerRef}
              className={`absolute inset-x-0 top-0 h-20 transition-all duration-500 transform ${
                searchOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-full opacity-0'
              } bg-white/90 backdrop-blur-lg`}
            >
              <div className="container mx-auto px-6 h-full flex items-center">
                <form 
                  onSubmit={handleSearchSubmit}
                  className="relative flex-1 max-w-3xl mx-auto"
                >
                  <FaSearch 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    defaultValue={searchQuery}
                    placeholder="Search for jewelry..."
                    className="w-full pl-12 pr-12 py-3 rounded-full border-0 bg-white/80 text-secondary placeholder-gray-400 focus:ring-2 focus:ring-primary/50 backdrop-blur-lg transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-black/5 transition-all duration-300"
                aria-label="Search"
              >
                <FaSearch className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsScannerOpen(true)}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-black/5 transition-all duration-300"
                aria-label="Scan QR Code"
              >
                <FaQrcode className="h-5 w-5" />
              </button>

              <Link 
                to="/account"
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-black/5 transition-all duration-300"
                aria-label="Account"
              >
                <FaUser className="h-5 w-5" />
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-black/5 transition-all duration-300 relative"
                aria-label="Cart"
              >
                <FaShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center rounded-full animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 rounded-full text-secondary hover:text-primary hover:bg-black/5 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-1 border-t border-gray-200">
              {['Shop', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(`/${item.toLowerCase()}`)
                      ? 'bg-primary/10 text-primary'
                      : 'text-secondary hover:bg-black/5 hover:text-primary'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BarcodeScanner 
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScan}
      />
    </>
  );
}

export default Navbar;
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaEye, FaShoppingBag } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FeaturedProductsCarousel({ products }) {
  const sliderRef = useRef(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleQuickView = (e, productId) => {
    e.preventDefault();
    // Implement quick view modal logic here
  };

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    // Implement add to cart logic here
  };

  return (
    <div className="relative px-12">
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <FaChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <FaChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-4 py-8">
            <Link
              to={`/product/${product.id}`}
              className="block group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with actions */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button
                    onClick={(e) => handleQuickView(e, product.id)}
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white transform hover:scale-110 transition-all duration-300"
                  >
                    <FaEye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white transform hover:scale-110 transition-all duration-300"
                  >
                    <FaShoppingBag className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center">
                <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  ${product.price.toLocaleString()}
                </p>
                
                {/* Animated line */}
                <div className="relative mt-2">
                  <div className="h-0.5 w-0 bg-primary absolute left-1/2 transform -translate-x-1/2 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeaturedProductsCarousel;
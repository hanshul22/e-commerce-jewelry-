import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';
import ReviewsSection from '../components/ReviewsSection';
import BrandStory from '../components/BrandStory';
import ServiceHighlights from '../components/ServiceHighlights';
import InstagramFeed from '../components/InstagramFeed';
import { categories, products } from '../data/products';

function Home() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Image Slider */}
      <section className="w-full h-screen">
        <HeroSlider />
      </section>

      {/* Content Sections */}
      <div className="relative bg-white z-10">
        {/* Service Highlights */}
        <ServiceHighlights />

        {/* Featured Categories */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="font-serif text-5xl md:text-6xl mb-6">Collections</h2>
              <p className="text-gray-400 text-lg">Explore our carefully curated categories</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className="group relative overflow-hidden rounded-xl animate-on-scroll opacity-0"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: 'translateY(20px)'
                  }}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-3xl mb-4">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      Discover our exclusive collection of {category.name.toLowerCase()}
                    </p>
                    <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
                      <span>Explore</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <BrandStory />

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Featured Pieces</h2>
              <p className="text-gray-600">Discover our most coveted creations</p>
            </div>
            <div className="animate-on-scroll opacity-0">
              <FeaturedProductsCarousel products={products} />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-secondary via-secondary/90 to-secondary relative overflow-hidden">
          <div className="absolute inset-0 shimmer pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-4xl relative">
            <div className="text-center space-y-6 animate-on-scroll opacity-0">
              <h3 className="font-serif text-4xl text-white">Join Our World of Luxury</h3>
              <p className="text-white/80 text-lg">
                Subscribe to receive exclusive offers, early access to new collections, and curated content
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-md text-secondary bg-white/95 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transform transition-transform hover:scale-[1.02]"
                />
                <button
                  type="submit"
                  className="group bg-primary px-8 py-4 rounded-md text-white hover:bg-primary/90 transition-all transform hover:translate-x-1"
                >
                  Subscribe
                  <FaArrowRight className="inline-block w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
              <p className="text-white/60 text-sm">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
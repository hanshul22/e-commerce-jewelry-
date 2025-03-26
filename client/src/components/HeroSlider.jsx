import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80",
    alt: "Luxury Diamond Ring"
  },
  {
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80",
    alt: "Pearl Necklace"
  },
  {
    url: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=1920&q=80",
    alt: "Diamond Earrings"
  },
  {
    url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&q=80",
    alt: "Gold Bracelet"
  },
  {
    url: "https://images.unsplash.com/photo-1602751184829-fba99ce46382?w=1920&q=80",
    alt: "Engagement Ring"
  }
];

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-6xl md:text-8xl text-white max-w-4xl mx-auto animate-fade-in">
            Timeless Elegance, Modern Sophistication
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mt-8 animate-fade-in">
            Discover our curated collection of exquisite jewelry pieces, crafted with precision and passion
          </p>
          <div className="flex justify-center gap-4 mt-12">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-all transform hover:translate-x-1"
            >
              Explore Collection
              <FaArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
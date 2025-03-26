import { useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    review: "The craftsmanship of my engagement ring is absolutely stunning. The attention to detail and the quality of the diamonds exceeded my expectations.",
    product: "Diamond Solitaire Ring"
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 5,
    review: "The pearl necklace I purchased for my wife's anniversary was exquisite. The customer service was exceptional, and the packaging was beautiful.",
    product: "Pearl Strand Necklace"
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
    review: "These sapphire earrings are absolutely gorgeous! They catch the light beautifully and I receive compliments every time I wear them.",
    product: "Sapphire Drop Earrings"
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    review: "The diamond tennis bracelet is a masterpiece. The clarity and brilliance of each stone is remarkable. Worth every penny!",
    product: "Diamond Tennis Bracelet"
  },
  {
    id: 5,
    name: "Sophia Rodriguez",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    rating: 5,
    review: "I am in love with my new emerald ring! The design is timeless and the quality is exceptional. LUXE JEWELS never disappoints.",
    product: "Emerald Halo Ring"
  }
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm min-w-[300px] md:min-w-[400px] mx-4">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-5 w-5 ${
              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 mb-4">{review.review}</p>
      
      <p className="text-sm text-primary font-medium">
        Purchased: {review.product}
      </p>
    </div>
  );
}

function ReviewsSection() {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  // Triple the reviews to ensure smooth looping
  const reviewsRef = useRef([...reviews, ...reviews, ...reviews]);
  const animationRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const scrollWidth = scroller.scrollWidth / 3; // Width of one set of reviews
    let currentScroll = 0;

    // Initial setup
    gsap.set(scroller, { x: 0 });

    const animate = () => {
      currentScroll -= 0.5; // Adjust speed here
      
      // When we've scrolled one full set of reviews
      if (Math.abs(currentScroll) >= scrollWidth) {
        currentScroll = 0;
        gsap.set(scroller, { x: 0 });
      } else {
        gsap.set(scroller, { x: currentScroll });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Customer Stories</h2>
        <p className="text-gray-600 text-center mb-12">Hear from our valued clients about their experiences</p>
        
        <div 
          ref={containerRef}
          className="overflow-hidden"
        >
          <div 
            ref={scrollerRef}
            className="flex"
            style={{ willChange: 'transform' }}
          >
            {reviewsRef.current.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
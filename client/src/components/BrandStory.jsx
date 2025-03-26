import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BrandStory() {
  return (
    <section className="py-20 bg-secondary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-on-scroll opacity-0">
            <h2 className="font-serif text-4xl md:text-5xl">Our Legacy of Excellence</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Since 1990, LUXE JEWELS has been crafting timeless pieces that celebrate life's most precious moments. 
              Our commitment to excellence and attention to detail has made us a trusted name in luxury jewelry.
            </p>
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="text-center">
                <div className="font-serif text-4xl text-primary mb-2">30+</div>
                <div className="text-sm text-white/60">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl text-primary mb-2">5K+</div>
                <div className="text-sm text-white/60">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl text-primary mb-2">100%</div>
                <div className="text-sm text-white/60">Certified Diamonds</div>
              </div>
            </div>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
            >
              Discover Our Story
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="relative animate-on-scroll opacity-0">
            <div className="aspect-square rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
                alt="Jewelry Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-2/3 aspect-square rounded-lg overflow-hidden border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
                alt="Diamond Ring"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
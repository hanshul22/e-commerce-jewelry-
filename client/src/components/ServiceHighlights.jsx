import { 
  FaTruck,
  FaShieldAlt,
  FaMagic,
  FaExchangeAlt
} from 'react-icons/fa';

const services = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $500"
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    description: "100% secure payment processing"
  },
  {
    icon: FaMagic,
    title: "Lifetime Warranty",
    description: "Free maintenance and cleaning services"
  },
  {
    icon: FaExchangeAlt,
    title: "30-Day Returns",
    description: "Easy returns and exchanges"
  }
];

function ServiceHighlights() {
  return (
    <section className="py-16 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceHighlights
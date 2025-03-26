import { FaGem, FaAward, FaHandshake, FaUsers } from 'react-icons/fa';

const values = [
  {
    icon: FaGem,
    title: "Excellence",
    description: "We pursue perfection in every piece we create, using only the finest materials and most skilled artisans."
  },
  {
    icon: FaAward,
    title: "Quality",
    description: "Each creation undergoes rigorous quality control to ensure it meets our exceptional standards."
  },
  {
    icon: FaHandshake,
    title: "Trust",
    description: "Building lasting relationships through transparency, integrity, and personalized service."
  },
  {
    icon: FaUsers,
    title: "Community",
    description: "Supporting artisans and giving back to communities that inspire our creations."
  }
];

function About() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920"
          alt="Jewelry Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Our Story</h1>
            <p className="text-white/90 text-lg md:text-xl">
              Crafting timeless elegance since 1990
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-4xl text-secondary mb-8">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At LUXE JEWELS, we believe that every piece of jewelry tells a story. Our mission is to create exquisite pieces that become cherished heirlooms, passed down through generations. We combine traditional craftsmanship with contemporary design to create jewelry that celebrates life's most precious moments.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-secondary text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-lg bg-cream hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-secondary mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-secondary text-center mb-16">Our Journey</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-primary mb-2">1990</h3>
                <h4 className="font-serif text-xl mb-4">The Beginning</h4>
                <p className="text-gray-600">LUXE JEWELS was founded with a vision to create exceptional jewelry that combines traditional craftsmanship with contemporary design.</p>
              </div>
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
                  alt="Vintage Workshop"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-primary mb-2">2005</h3>
                <h4 className="font-serif text-xl mb-4">International Recognition</h4>
                <p className="text-gray-600">Our commitment to excellence earned us international acclaim and established LUXE JEWELS as a leader in luxury jewelry.</p>
              </div>
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
                  alt="Award Ceremony"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-primary mb-2">Today</h3>
                <h4 className="font-serif text-xl mb-4">Continuing the Legacy</h4>
                <p className="text-gray-600">We continue to innovate while honoring our heritage, creating pieces that celebrate life's most precious moments.</p>
              </div>
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800"
                  alt="Modern Workshop"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
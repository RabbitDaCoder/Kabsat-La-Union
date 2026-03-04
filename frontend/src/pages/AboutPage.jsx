import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
/**
 * About page - Kabsat La Union story and location
 */
export function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            About Kabsat La Union
          </h1>
          <p className="text-white/80 max-w-xl">
            Where every guest becomes family on the shores of La Union
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container-luxury max-w-4xl text-center">
          <p className="text-ocean-500 uppercase tracking-[0.3em] text-sm mb-6">
            Welcome to the Coast
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ocean-950 mb-8">
            A Surf & Beach Resort Like No Other
          </h2>
          <p className="text-ocean-600 leading-relaxed text-lg mb-6">
            Kabsat, meaning "sibling" in Ilocano, captures the heart of our
            resort in San Juan, La Union. Founded in 2019, Kabsat La Union was
            born from a dream to create a place where surfers, travelers, and
            locals come together as family along the stunning coastline of La
            Union.
          </p>
          <p className="text-ocean-600 leading-relaxed text-lg">
            Over 5+ years, Kabsat La Union has grown into a beloved surf and
            beach destination, blending laid-back coastal living with warm
            Filipino hospitality. Our commitment to community, sustainability,
            and the surf culture of La Union makes every stay unforgettable.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-ocean-50">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-ocean-500 uppercase tracking-[0.3em] text-sm mb-4">
                Location
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-ocean-950 mb-6">
                The Surf Capital of the Philippines
              </h2>
              <p className="text-ocean-600 leading-relaxed mb-6">
                San Juan, La Union sits along the western coast of Luzon, facing
                the South China Sea. Just a scenic 5–6 hour drive north of
                Manila, our resort is right on the famous surf strip — the heart
                of Philippine surf culture.
              </p>
              <div className="space-y-4 text-ocean-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-ocean-700 text-lg">🚐</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-ocean-950 mb-1">
                      Easy Road Trip
                    </h4>
                    <p className="text-sm">
                      5–6 hour scenic drive from Manila via TPLEX
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-ocean-700 text-lg">🏄</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-ocean-950 mb-1">
                      Beachfront on the Surf Strip
                    </h4>
                    <p className="text-sm">
                      Steps away from world-class surf breaks and golden sand
                      beaches
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-ocean-700 text-lg">🌊</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-ocean-950 mb-1">
                      South China Sea
                    </h4>
                    <p className="text-sm">
                      Year-round waves, stunning sunsets, and vibrant coastal
                      culture
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-ocean-200">
              <iframe
                title="Kabsat La Union Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15313.5!2d120.3256!3d16.6639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1553f84aaab%3A0x4b5e3e7d1a8f2c5e!2sSan%20Juan%2C%20La%20Union!5e0!3m2!1sen!2sph!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              {/* Location badge overlay */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md">
                <p className="font-serif text-ocean-950 font-semibold text-sm">
                  Kabsat La Union
                </p>
                <p className="text-ocean-500 text-xs">
                  San Juan, La Union, San Juan, Philippines, 2514
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Beachfront Resort"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-ocean-500 uppercase tracking-[0.3em] text-sm mb-4">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-ocean-950 mb-6">
                Surf, Stay, Belong
              </h2>
              <p className="text-ocean-600 leading-relaxed mb-6">
                At Kabsat La Union, we believe the best experiences are shared.
                Our rooms and communal spaces are designed to bring people
                together — whether you're catching your first wave, sharing
                stories over a sunset bonfire, or simply unwinding by the shore.
              </p>
              <p className="text-ocean-600 leading-relaxed mb-8">
                Every detail reflects the spirit of "kabsat" — treating every
                guest like family. We champion local culture, support La Union's
                surf community, and build lasting connections between travelers
                and the coastal way of life.
              </p>
              <Link to="/rooms">
                <Button variant="luxury">Explore Accommodations</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20 bg-ocean-950 text-white">
        <div className="container-luxury text-center">
          <p className="text-ocean-400 uppercase tracking-[0.3em] text-sm mb-6">
            Experiences
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-12">
            Coastal Adventures Await
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Surfing & Lessons",
                description:
                  "Ride the legendary waves of San Juan with beginner-friendly lessons and board rentals.",
                icon: "🏄",
              },
              {
                title: "Beachfront Dining",
                description:
                  "Savor fresh seafood and local favorites with your toes in the sand and the sunset on the horizon.",
                icon: "🍽",
              },
              {
                title: "Sunset & Bonfires",
                description:
                  "Unwind with nightly bonfires, live acoustic sessions, and the best sunsets in La Union.",
                icon: "🔥",
              },
            ].map((exp) => (
              <div key={exp.title} className="p-8">
                <div className="text-4xl mb-4">{exp.icon}</div>
                <h3 className="font-serif text-xl mb-3">{exp.title}</h3>
                <p className="text-ocean-300 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-luxury text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-ocean-950 mb-6">
            Begin Your Journey
          </h2>
          <p className="text-ocean-600 mb-8">
            Experience the magic of Kabsat La Union for yourself. Our team is
            ready to help you plan an unforgettable coastal escape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rooms">
              <Button variant="luxury" size="lg">
                View Accommodations
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

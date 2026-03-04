import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

/**
 * Footer component with luxury resort styling
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 text-white">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Kabsat La Union"
                className="h-8 w-auto brightness-0 invert"
              />
              <h3 className="font-serif text-2xl tracking-[0.1em]">KABSAT</h3>
            </div>
            <p className="text-ocean-300 text-sm leading-relaxed">
              A coastal surf and beach resort in San Juan, La Union — where the
              waves meet warm Filipino hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-ocean-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/rooms", label: "Accommodations" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-ocean-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-ocean-400">
              Contact
            </h4>
            <ul className="space-y-3 text-ocean-300 text-sm">
              <li>San Juan, La Union</li>
              <li>San Juan, Philippines, 2514</li>
              <li className="pt-2">reservations@kabsatlaunion.com</li>
              <li>kabsatlaunion.com</li>
              <li>+63 72 888 1234</li>
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-ocean-400">
              Guest Services
            </h4>
            <p className="text-ocean-300 text-sm leading-relaxed mb-4">
              Our friendly team is available to assist with your reservation,
              surf lessons, and travel arrangements.
            </p>
            <a
              href="mailto:reservations@kabsatlaunion.com"
              className="inline-block border border-white/30 px-6 py-2 text-sm uppercase tracking-wider hover:bg-white hover:text-ocean-950 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>

        <Separator className="my-12 bg-ocean-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-ocean-400 text-xs">
          <p>&copy; {currentYear} Kabsat La Union. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

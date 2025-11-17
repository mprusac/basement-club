import { Facebook, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Kontakt</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-club-bronze" />
                <span>Kralja Tomislava 63, 88260 Čitluk, BiH</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-club-bronze" />
                <div className="flex flex-col">
                  <a href="tel:+38763267715" className="hover:text-primary transition-colors">
                    +387 63 267 715
                  </a>
                  <a href="tel:+38763196490" className="hover:text-primary transition-colors">
                    +387 63 196 490
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-club-bronze" />
                <span>Pon - Ned: 07:00 - 03:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Brzi linkovi</h3>
            <div className="space-y-2">
              <Link to="/events" className="block text-muted-foreground hover:text-primary transition-colors">
                Događaji
              </Link>
              <Link to="/reservations" className="block text-muted-foreground hover:text-primary transition-colors">
                Rezervacije
              </Link>
              <Link to="/menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Meni
              </Link>
              <Link to="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Galerija
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Pratite nas</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/clubthebasement"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-club-bronze/10 flex items-center justify-center hover:bg-club-bronze transition-colors group"
              >
                <Facebook className="w-5 h-5 text-club-bronze group-hover:text-black transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/clubthebasement"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-club-bronze/10 flex items-center justify-center hover:bg-club-bronze transition-colors group"
              >
                <Instagram className="w-5 h-5 text-club-bronze group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} The Basement Club & Lounge. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

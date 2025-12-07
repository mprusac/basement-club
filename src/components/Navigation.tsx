import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-new.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Početna", path: "/" },
    { name: "Događaji", path: "/events" },
    { name: "Meni", path: "/menu" },
    { name: "Galerija", path: "/gallery" },
    { name: "Kontakt", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-1.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group -ml-2">
            <img src={logo} alt="The Basement Club & Lounge" className="h-14 md:h-16 w-auto transition-all duration-300 group-hover:opacity-90" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-montserrat font-bold tracking-wide transition-all duration-300 hover:text-primary relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Blur backdrop - starts below header */}
            <div 
              className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-black/70 backdrop-blur-md z-[80] animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu content */}
            <div className="md:hidden fixed inset-x-0 top-[60px] bg-background/95 z-[90] border-b border-border animate-fade-in">
              <div className="container mx-auto px-6 py-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-4 text-lg font-montserrat font-bold tracking-wide transition-all duration-300 hover:text-primary hover:translate-x-2 relative opacity-0 animate-slide-up ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground/80"
                    }`}
                    style={{ 
                      animationDelay: `${index * 80}ms`,
                      animationFillMode: 'forwards'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative inline-block">
                      {link.name}
                      {location.pathname === link.path && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Wine, Music } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import crowdImg from "@/assets/crowd.jpg";
import liveMusicImg from "@/assets/live-music.jpg";
const Home = () => {
  const aboutSection = useScrollAnimation();
  const featuresSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/bb-2.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-purple-900/60" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-club-bronze">
            THE BASEMENT
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-2 font-light">
            CLUB & LOUNGE
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-serif italic">
            Live glazba, premium vina i nezaboravni događaji
          </p>
          <div className="flex justify-center">
            <Link to="/events" className="w-full sm:w-auto">
              <Button size="lg" variant="premium" className="w-full sm:w-64 px-8 py-6 text-lg">
                Pogledajte događaje
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-glow" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSection.ref} className={`py-20 px-4 bg-background transition-all duration-1000 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6 text-primary">O klubu</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                The Basement Club & Lounge je ekskluzivan noćni klub smješten u srcu Čitluka. 
                Nudimo jedinstvenu kombinaciju elegantne atmosfere, vrhunske muzike i premium usluge.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">Sa našim VIP prostorom, live nastupima i pažljivo odabranom ponudom pića, garantujemo nezaboravno iskustvo za sve naše goste.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={crowdImg} alt="Club atmosphere" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
              <img src={liveMusicImg} alt="Live music" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresSection.ref} className={`py-20 px-4 bg-card transition-all duration-1000 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Naša ponuda</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Music className="w-8 h-8 text-club-bronze group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-normal mb-2">Live muzika</h3>
              <p className="text-muted-foreground font-normal">Vrhunski izvođači i DJ-evi</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Wine className="w-8 h-8 text-club-bronze group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-normal mb-2">Premium piće</h3>
              <p className="text-muted-foreground font-normal">Odabrana vina i kokteli</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <MapPin className="w-8 h-8 text-club-bronze group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-normal mb-2">VIP prostor</h3>
              <p className="text-muted-foreground font-normal">Ekskluzivni stolovi i boksi</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Calendar className="w-8 h-8 text-club-bronze group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-normal mb-2">Događaji</h3>
              <p className="text-muted-foreground font-normal">Tematske noći i nastupi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className={`py-20 px-4 bg-gradient-to-br from-primary/20 to-purple-900/20 transition-all duration-1000 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Spremni za nezaboravnu noć?</h2>
          <p className="text-xl text-white/80 mb-8">Rezervirajte svoj stol danas i postanite dio ekskluzivnog iskustva!</p>
          <Link to="/reservations">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-6 text-lg gold-glow">
              Rezervirajte sada
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;
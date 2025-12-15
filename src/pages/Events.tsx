import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Users } from "lucide-react";
import liveBandImg from "@/assets/basement_12.jpg";
import kafanskaImg from "@/assets/basement_7-2.jpg";
import newYearImg from "@/assets/basement_39.jpg";
import saturdayPartyImg from "@/assets/saturday-party.jpg";
import heroImg from "@/assets/party-crowd.jpg";
import DJGrandee from "@/assets/DJGrande.png";
import TSMediteran from "@/assets/TSMediteran.png";
import TSTajna from "@/assets/TSTajna.png";
import DzenanL from "@/assets/DzenanL.png";
import RadaM from "@/assets/RadaM.png";
const Events = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("SVI");
  const eventsSection = useScrollAnimation();
  const parallaxOffset = useParallax(0.5);
  const categories = ["SVI", "SPECIJALNI GOSTI", "MUZIKA UŽIVO", "DJ PROGRAM"];
  const events = [{
    id: 1,
    title: "Večer vina i harmonike - TS Mediteran",
    date: "Utorak 2. 12. 2025.",
    time: "20:00",
    category: "MUZIKA UŽIVO",
    description: "Ovog utorka uživajte u notama TS Mediteran uz neodoljivu ponudu vina i meze! 🫒😋",
    image: TSMediteran
  }, {
    id: 2,
    title: "Dženan Lončarević",
    date: "Petak 5. 12. 2025.",
    time: "21:00",
    category: "SPECIJALNI GOSTI",
    description: "Prepusti se emocijama, atmosferi i hitovima koje svi znamo napamet. ❤️",
    image: DzenanL
  }, {
    id: 3,
    title: "Saturday madness",
    date: "Subota 6. 11. 2025.",
    time: "22:00",
    category: "DJ PROGRAM",
    description: "Ovaj vikend, najbolji provod vam priređuju DJ Grandeee & DJ Scylla ⚡️💯",
    image: DJGrandee
  }, , {
    id: 4,
    title: "Večer vina i harmonike - TS Tajna",
    date: "Utorak 9. 12. 2025.",
    time: "20:00",
    category: "MUZIKA UŽIVO",
    description: "Što vas čeka? TS Tajna, bogata vinska ponuda, ukusna meza i zabava za pamćenje! 💃🏻",
    image: TSTajna
  }, {
    id: 5,
    title: "Rada Manojlović",
    date: "Subota 13. 12. 2025.",
    time: "21:00",
    category: "SPECIJALNI GOSTI",
    description: "Pripremite se za energične ritmove, svima poznate hitove i ludu atmosferu kakvu samo Rada zna prirediti! 🎶🎤",
    image: RadaM
  }];
  const filteredEvents = selectedCategory === "SVI" ? events : events.filter(event => event.category === selectedCategory);
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-20 pb-2 md:pb-4 px-4 overflow-hidden min-h-[18vh] md:min-h-[22vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImg})`,
        transform: `translateY(${parallaxOffset}px)`
      }} />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-club-bronze animate-fade-in">
            Nadolazeći događaji
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">Doživi nezaboravnu noć !</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-0 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="relative">
            {/* Fade indicators for mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
            <div className="flex gap-3 md:gap-10 justify-start md:justify-center overflow-x-auto scrollbar-hide pb-2 -mb-2 px-2 md:px-0">
              {categories.map(category => (
                <button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`px-5 py-2 rounded-full font-medium transition-all border-2 whitespace-nowrap flex-shrink-0 ${selectedCategory === category ? "bg-primary text-primary-foreground border-club-bronze shadow-lg" : "bg-card hover:bg-muted text-foreground border-club-bronze"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section ref={eventsSection.ref} className={`py-8 md:py-16 px-2 md:px-4 transition-all duration-1000 ${eventsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl px-0 md:px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredEvents.map((event, index) => <Card key={event.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader className="p-3 md:p-4">
                  <CardTitle className="text-base md:text-lg text-primary line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-3 md:p-4 pt-0">
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">{event.description}</p>
                  <Button 
                    onClick={() => navigate('/reservations', { 
                      state: { 
                        eventTitle: event.title,
                        eventDate: event.date,
                        eventTime: event.time,
                        eventCategory: event.category
                      } 
                    })}
                    className="w-full text-xs md:text-sm py-2"
                    variant="premium"
                    size="sm"
                  >
                    Rezerviraj
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          {filteredEvents.length === 0 && <div className="text-center py-20">
              <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                Nema događaja u ovoj kategoriji
              </p>
            </div>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Events;
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
  const [selectedCategory, setSelectedCategory] = useState("Svi");
  const eventsSection = useScrollAnimation();
  const parallaxOffset = useParallax(0.5);
  const categories = ["Svi", "Specijalni gosti", "Muzika uživo", "DJ program"];
  const events = [{
    id: 1,
    title: "Večer vina i harmonike - TS Mediteran",
    date: "Utorak 2. 12. 2025.",
    time: "20:00",
    category: "Muzika uživo",
    description: "Ovog utorka uživajte u notama TS Mediteran uz neodoljivu ponudu vina i meze! 🫒😋",
    image: TSMediteran
  }, {
    id: 2,
    title: "Dženan Lončarević",
    date: "Petak 5. 12. 2025.",
    time: "21:00",
    category: "Specijalni gosti",
    description: "Prepusti se emocijama, atmosferi i hitovima koje svi znamo napamet. ❤️",
    image: DzenanL
  }, {
    id: 3,
    title: "Saturday madness",
    date: "Subota 6. 11. 2025.",
    time: "22:00",
    category: "DJ program",
    description: "Ovaj vikend, najbolji provod vam priređuju DJ Grandeee & DJ Scylla ⚡️💯",
    image: DJGrandee
  }, , {
    id: 4,
    title: "Večer vina i harmonike - TS Tajna",
    date: "Utorak 9. 12. 2025.",
    time: "20:00",
    category: "Muzika uživo",
    description: "Što vas čeka? TS Tajna, bogata vinska ponuda, ukusna meza i zabava za pamćenje! 💃🏻",
    image: TSTajna
  }, {
    id: 5,
    title: "Rada Manojlović",
    date: "Subota 13. 12. 2025.",
    time: "21:00",
    category: "Specijalni gosti",
    description: "Pripremite se za energične ritmove, svima poznate hitove i ludu atmosferu kakvu samo Rada zna prirediti! 🎶🎤",
    image: RadaM
  }];
  const filteredEvents = selectedCategory === "Svi" ? events : events.filter(event => event.category === selectedCategory);
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImg})`,
        transform: `translateY(${parallaxOffset}px)`
      }} />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-bronze animate-fade-in">
            Nadolazeći događaji
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Doživi nezaboravnu noć !</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full font-medium transition-all border-2 ${selectedCategory === category ? "bg-primary text-primary-foreground border-club-bronze shadow-lg" : "bg-card hover:bg-muted text-foreground border-club-bronze"}`}>
                {category}
              </button>)}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section ref={eventsSection.ref} className={`py-16 px-4 transition-all duration-1000 ${eventsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => <Card key={event.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-lg">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  <Button 
                    onClick={() => navigate('/reservations', { 
                      state: { 
                        eventTitle: event.title,
                        eventDate: event.date,
                        eventTime: event.time,
                        eventCategory: event.category
                      } 
                    })}
                    className="w-full"
                    variant="premium"
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
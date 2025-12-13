import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import contactHeroImage from "@/assets/contact-hero.png";
import { toast } from "sonner";
const Contact = () => {
  const contactSection = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Poruka poslata!", {
      description: "Kontaktiramo vas u najkraćem roku."
    });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative pt-20 md:pt-24 pb-4 md:pb-8 px-2 md:px-4 min-h-[25vh] md:min-h-[30vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={contactHeroImage} 
            alt="The Basement Club & Lounge - Terasa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-club-bronze animate-fade-in drop-shadow-lg">
            Kontaktirajte nas
          </h1>
          <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto drop-shadow-md">Imate pitanja? Rado ćemo vam pomoći!</p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactSection.ref} className={`py-8 md:py-16 px-2 md:px-4 transition-all duration-1000 ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-7xl px-1 md:px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Informacije</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                    <MapPin className="w-6 h-6 text-club-bronze flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Adresa</h3>
                      <p className="text-muted-foreground">
                        Kralja Tomislava 63<br />
                        88260 Čitluk, BiH
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                    <Phone className="w-6 h-6 text-club-bronze flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <a href="tel:+38763267715" className="text-muted-foreground hover:text-primary transition-colors block">
                        +387 63 267 715
                      </a>
                      <a href="tel:+38763196490" className="text-muted-foreground hover:text-primary transition-colors block">
                        +387 63 196 490
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                    <Clock className="w-6 h-6 text-club-bronze flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Radno vrijeme</h3>
                      <p className="text-muted-foreground">
                        ponedjeljak - nedjelja<br />
                        07:00 - 03:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                    <Mail className="w-6 h-6 text-club-bronze flex-shrink-0 mt-1" />
                    <div>
                    <h3 className="font-semibold mb-1">​E-mail</h3>
                      <a href="mailto:thebasementclubcitluk@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        base@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card p-8 rounded-lg border border-border shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">Pošaljite poruku</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Ime i prezime *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Vaše ime" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="vas@email.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="message">Poruka *</Label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Vaša poruka..." rows={6} className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>

                  <Button type="submit" size="lg" variant="premium" className="w-full">
                    Pošalji poruku
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width Dark Theme */}
      <section className="py-0 px-0">
        <div className="w-full h-[500px] relative">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.4456789!2d17.6891234!3d43.2156789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS3JhbGphIFRvbWlzbGF2YSA2MywgODgyNjAgxIxpdGx1aw!5e0!3m2!1shr!2sba!4v1620000000000!5m2!1shr!2sba&maptype=roadmap&zoom=15&q=Kralja+Tomislava+63,+88260+Čitluk,+Bosnia+and+Herzegovina" width="100%" height="100%" style={{
          border: 0,
          filter: "invert(90%) hue-rotate(180deg) contrast(0.9) brightness(0.9)"
        }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="The Basement Club Location - Kralja Tomislava 63, Čitluk" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/20 to-transparent" />
        </div>
      </section>

      <Footer />
    </div>;
};
export default Contact;
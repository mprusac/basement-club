import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import floorPlanImg from "@/assets/floor-plan.jpg";
const Reservations = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
    note: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      toast.error("Molimo odaberite stol ili VIP prostor");
      return;
    }

    // Simulate reservation
    toast.success("Rezervacija primljena!", {
      description: `Uspješno ste rezervisali ${selectedTable}. Kontaktiramo vas uskoro.`
    });

    // Reset form
    setSelectedTable("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      note: ""
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/20 to-purple-900/10">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary animate-fade-in">
            Rezervirajte svoj prostor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Odaberite stol ili VIP box i osigurajte sebi nezaboravnu večer!</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              <span className="text-sm text-muted-foreground">Dostupno</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary rounded" />
              <span className="text-sm text-muted-foreground">VIP Prostor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Floor Plan */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-primary">Raspored kluba</h2>
                <p className="text-muted-foreground">Kliknite na željeni stol ili prostor da ga odaberete:</p>
              </div>
              
              <div className="relative border-4 border-primary/30 rounded-lg overflow-hidden">
                <img src={floorPlanImg} alt="Floor Plan" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-3 text-primary">Napomena</h3>
                <p className="text-sm text-muted-foreground">
                  Za precizne informacije o dostupnosti stolova i VIP prostora, 
                  kontaktirajte nas direktno na: <br />
                  <span className="text-primary font-semibold">+387 63 267 715</span> ili{" "}
                  <span className="text-primary font-semibold">+387 63 196 490</span>
                </p>
              </div>
            </div>

            {/* Reservation Form */}
            <div>
              <div className="bg-card p-8 rounded-lg border border-border shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">Podaci za rezervaciju</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Table Display */}
                  {selectedTable && <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                      <p className="text-sm font-medium">Odabrani prostor:</p>
                      <p className="text-lg font-bold text-primary">{selectedTable}</p>
                    </div>}

                  {/* Table Selection Buttons */}
                  <div>
                    <Label>Odaberite Prostor *</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["Stol 1", "Stol 2", "Stol 3", "VIP Boks A", "VIP Boks B", "Šank Zona"].map(table => <button key={table} type="button" onClick={() => setSelectedTable(table)} className={`p-3 rounded-lg border transition-all ${selectedTable === table ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
                          {table}
                        </button>)}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Ime i Prezime *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Vaše ime i prezime" className="mt-1" />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="vas@email.com" className="mt-1" />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+387 xx xxx xxx" className="mt-1" />
                  </div>

                  {/* Date and Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Datum *</Label>
                      <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="guests">Broj Gostiju *</Label>
                      <Input id="guests" name="guests" type="number" min="1" value={formData.guests} onChange={handleChange} required className="mt-1" />
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <Label htmlFor="note">Dodatna Napomena</Label>
                    <textarea id="note" name="note" value={formData.note} onChange={handleChange} placeholder="Posebni zahtjevi ili pitanja..." className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm" />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 glow-effect">
                    Pošalji Rezervaciju
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Potvrdu rezervacije ćete primiti na email ili telefonom
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Reservations;
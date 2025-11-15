import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Wine, Beer, GlassWater, Coffee } from "lucide-react";
import winesImg from "@/assets/wines.jpg";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vina");

  const menuCategories = {
    Vina: [
      { name: "Teuta Rose", price: "30 KM", description: "Vrhunsko roze vino" },
      { name: "Blatina", price: "35 KM", description: "Tradicionalno crno vino" },
      { name: "Kameno", price: "32 KM", description: "Premium bijelo vino" },
      { name: "Prosecco", price: "45 KM", description: "Italjansko pjenušavo vino" },
    ],
    Žestoka: [
      { name: "Jack Daniel's", price: "8 KM", description: "Bourbon whiskey" },
      { name: "Jameson", price: "7 KM", description: "Irish whiskey" },
      { name: "Ballantine's", price: "6 KM", description: "Scotch whisky" },
      { name: "Vodka Absolute", price: "5 KM", description: "Premium vodka" },
      { name: "Gin Bombay", price: "7 KM", description: "London dry gin" },
    ],
    Kokteli: [
      { name: "Mojito", price: "10 KM", description: "Rum, mint, limeta, soda" },
      { name: "Margarita", price: "12 KM", description: "Tequila, limeta, triple sec" },
      { name: "Cosmopolitan", price: "11 KM", description: "Vodka, cranberry, limeta" },
      { name: "Old Fashioned", price: "13 KM", description: "Whiskey, bitter, šećer" },
    ],
    Pivo: [
      { name: "Heineken", price: "4 KM", description: "0.33l" },
      { name: "Stella Artois", price: "4 KM", description: "0.33l" },
      { name: "Corona", price: "5 KM", description: "0.33l" },
      { name: "Točeno Pivo", price: "3 KM", description: "0.3l" },
    ],
    Bezalkoholno: [
      { name: "Coca Cola", price: "3 KM", description: "0.33l" },
      { name: "Fanta", price: "3 KM", description: "0.33l" },
      { name: "Sprite", price: "3 KM", description: "0.33l" },
      { name: "Sokovi", price: "3 KM", description: "Različiti okusi" },
      { name: "Mineralna Voda", price: "2 KM", description: "0.5l" },
    ],
  };

  const categoryIcons: Record<string, any> = {
    Vina: Wine,
    Žestoka: Wine,
    Kokteli: GlassWater,
    Pivo: Beer,
    Bezalkoholno: Coffee,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={winesImg} alt="Wines" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary animate-fade-in">
            Naš meni
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            odabrana kolekcija premium vina, žestokih pića i koktela
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-4 border-y border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.keys(menuCategories).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {menuCategories[selectedCategory as keyof typeof menuCategories].map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-primary">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-secondary whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-purple-900/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">VIP Paketi</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card p-8 rounded-lg border-2 border-primary shadow-xl">
              <h3 className="text-2xl font-bold mb-3 text-primary">Standard Paket</h3>
              <p className="text-4xl font-bold text-secondary mb-4">150 KM</p>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>✓ Rezervacija stola (6 osoba)</li>
                <li>✓ 2 flaše vina po izboru</li>
                <li>✓ Voćna plata</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border-2 border-secondary shadow-xl">
              <h3 className="text-2xl font-bold mb-3 text-secondary">VIP Paket</h3>
              <p className="text-4xl font-bold text-secondary mb-4">300 KM</p>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>✓ VIP boks (10 osoba)</li>
                <li>✓ Flaša šampanjca</li>
                <li>✓ 2 flaše premium vina</li>
                <li>✓ Voćna i slana plata</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;

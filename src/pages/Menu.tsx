import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import heroImg from "@/assets/basement_30-2.jpg";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface SubCategory {
  name: string;
  items: MenuItem[];
}

interface Category {
  name: string;
  subcategories: SubCategory[];
}

const Menu = () => {
  const menuSection = useScrollAnimation();
  const parallaxOffset = useParallax(0.5);

  const menuData: Category[] = [
    {
      name: "VINA",
      subcategories: [
        {
          name: "Bijela Vina",
          items: [
            { name: "Kameno", price: "32 KM", description: "Premium bijelo vino" },
            { name: "Graševina", price: "28 KM", description: "Suho bijelo vino" },
            { name: "Chardonnay", price: "35 KM", description: "Francusko bijelo vino" },
          ],
        },
        {
          name: "Crna Vina",
          items: [
            { name: "Blatina", price: "35 KM", description: "Tradicionalno crno vino" },
            { name: "Vranac", price: "30 KM", description: "Crnogorsko crno vino" },
            { name: "Merlot", price: "38 KM", description: "Premium crno vino" },
          ],
        },
        {
          name: "Rose Vina",
          items: [
            { name: "Teuta Rose", price: "30 KM", description: "Vrhunsko roze vino" },
            { name: "Provence Rose", price: "40 KM", description: "Francusko roze vino" },
          ],
        },
        {
          name: "Pjenušava Vina",
          items: [
            { name: "Prosecco", price: "45 KM", description: "Talijansko pjenušavo vino" },
            { name: "Champagne", price: "120 KM", description: "Premium šampanjac" },
          ],
        },
      ],
    },
    {
      name: "ALKOHOLNA PIĆA",
      subcategories: [
        {
          name: "Whiskey",
          items: [
            { name: "Jack Daniel's", price: "8 KM", description: "Bourbon whiskey" },
            { name: "Jameson", price: "7 KM", description: "Irish whiskey" },
            { name: "Ballantine's", price: "6 KM", description: "Scotch whisky" },
            { name: "Johnnie Walker Black", price: "10 KM", description: "Premium scotch" },
          ],
        },
        {
          name: "Vodka",
          items: [
            { name: "Absolut", price: "5 KM", description: "Premium vodka" },
            { name: "Grey Goose", price: "12 KM", description: "Francuska premium vodka" },
            { name: "Belvedere", price: "14 KM", description: "Poljska luksuzna vodka" },
          ],
        },
        {
          name: "Gin",
          items: [
            { name: "Bombay Sapphire", price: "7 KM", description: "London dry gin" },
            { name: "Hendrick's", price: "10 KM", description: "Škotski premium gin" },
            { name: "Tanqueray", price: "8 KM", description: "Klasični London gin" },
          ],
        },
        {
          name: "Kokteli",
          items: [
            { name: "Mojito", price: "10 KM", description: "Rum, mint, limeta, soda" },
            { name: "Margarita", price: "12 KM", description: "Tequila, limeta, triple sec" },
            { name: "Cosmopolitan", price: "11 KM", description: "Vodka, cranberry, limeta" },
            { name: "Old Fashioned", price: "13 KM", description: "Whiskey, bitter, šećer" },
            { name: "Aperol Spritz", price: "10 KM", description: "Aperol, prosecco, soda" },
            { name: "Negroni", price: "12 KM", description: "Gin, campari, vermut" },
          ],
        },
        {
          name: "Pivo",
          items: [
            { name: "Heineken", price: "4 KM", description: "0.33l" },
            { name: "Stella Artois", price: "4 KM", description: "0.33l" },
            { name: "Corona", price: "5 KM", description: "0.33l" },
            { name: "Točeno Pivo", price: "3 KM", description: "0.3l" },
          ],
        },
      ],
    },
    {
      name: "BEZALKOHOLNO",
      subcategories: [
        {
          name: "Gazirani Napici",
          items: [
            { name: "Coca Cola", price: "3 KM", description: "0.33l" },
            { name: "Fanta", price: "3 KM", description: "0.33l" },
            { name: "Sprite", price: "3 KM", description: "0.33l" },
            { name: "Schweppes Tonic", price: "3 KM", description: "0.25l" },
          ],
        },
        {
          name: "Sokovi",
          items: [
            { name: "Narandža", price: "3 KM", description: "Svježe cijeđeni" },
            { name: "Jabuka", price: "3 KM", description: "100% voćni sok" },
            { name: "Ananas", price: "4 KM", description: "Premium sok" },
          ],
        },
        {
          name: "Voda",
          items: [
            { name: "Mineralna Voda", price: "2 KM", description: "0.5l" },
            { name: "Negazirana Voda", price: "2 KM", description: "0.5l" },
            { name: "Red Bull", price: "5 KM", description: "0.25l" },
          ],
        },
        {
          name: "Topli Napici",
          items: [
            { name: "Espresso", price: "2 KM", description: "Klasični espresso" },
            { name: "Cappuccino", price: "3 KM", description: "S mliječnom pjenom" },
            { name: "Čaj", price: "2 KM", description: "Različiti okusi" },
          ],
        },
      ],
    },
    {
      name: "HRANA",
      subcategories: [
        {
          name: "Grickalice",
          items: [
            { name: "Miješani Orašasti Plodovi", price: "8 KM", description: "Premium miks" },
            { name: "Masline", price: "6 KM", description: "Mediteranske masline" },
            { name: "Čips", price: "4 KM", description: "Različiti okusi" },
          ],
        },
        {
          name: "Platteri",
          items: [
            { name: "Sir Platter", price: "25 KM", description: "Izbor premium sireva" },
            { name: "Mesni Platter", price: "30 KM", description: "Pršut, kulen, panceta" },
            { name: "Mix Platter", price: "40 KM", description: "Sir i meso kombinacija" },
          ],
        },
        {
          name: "Deserti",
          items: [
            { name: "Čokoladni Mousse", price: "8 KM", description: "Domaći recept" },
            { name: "Cheesecake", price: "10 KM", description: "New York style" },
            { name: "Tiramisu", price: "9 KM", description: "Klasični talijanski" },
          ],
        },
      ],
    },
  ];

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(categoryName.toLowerCase().replace(/\s/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg})`,
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-club-bronze animate-fade-in tracking-wide">
            NAŠA PONUDA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wider">
            Odabrana kolekcija premium pića i delicija
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-0 z-40 py-6 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {menuData.map((category) => (
              <button
                key={category.name}
                onClick={() => scrollToCategory(category.name)}
                className="px-6 py-2 text-sm font-serif tracking-[0.2em] text-foreground hover:text-club-bronze transition-colors duration-300 border-b-2 border-transparent hover:border-club-bronze"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section
        ref={menuSection.ref}
        className={`py-16 px-4 transition-all duration-1000 ${
          menuSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto max-w-3xl">
          {menuData.map((category, categoryIndex) => (
            <div
              key={category.name}
              id={category.name.toLowerCase().replace(/\s/g, '-')}
              className={categoryIndex > 0 ? "mt-20" : ""}
            >
              {/* Main Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-club-bronze tracking-[0.15em] mb-4">
                  {category.name}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <Separator className="w-16 bg-club-bronze/50" />
                  <div className="w-2 h-2 rotate-45 bg-club-bronze" />
                  <Separator className="w-16 bg-club-bronze/50" />
                </div>
              </div>

              {/* Subcategories */}
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subcategory.name} className={subIndex > 0 ? "mt-12" : ""}>
                  {/* Subcategory Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <Separator className="flex-1 bg-border" />
                      <h3 className="text-lg font-serif tracking-[0.15em] text-foreground uppercase whitespace-nowrap">
                        {subcategory.name}
                      </h3>
                      <Separator className="flex-1 bg-border" />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    {subcategory.items.map((item, itemIndex) => (
                      <div
                        key={item.name}
                        className="group py-4 animate-fade-in"
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        {/* Item Row */}
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-foreground tracking-wide uppercase">
                              {item.name}
                            </h4>
                          </div>
                          <div className="flex-1 border-b border-dotted border-muted-foreground/30 mb-1.5" />
                          <span className="text-lg font-serif text-club-bronze font-medium">
                            {item.price}
                          </span>
                        </div>
                        {/* Description */}
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1 italic">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;

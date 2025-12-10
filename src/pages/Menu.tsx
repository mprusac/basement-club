import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParallax } from "@/hooks/useParallax";
import heroImg from "@/assets/basement_30-2.jpg";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  name: string;
  price: string;
  quantity?: string;
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
  const parallaxOffset = useParallax(0.5);
  const [activeCategory, setActiveCategory] = useState<string>("VINA");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navPlaceholderRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const menuData: Category[] = [
    {
      name: "VINA",
      subcategories: [
        {
          name: "Bijela Vina",
          items: [
            { name: "Andrija Žilavka", quantity: "0.75 l", price: "40 KM", description: "Premium bijelo vino" },
            { name: "Andrija Žilavka Selekcija", quantity: "0.75 l", price: "55 KM", description: "Suho bijelo vino" },
            { name: "AG Carska Vina Carska Žilavka", quantity: "0.75 l", price: "40 KM", description: "Francusko bijelo vino" },
            { name: "Carska Vina Žilavka Selekcija Limited Edition", quantity: "0.75 l", price: "55 KM", description: "Francusko bijelo vino" },
            { name: "Marijanović Žilavka", quantity: "0.75 l", price: "40 KM", description: "Premium bijelo vino" },
            { name: "Vinarija Čitluk Kameno", quantity: "0.75 l", price: "40 KM", description: "Premium bijelo vino" },
            { name: "Vinarija Čitluk Teuta Žilavka", quantity: "0.75 l", price: "55 KM", description: "Premium bijelo vino" },
            { name: "Vinarija Čitluk Žilavka Teuta Selekcija", quantity: "0.75 l", price: "60 KM", description: "Premium bijelo vino" },
          ],
        },
        {
          name: "Crna Vina",
          items: [
            { name: "Andrija Blatina", quantity: "0.75 l", price: "40 KM", description: "Tradicionalno crno vino" },
            { name: "Andrija Syrah", quantity: "0.75 l", price: "55 KM", description: "Crnogorsko crno vino" },
            { name: "Vinarija Čitluk Teuta Blatina", quantity: "0.75 l", price: "55 KM", description: "Premium crno vino" },
          ],
        },
        {
          name: "Rose Vina",
          items: [
            { name: "Andrija Vrhunski Rosé", quantity: "0.75 l", price: "40 KM", description: "Vrhunsko roze vino" },
            { name: "Carska Vina Rosé Nika", quantity: "0.75 l", price: "40 KM", description: "Francusko roze vino" },
          ],
        },
        {
          name: "ŠampanjCI",
          items: [
            { name: "Moët & Chandon Brut Impérial", quantity: "0.75 l", price: "190 KM", description: "Talijansko pjenušavo vino" },
            { name: "Moët & Chandon Brut Ice Impérial", quantity: "0.75 l", price: "240 KM", description: "Premium šampanjac" },
            { name: "Moët & Chandon N.I.R Nectar Impérial Dry Rosé", quantity: "0.75 l", price: "290 KM", description: "Premium šampanjac" },
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
            { name: "Jack Daniel's", quantity: "0.03 l", price: "5.50 KM", description: "Bourbon whiskey" },
            { name: "Jack Daniel's Tennessee Honey", price: "6 KM", quantity: "0.03 l", description: "Irish whiskey" },
            { name: "Gentleman Jack", quantity: "0.03 l", price: "7.50 KM", description: "Scotch whisky" },
            { name: "Jack Daniel's Single Barrel", quantity: "0.03 l", price: "8.50 KM", description: "Premium scotch" },
          ],
        },
        {
          name: "Vodka",
          items: [
            { name: "Grey Goose", quantity: "0.03 l", price: "7 KM", description: "Premium vodka" },
            { name: "Belvedere", quantity: "0.03 l", price: "6 KM", description: "Francuska premium vodka" },
            { name: "Smirnoff Red Vodka", quantity: "0.03 l", price: "3.50 KM", description: "Poljska luksuzna vodka" },
            { name: "Vodka Romana", quantity: "0.03 l", price: "2.50 KM", description: "Poljska luksuzna vodka" },
          ],
        },
        {
          name: "Gin",
          items: [
            { name: "Gin Mare", quantity: "0.03 l", price: "8 KM", description: "Premium vodka" },
            { name: "Bombay Sapphire", quantity: "0.03 l", price: "6.50 KM", description: "Francuska premium vodka" },
            { name: "Gin Bob", quantity: "0.03 l", price: "2.50 KM", description: "Poljska luksuzna vodka" },
            { name: "Beefeater Gin", quantity: "0.03 l", price: "3.50 KM", description: "Poljska luksuzna vodka" },
            { name: "Hendrick's", quantity: "0.03 l", price: "5.5 KM", description: "Premium vodka" },
            { name: "Bulldog London Dry Gin", quantity: "0.03 l", price: "4.5 KM", description: "Francuska premium vodka" },
            { name: "Gin Old Pilot's", quantity: "0.03 l", price: "8 KM", description: "Poljska luksuzna vodka" },
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
            { name: "Heineken", quantity: "0.33 l", price: "4 KM", description: "0.33l" },
            { name: "Stella Artois", quantity: "0.33 l", price: "4 KM", description: "0.33l" },
            { name: "Corona", quantity: "0.33 l", price: "5 KM", description: "0.33l" },
            { name: "Točeno Pivo", quantity: "0.33 l", price: "3 KM", description: "0.3l" },
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
          name: "Prirodni sokovi",
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
    const element = categoryRefs.current[categoryName];
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 60;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navHeight - 20, behavior: 'smooth' });
    }
  };

  // Sticky nav and scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (navPlaceholderRef.current && navRef.current) {
        const placeholderRect = navPlaceholderRef.current.getBoundingClientRect();
        setIsNavSticky(placeholderRect.top <= 0);
      }

      // Scroll spy - find active category
      const navHeight = navRef.current?.offsetHeight || 60;
      let currentCategory = "VINA";
      
      for (const category of menuData) {
        const element = categoryRefs.current[category.name];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navHeight + 100) {
            currentCategory = category.name;
          }
        }
      }
      
      setActiveCategory(currentCategory);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
            NAŠA PONUDA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Odabrana kolekcija premium pića i delicija</p>
        </div>
      </section>



      {/* Category Navigation Placeholder for sticky behavior */}
      <div ref={navPlaceholderRef} className={isNavSticky ? "h-[60px]" : ""} />
      
      {/* Category Navigation */}
      <section 
        ref={navRef}
        className={`py-3 px-0 border-b border-border bg-background z-40 transition-shadow ${
          isNavSticky ? "fixed top-0 left-0 right-0 shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <div className="relative">
            {/* Fade indicators for mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
            <div className="flex gap-3 md:gap-8 justify-start md:justify-center overflow-x-auto scrollbar-hide pb-1 -mb-1 px-2 md:px-0">
              {menuData.map((category) => (
                <button
                  key={category.name}
                  onClick={() => scrollToCategory(category.name)}
                  className={`px-5 py-2 rounded-full font-medium transition-all border-2 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category.name 
                      ? "bg-primary text-primary-foreground border-club-bronze shadow-lg" 
                      : "bg-card hover:bg-muted text-foreground border-club-bronze"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 px-4 animate-fade-in">
        <div className="container mx-auto max-w-3xl">
          {menuData.map((category, categoryIndex) => (
            <div
              key={category.name}
              ref={(el) => categoryRefs.current[category.name] = el}
              className={categoryIndex > 0 ? "mt-16" : ""}
            >
              {/* Main Category Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-club-bronze tracking-wider mb-4">
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
                <div key={subcategory.name} className={subIndex > 0 ? "mt-10" : ""}>
                  {/* Subcategory Header */}
                  <div className="mb-5">
                    <div className="flex items-center gap-4">
                      <Separator className="flex-1 bg-border" />
                      <h3 className="text-base font-semibold tracking-widest text-foreground uppercase whitespace-nowrap">
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
                        className="group py-3 animate-fade-in"
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        {/* Item Row */}
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-foreground tracking-wide uppercase">
                              {item.name}
                            </h4>
                          </div>
                          {/* Količina (ako postoji) */}
                          {item.quantity && (
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {item.quantity}
                            </span>
                          )}
                          {/* Točkice + cijena unutra */}
                          <div className="relative flex-1 mb-1.5">
                            <div className="w-full border-b border-dotted border-muted-foreground/30" />
                            <span className="absolute right-0 -top-4 text-lg text-club-bronze font-semibold bg-background pl-2">
                              {item.price}
                            </span>
                          </div>
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

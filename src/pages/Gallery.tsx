import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { X } from "lucide-react";
import heroImg from "@/assets/basement_10-2.jpg";
import interior1 from "@/assets/interior-1.png";
import crowd from "@/assets/crowd.jpg";
import liveMusic from "@/assets/live-music.jpg";
import party from "@/assets/party.jpg";
import sparkler from "@/assets/sparkler.jpg";
import lounge from "@/assets/lounge.jpg";
import wines from "@/assets/wines.jpg";
import basement42 from "@/assets/basement_42.jpg";
import basement10 from "@/assets/basement_10.jpg";
import basement13 from "@/assets/basement_13.jpg";
import basement31 from "@/assets/basement_31.jpg";
import basement37 from "@/assets/basement_37.jpg";
import basement38 from "@/assets/basement_38.jpg";
import basement24 from "@/assets/basement_24.jpg";
import basement422 from "@/assets/basement_42-2.jpg";
const Gallery = () => {
  const gallerySection = useScrollAnimation();
  const parallaxOffset = useParallax(0.5);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = [{
    src: interior1,
    alt: "unutrašnjost kluba"
  }, {
    src: crowd,
    alt: "atmosfera u klubu"
  }, {
    src: liveMusic,
    alt: "live muzika"
  }, {
    src: party,
    alt: "žurka"
  }, {
    src: sparkler,
    alt: "slavlje"
  }, {
    src: lounge,
    alt: "lounge prostor"
  }, {
    src: wines,
    alt: "premium vina"
  }, {
    src: basement42,
    alt: "ambijent i atmosfera"
  }, {
    src: basement10,
    alt: "live nastup"
  }, {
    src: basement13,
    alt: "noćni provod"
  }, {
    src: basement31,
    alt: "live band nastup"
  }, {
    src: basement37,
    alt: "žurka i ples"
  }, {
    src: basement38,
    alt: "DJ u akciji"
  }, {
    src: basement24,
    alt: "kulinarstvo i degustacija"
  }, {
    src: basement422,
    alt: "elegantna atmosfera"
  }];
  return <div className="min-h-screen bg-background">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary animate-fade-in">
            Galerija
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zavirite u atmosferu The Basement Club-a kroz našu foto galeriju!
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={gallerySection.ref} className={`py-16 px-4 transition-all duration-1000 ${gallerySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => <div key={index} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }} onClick={() => setSelectedImage(image.src)}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white font-medium">
                    {image.alt}
                  </div>
                </div>
                <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300 rounded-lg" />
              </div>)}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-primary transition-colors" onClick={() => setSelectedImage(null)}>
            <X size={32} />
          </button>
          <img src={selectedImage} alt="Gallery image" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>}

      <Footer />
    </div>;
};
export default Gallery;
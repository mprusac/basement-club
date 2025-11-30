import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Clock, Tag } from "lucide-react";
import heroImg from "@/assets/basement_45-2.jpg";

type Section = "yellow" | "red" | "blue" | "green" | "orange";

interface Table {
  id: string;
  number: number;
  section: Section;
  x: number;
  y: number;
  available: boolean;
}

const sections: { id: Section; name: string; color: string }[] = [
  { id: "yellow", name: "Žuta Zona", color: "#FDB813" },
  { id: "red", name: "Crvena Zona", color: "#EF4444" },
  { id: "blue", name: "Plava Zona", color: "#3B82F6" },
  { id: "green", name: "Zelena Zona", color: "#10B981" },
  { id: "orange", name: "Narandžasta Zona", color: "#F97316" },
];

const tables: Table[] = [
  // Orange zone - Right side (1-10)
  { id: "1", number: 1, section: "orange", x: 920, y: 60, available: true },
  { id: "2", number: 2, section: "orange", x: 960, y: 90, available: true },
  { id: "3", number: 3, section: "orange", x: 960, y: 150, available: true },
  { id: "4", number: 4, section: "orange", x: 920, y: 120, available: true },
  { id: "5", number: 5, section: "orange", x: 920, y: 180, available: true },
  { id: "6", number: 6, section: "orange", x: 960, y: 210, available: true },
  { id: "7", number: 7, section: "orange", x: 960, y: 270, available: true },
  { id: "8", number: 8, section: "orange", x: 920, y: 240, available: false },
  { id: "9", number: 9, section: "orange", x: 920, y: 300, available: true },
  { id: "10", number: 10, section: "orange", x: 960, y: 330, available: true },

  // Blue zone - Right and center-right (11-20, 44-58)
  { id: "11", number: 11, section: "blue", x: 850, y: 480, available: true },
  { id: "12", number: 12, section: "blue", x: 850, y: 520, available: true },
  { id: "13", number: 13, section: "blue", x: 850, y: 560, available: true },
  { id: "14", number: 14, section: "blue", x: 890, y: 540, available: true },
  { id: "15", number: 15, section: "blue", x: 890, y: 600, available: true },
  { id: "16", number: 16, section: "blue", x: 890, y: 660, available: false },
  { id: "17", number: 17, section: "blue", x: 850, y: 600, available: true },
  { id: "19", number: 19, section: "blue", x: 890, y: 480, available: true },
  { id: "20", number: 20, section: "blue", x: 890, y: 720, available: true },
  
  { id: "44", number: 44, section: "blue", x: 730, y: 700, available: true },
  { id: "45", number: 45, section: "blue", x: 620, y: 480, available: true },
  { id: "46", number: 46, section: "blue", x: 660, y: 500, available: true },
  { id: "47", number: 47, section: "blue", x: 730, y: 620, available: true },
  { id: "49", number: 49, section: "blue", x: 660, y: 560, available: true },
  { id: "50", number: 50, section: "blue", x: 580, y: 480, available: true },
  { id: "51", number: 51, section: "blue", x: 620, y: 540, available: true },
  { id: "52", number: 52, section: "blue", x: 580, y: 520, available: true },
  { id: "53", number: 53, section: "blue", x: 690, y: 660, available: true },
  { id: "54", number: 54, section: "blue", x: 650, y: 680, available: false },
  { id: "55", number: 55, section: "blue", x: 650, y: 640, available: true },
  { id: "56", number: 56, section: "blue", x: 650, y: 600, available: true },
  { id: "57", number: 57, section: "blue", x: 690, y: 580, available: true },

  // Yellow zone - Top (21-29)
  { id: "21", number: 21, section: "yellow", x: 920, y: 380, available: true },
  { id: "22", number: 22, section: "yellow", x: 860, y: 380, available: true },
  { id: "23", number: 23, section: "yellow", x: 800, y: 380, available: true },
  { id: "24", number: 24, section: "yellow", x: 740, y: 380, available: true },
  { id: "25", number: 25, section: "yellow", x: 680, y: 380, available: true },
  { id: "26", number: 26, section: "yellow", x: 620, y: 380, available: true },
  { id: "27", number: 27, section: "yellow", x: 560, y: 380, available: false },
  { id: "28", number: 28, section: "yellow", x: 500, y: 380, available: true },
  { id: "29", number: 29, section: "yellow", x: 440, y: 380, available: true },

  // Red zone - Center-upper (30-43)
  { id: "30", number: 30, section: "red", x: 700, y: 500, available: true },
  { id: "31", number: 31, section: "red", x: 740, y: 540, available: true },
  { id: "32", number: 32, section: "red", x: 780, y: 500, available: true },
  { id: "33", number: 33, section: "red", x: 700, y: 540, available: true },
  { id: "34", number: 34, section: "red", x: 660, y: 440, available: true },
  { id: "35", number: 35, section: "red", x: 620, y: 440, available: true },
  { id: "36", number: 36, section: "red", x: 580, y: 440, available: true },
  { id: "37", number: 37, section: "red", x: 740, y: 480, available: true },
  { id: "38", number: 38, section: "red", x: 700, y: 460, available: true },
  { id: "39", number: 39, section: "red", x: 660, y: 480, available: false },
  { id: "40", number: 40, section: "red", x: 780, y: 540, available: true },
  { id: "41", number: 41, section: "red", x: 540, y: 440, available: true },
  { id: "42", number: 42, section: "red", x: 820, y: 460, available: true },
  { id: "43", number: 43, section: "red", x: 500, y: 440, available: true },

  // Green zone - Bottom (58-62)
  { id: "58", number: 58, section: "green", x: 780, y: 700, available: true },
  { id: "59", number: 59, section: "green", x: 700, y: 740, available: true },
  { id: "60", number: 60, section: "green", x: 660, y: 740, available: true },
  { id: "61", number: 61, section: "green", x: 620, y: 740, available: true },
  { id: "62", number: 62, section: "green", x: 580, y: 740, available: false },
];

const Reservations = () => {
  const location = useLocation();
  const eventInfo = location.state as { eventTitle?: string; eventDate?: string; eventTime?: string; eventCategory?: string } | null;
  const reservationSection = useScrollAnimation();
  const parallaxOffset = useParallax(0.5);

  const [step, setStep] = useState<"section" | "table" | "details">("section");
  const [selectedSection, setSelectedSection] = useState<Section | "">("");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [hoveredSection, setHoveredSection] = useState<Section | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
    gender: "mixed",
    note: "",
  });

  const handleSectionSelect = (sectionId: Section) => {
    setSelectedSection(sectionId);
    if (step === "section") {
      setStep("table");
    }
    setSelectedTable(null);
  };

  const handleTableSelect = (table: Table) => {
    if (table.section !== selectedSection) {
      toast.error("Molimo odaberite stol iz odabranog sektora");
      return;
    }
    if (!table.available) {
      toast.error("Ovaj stol je već rezervisan");
      return;
    }
    setSelectedTable(table);
  };

  const handleContinue = () => {
    if (!selectedTable) {
      toast.error("Molimo odaberite stol");
      return;
    }
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("table");
    } else if (step === "table") {
      setStep("section");
      setSelectedSection("");
      setSelectedTable(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      toast.error("Molimo odaberite stol");
      return;
    }

    toast.success("Rezervacija primljena!", {
      description: `Stol ${selectedTable.number} u ${sections.find((s) => s.id === selectedTable.section)?.name}. Kontaktiramo vas uskoro.`,
    });

    // Reset
    setStep("section");
    setSelectedSection("");
    setSelectedTable(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      gender: "mixed",
      note: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sectionTables = tables.filter((t) => t.section === selectedSection);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Parallax */}
      <section className="relative pt-24 pb-6 px-4 overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg})`,
            transform: `translateY(${parallaxOffset}px)`,
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30" />

        {/* Content */}
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-club-bronze drop-shadow-lg animate-fade-in">
            Rezervirajte svoj stol
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Odaberite stol ili VIP box i osigurajte sebi nezaboravnu večer!
          </p>
        </div>
      </section>

      {/* Reservation Section */}
      <section
        ref={reservationSection.ref}
        className={`py-8 px-2 transition-all duration-1000 ${reservationSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container mx-auto max-w-[1400px]">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div
                className={`flex items-center gap-2 ${step === "section" ? "text-primary" : step === "table" || step === "details" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "section" ? "border-primary bg-primary text-primary-foreground" : "border-primary bg-primary/20"}`}
                >
                  1
                </div>
                <span className="font-medium">Sektor</span>
              </div>
              <div className={`h-0.5 w-16 ${step === "table" || step === "details" ? "bg-primary" : "bg-border"}`} />
              <div
                className={`flex items-center gap-2 ${step === "table" ? "text-primary" : step === "details" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "table" ? "border-primary bg-primary text-primary-foreground" : step === "details" ? "border-primary bg-primary/20" : "border-border"}`}
                >
                  2
                </div>
                <span className="font-medium">Stol</span>
              </div>
              <div className={`h-0.5 w-16 ${step === "details" ? "bg-primary" : "bg-border"}`} />
              <div
                className={`flex items-center gap-2 ${step === "details" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "details" ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                >
                  3
                </div>
                <span className="font-medium">Detalji</span>
              </div>
            </div>
          </div>

          {/* Step 1: Section Selection */}
          {step === "section" && (
            <div className="max-w-full mx-auto">
              {/* Grid Layout: Event Info + Dropdown on Left, Floor Plan on Right */}
              <div className="grid lg:grid-cols-[280px_1fr] gap-3 items-start">
                {/* Left Column: Event Info + Dropdown */}
                <div className="space-y-4">
                  {/* Event Info Banner */}
                  {eventInfo && (
                    <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3">
                      <h3 className="text-base font-bold text-primary mb-2">{eventInfo.eventTitle}</h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {eventInfo.eventDate}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {eventInfo.eventTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          {eventInfo.eventCategory}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section Dropdown */}
                  <div>
                    <Label>Odaberite iz liste</Label>
                    <Select value={selectedSection} onValueChange={(value) => handleSectionSelect(value as Section)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Odaberite sektor..." />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        {sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.name} ({tables.filter((t) => t.section === section.id && t.available).length} dostupno)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message when sector selected but no table chosen */}
                  {selectedSection && !selectedTable && (
                    <p className="text-sm text-muted-foreground text-center">
                      Odaberite željeni stol
                    </p>
                  )}

                  {/* Continue Button */}
                  <Button onClick={handleContinue} size="lg" className="w-full" disabled={!selectedSection}>
                    Nastavi
                  </Button>
                </div>

                {/* Right Column: Floor Plan */}
                <div className="bg-card rounded-lg border border-border p-2">
                <svg viewBox="0 0 1100 850" className="w-full h-auto max-h-[800px]">
                  {/* Background */}
                  <rect width="1100" height="850" fill="#2A1A3D" />
                  
                  {/* Outer Club Walls - Red Border */}
                  <rect x="50" y="50" width="1000" height="750" fill="none" stroke="#DC2626" strokeWidth="6" />
                  
                  {/* Inner Walls */}
                  <rect x="70" y="70" width="960" height="710" fill="none" stroke="#6B7280" strokeWidth="3" />
                  
                  {/* WC Area - Top Left */}
                  <rect x="90" y="90" width="120" height="80" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="150" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">WC</text>
                  
                  {/* DJ Area - Top Center */}
                  <rect x="620" y="90" width="100" height="80" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="670" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">DJ</text>
                  
                  {/* ŠANK Area - Top Right */}
                  <rect x="750" y="90" width="130" height="80" fill="#9333EA" stroke="#A855F7" strokeWidth="2" />
                  <text x="815" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">ŠANK</text>
                  
                  {/* BINA (Stage) - Right Side */}
                  <rect x="950" y="650" width="70" height="120" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="985" y="700" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" transform={`rotate(-90, 985, 710)`}>BINA</text>
                  
                  {/* ŠANK Standing Zone - Left Side */}
                  <rect x="90" y="200" width="120" height="400" fill="#9333EA" opacity="0.3" stroke="#A855F7" strokeWidth="2" />
                  <text x="150" y="400" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" transform={`rotate(-90, 150, 400)`}>ŠANK</text>
                  
                  {/* ULAZ Standing Zone - Right Side Lower */}
                  <rect x="900" y="620" width="110" height="130" fill="#9333EA" opacity="0.3" stroke="#A855F7" strokeWidth="2" />
                  <text x="955" y="685" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">ULAZ</text>
                  
                  {/* Entrance Stairs */}
                  <rect x="90" y="630" width="40" height="60" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="90" y1="645" x2="130" y2="645" stroke="#9CA3AF" strokeWidth="1" />
                  <line x1="90" y1="660" x2="130" y2="660" stroke="#9CA3AF" strokeWidth="1" />
                  <line x1="90" y1="675" x2="130" y2="675" stroke="#9CA3AF" strokeWidth="1" />
                  
                  {/* Pillars/Columns */}
                  <rect x="340" y="480" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="720" y="480" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="760" y="560" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  
                  {/* Section Background Areas - Clickable */}
                  {/* Yellow Zone - Top */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("yellow")}
                    onMouseEnter={() => setHoveredSection("yellow")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="390"
                      y="360"
                      width="550"
                      height="60"
                      fill={selectedSection === "yellow" || hoveredSection === "yellow" ? "#FDB813" : "transparent"}
                      opacity={selectedSection === "yellow" ? 0.4 : hoveredSection === "yellow" ? 0.3 : 0.1}
                      stroke={selectedSection === "yellow" || hoveredSection === "yellow" ? "#FDB813" : "#6B7280"}
                      strokeWidth={selectedSection === "yellow" ? 3 : hoveredSection === "yellow" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Red Zone - Center Upper */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("red")}
                    onMouseEnter={() => setHoveredSection("red")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="450"
                      y="420"
                      width="430"
                      height="130"
                      fill={selectedSection === "red" || hoveredSection === "red" ? "#EF4444" : "transparent"}
                      opacity={selectedSection === "red" ? 0.4 : hoveredSection === "red" ? 0.3 : 0.1}
                      stroke={selectedSection === "red" || hoveredSection === "red" ? "#EF4444" : "#6B7280"}
                      strokeWidth={selectedSection === "red" ? 3 : hoveredSection === "red" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Blue Zone - Center and Right */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("blue")}
                    onMouseEnter={() => setHoveredSection("blue")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="540"
                      y="460"
                      width="410"
                      height="280"
                      fill={selectedSection === "blue" || hoveredSection === "blue" ? "#3B82F6" : "transparent"}
                      opacity={selectedSection === "blue" ? 0.4 : hoveredSection === "blue" ? 0.3 : 0.1}
                      stroke={selectedSection === "blue" || hoveredSection === "blue" ? "#3B82F6" : "#6B7280"}
                      strokeWidth={selectedSection === "blue" ? 3 : hoveredSection === "blue" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Green Zone - Bottom */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("green")}
                    onMouseEnter={() => setHoveredSection("green")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="550"
                      y="720"
                      width="270"
                      height="50"
                      fill={selectedSection === "green" || hoveredSection === "green" ? "#10B981" : "transparent"}
                      opacity={selectedSection === "green" ? 0.4 : hoveredSection === "green" ? 0.3 : 0.1}
                      stroke={selectedSection === "green" || hoveredSection === "green" ? "#10B981" : "#6B7280"}
                      strokeWidth={selectedSection === "green" ? 3 : hoveredSection === "green" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Orange Zone - Far Right */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("orange")}
                    onMouseEnter={() => setHoveredSection("orange")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="900"
                      y="50"
                      width="120"
                      height="400"
                      fill={selectedSection === "orange" || hoveredSection === "orange" ? "#F97316" : "transparent"}
                      opacity={selectedSection === "orange" ? 0.4 : hoveredSection === "orange" ? 0.3 : 0.1}
                      stroke={selectedSection === "orange" || hoveredSection === "orange" ? "#F97316" : "#6B7280"}
                      strokeWidth={selectedSection === "orange" ? 3 : hoveredSection === "orange" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* All Tables */}
                  {tables.map((table) => {
                    const sectionColor = sections.find((s) => s.id === table.section)?.color || "#666";
                    const isInSelectedSection = selectedSection === table.section;
                    const isInHoveredSection = hoveredSection === table.section;
                    
                    return (
                      <g key={table.id} className="pointer-events-none">
                        <rect
                          x={table.x - 18}
                          y={table.y - 18}
                          width="36"
                          height="36"
                          rx="4"
                          fill={
                            !table.available
                              ? "#4B5563"
                              : isInSelectedSection || isInHoveredSection
                                ? sectionColor
                                : "#1F2937"
                          }
                          stroke={isInSelectedSection || isInHoveredSection ? sectionColor : "#6B7280"}
                          strokeWidth={isInSelectedSection || isInHoveredSection ? 3 : 2}
                          opacity={!table.available ? 0.5 : 1}
                          className="transition-all duration-300"
                        />
                        <text
                          x={table.x}
                          y={table.y + 6}
                          textAnchor="middle"
                          fill={!table.available ? "#9CA3AF" : isInSelectedSection || isInHoveredSection ? "white" : "#E5E7EB"}
                          fontSize="14"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {table.number}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm flex-wrap">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: section.color }} />
                      <span className={selectedSection === section.id ? "font-bold text-primary" : ""}>
                        {section.name}
                      </span>
                    </div>
                  ))}
                </div>
                </div>
              </div>

              {selectedSection && (
                <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center mt-6">
                  <p className="text-lg font-semibold mb-2">
                    Odabrani sektor:{" "}
                    <span className="text-primary text-2xl">
                      {sections.find((s) => s.id === selectedSection)?.name}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    {tables.filter((t) => t.section === selectedSection && t.available).length} dostupnih stolova
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Table Selection */}
          {step === "table" && (
            <div className="max-w-full mx-auto">
              {/* Grid Layout: Event Info + Dropdown on Left, Floor Plan on Right */}
              <div className="grid lg:grid-cols-[280px_1fr] gap-3 items-start">
                {/* Left Column: Event Info + Dropdown */}
                <div className="space-y-4">
                  {/* Event Info Banner */}
                  {eventInfo && (
                    <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3">
                      <h3 className="text-base font-bold text-primary mb-2">{eventInfo.eventTitle}</h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {eventInfo.eventDate}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {eventInfo.eventTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          {eventInfo.eventCategory}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section Dropdown */}
                  <div>
                    <Label>Odaberite sektor</Label>
                    <Select value={selectedSection} onValueChange={(value) => handleSectionSelect(value as Section)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Odaberite sektor..." />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        {sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.name} ({tables.filter((t) => t.section === section.id && t.available).length} dostupno)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message when sector selected but no table chosen */}
                  {selectedSection && !selectedTable && (
                    <p className="text-sm text-muted-foreground text-center">
                      Odaberite željeni stol
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={handleBack} variant="outline" size="lg" className="flex-1 hover:bg-club-bronze hover:text-black border-club-bronze">
                      Nazad
                    </Button>
                    <Button onClick={handleContinue} size="lg" className="flex-1" disabled={!selectedTable}>
                      Nastavi
                    </Button>
                  </div>

                  {/* Selected Table Info */}
                  {selectedTable && (
                    <div className="bg-primary/10 border border-primary rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold">
                        Odabrani stol: <span className="text-primary text-lg">#{selectedTable.number}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        u sektoru {sections.find((s) => s.id === selectedTable.section)?.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Floor Plan */}
                <div className="bg-card rounded-lg border-2 border-border p-4">
                <svg viewBox="0 0 1100 850" className="w-full h-auto max-h-[800px]">
                  {/* Background */}
                  <rect width="1100" height="850" fill="#2A1A3D" />
                  
                  {/* Outer Club Walls - Red Border */}
                  <rect x="50" y="50" width="1000" height="750" fill="none" stroke="#DC2626" strokeWidth="6" />
                  
                  {/* Inner Walls */}
                  <rect x="70" y="70" width="960" height="710" fill="none" stroke="#6B7280" strokeWidth="3" />
                  
                  {/* WC Area - Top Left */}
                  <rect x="90" y="90" width="120" height="80" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="150" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">WC</text>
                  
                  {/* DJ Area - Top Center */}
                  <rect x="620" y="90" width="100" height="80" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="670" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">DJ</text>
                  
                  {/* ŠANK Area - Top Right */}
                  <rect x="750" y="90" width="130" height="80" fill="#9333EA" stroke="#A855F7" strokeWidth="2" />
                  <text x="815" y="135" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">ŠANK</text>
                  
                  {/* BINA (Stage) - Right Side */}
                  <rect x="950" y="650" width="70" height="120" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" />
                  <text x="985" y="700" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" transform={`rotate(-90, 985, 710)`}>BINA</text>
                  
                  {/* ŠANK Standing Zone - Left Side */}
                  <rect x="90" y="200" width="120" height="400" fill="#9333EA" opacity="0.3" stroke="#A855F7" strokeWidth="2" />
                  <text x="150" y="400" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" transform={`rotate(-90, 150, 400)`}>ŠANK</text>
                  
                  {/* ULAZ Standing Zone - Right Side Lower */}
                  <rect x="900" y="620" width="110" height="130" fill="#9333EA" opacity="0.3" stroke="#A855F7" strokeWidth="2" />
                  <text x="955" y="685" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">ULAZ</text>
                  
                  {/* Entrance Stairs */}
                  <rect x="90" y="630" width="40" height="60" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="90" y1="645" x2="130" y2="645" stroke="#9CA3AF" strokeWidth="1" />
                  <line x1="90" y1="660" x2="130" y2="660" stroke="#9CA3AF" strokeWidth="1" />
                  <line x1="90" y1="675" x2="130" y2="675" stroke="#9CA3AF" strokeWidth="1" />
                  
                  {/* Pillars/Columns */}
                  <rect x="340" y="480" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="720" y="480" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="760" y="560" width="30" height="30" fill="#6B7280" stroke="#9CA3AF" strokeWidth="2" />
                  
                  {/* Section Background Areas - Clickable */}
                  {/* Yellow Zone - Top */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("yellow")}
                    onMouseEnter={() => setHoveredSection("yellow")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="390"
                      y="360"
                      width="550"
                      height="60"
                      fill={selectedSection === "yellow" || hoveredSection === "yellow" ? "#FDB813" : "transparent"}
                      opacity={selectedSection === "yellow" ? 0.4 : hoveredSection === "yellow" ? 0.3 : 0.1}
                      stroke={selectedSection === "yellow" || hoveredSection === "yellow" ? "#FDB813" : "#6B7280"}
                      strokeWidth={selectedSection === "yellow" ? 3 : hoveredSection === "yellow" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Red Zone - Center Upper */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("red")}
                    onMouseEnter={() => setHoveredSection("red")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="450"
                      y="420"
                      width="430"
                      height="130"
                      fill={selectedSection === "red" || hoveredSection === "red" ? "#EF4444" : "transparent"}
                      opacity={selectedSection === "red" ? 0.4 : hoveredSection === "red" ? 0.3 : 0.1}
                      stroke={selectedSection === "red" || hoveredSection === "red" ? "#EF4444" : "#6B7280"}
                      strokeWidth={selectedSection === "red" ? 3 : hoveredSection === "red" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Blue Zone - Center and Right */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("blue")}
                    onMouseEnter={() => setHoveredSection("blue")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="540"
                      y="460"
                      width="410"
                      height="280"
                      fill={selectedSection === "blue" || hoveredSection === "blue" ? "#3B82F6" : "transparent"}
                      opacity={selectedSection === "blue" ? 0.4 : hoveredSection === "blue" ? 0.3 : 0.1}
                      stroke={selectedSection === "blue" || hoveredSection === "blue" ? "#3B82F6" : "#6B7280"}
                      strokeWidth={selectedSection === "blue" ? 3 : hoveredSection === "blue" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Green Zone - Bottom */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("green")}
                    onMouseEnter={() => setHoveredSection("green")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="550"
                      y="720"
                      width="270"
                      height="50"
                      fill={selectedSection === "green" || hoveredSection === "green" ? "#10B981" : "transparent"}
                      opacity={selectedSection === "green" ? 0.4 : hoveredSection === "green" ? 0.3 : 0.1}
                      stroke={selectedSection === "green" || hoveredSection === "green" ? "#10B981" : "#6B7280"}
                      strokeWidth={selectedSection === "green" ? 3 : hoveredSection === "green" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* Orange Zone - Far Right */}
                  <g
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => handleSectionSelect("orange")}
                    onMouseEnter={() => setHoveredSection("orange")}
                    onMouseLeave={() => setHoveredSection("")}
                  >
                    <rect
                      x="900"
                      y="50"
                      width="120"
                      height="400"
                      fill={selectedSection === "orange" || hoveredSection === "orange" ? "#F97316" : "transparent"}
                      opacity={selectedSection === "orange" ? 0.4 : hoveredSection === "orange" ? 0.3 : 0.1}
                      stroke={selectedSection === "orange" || hoveredSection === "orange" ? "#F97316" : "#6B7280"}
                      strokeWidth={selectedSection === "orange" ? 3 : hoveredSection === "orange" ? 2 : 1}
                      rx="8"
                    />
                  </g>
                  
                  {/* All Tables */}
                  {tables.map((table) => {
                    const sectionColor = sections.find((s) => s.id === table.section)?.color || "#666";
                    const isSelected = selectedTable?.id === table.id;
                    const isInSelectedSection = table.section === selectedSection;
                    
                    return (
                      <g key={table.id}>
                        <rect
                          x={table.x - 18}
                          y={table.y - 18}
                          width="36"
                          height="36"
                          rx="4"
                          fill={
                            !table.available
                              ? "#4B5563"
                              : isSelected
                                ? sectionColor
                                : isInSelectedSection
                                  ? sectionColor
                                  : "#1F2937"
                          }
                          stroke={isSelected || isInSelectedSection ? sectionColor : "#6B7280"}
                          strokeWidth={isSelected ? 4 : isInSelectedSection ? 3 : 2}
                          className="cursor-pointer transition-all duration-200"
                          onClick={() => handleTableSelect(table)}
                          opacity={!table.available ? 0.5 : 1}
                        />
                        <text
                          x={table.x}
                          y={table.y + 6}
                          textAnchor="middle"
                          fill={!table.available ? "#9CA3AF" : isSelected || isInSelectedSection ? "white" : "#E5E7EB"}
                          fontSize="14"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {table.number}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-800 border-2 border-gray-600" />
                    <span>Dostupno</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: sections.find((s) => s.id === selectedSection)?.color }}
                    />
                    <span>Odabrano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-600 opacity-50" />
                    <span>Zauzeto</span>
                  </div>
                </div>
                </div>
              </div>

            </div>
          )}

          {/* Step 3: Details Form */}
          {step === "details" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">Završite rezervaciju</h2>
                <p className="text-muted-foreground">Unesite svoje podatke</p>
              </div>

              {selectedTable && (
                <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8">
                  <p className="text-center">
                    <span className="text-muted-foreground">Stol</span>{" "}
                    <span className="text-2xl font-bold text-primary">#{selectedTable.number}</span>{" "}
                    <span className="text-muted-foreground">u sektoru</span>{" "}
                    <span className="font-semibold">{sections.find((s) => s.id === selectedTable.section)?.name}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-xl">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Ime i Prezime *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Vaše ime i prezime"
                    className="mt-2"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="vas@email.com"
                    className="mt-2"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+387 xx xxx xxx"
                    className="mt-2"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <Label htmlFor="guests">Broj Gostiju *</Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                {/* Gender Selection */}
                <div>
                  <Label>Sastav društva</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {[
                      { value: "male", label: "Muško" },
                      { value: "female", label: "Žensko" },
                      { value: "mixed", label: "Miješano" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: option.value })}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          formData.gender === option.value
                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                            : "bg-card border-border hover:border-primary hover:shadow-md"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <Label htmlFor="note">Dodatna Napomena</Label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Posebni zahtjevi ili pitanja..."
                    className="mt-2 w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="button" onClick={handleBack} variant="outline" size="lg" className="flex-1 hover:bg-club-bronze hover:text-black border-club-bronze">
                    Nazad
                  </Button>
                  <Button type="submit" size="lg" variant="premium" className="flex-1">
                    Rezervirajte sada
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  * Potvrdu rezervacije ćete primiti na email ili telefonom
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Reservations;

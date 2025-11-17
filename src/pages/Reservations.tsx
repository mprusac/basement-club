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

type Section = "ulaz" | "bina" | "lijevi-sank" | "centar" | "desna" | "glavni-sank";

interface Table {
  id: string;
  number: number;
  section: Section;
  x: number;
  y: number;
  available: boolean;
}

const sections: { id: Section; name: string; color: string }[] = [
  { id: "ulaz", name: "Ulaz Zona", color: "#8B5CF6" },
  { id: "bina", name: "Bina Zona", color: "#EC4899" },
  { id: "lijevi-sank", name: "DJ & Lijevi Šank", color: "#F59E0B" },
  { id: "centar", name: "Centralna Zona", color: "#10B981" },
  { id: "desna", name: "Desna Zona", color: "#3B82F6" },
  { id: "glavni-sank", name: "Glavni Šank", color: "#EF4444" },
];

const tables: Table[] = [
  // Ulaz zona (1-10)
  { id: "1", number: 1, section: "ulaz", x: 100, y: 80, available: true },
  { id: "2", number: 2, section: "ulaz", x: 150, y: 80, available: true },
  { id: "3", number: 3, section: "ulaz", x: 200, y: 80, available: true },
  { id: "4", number: 4, section: "ulaz", x: 100, y: 130, available: true },
  { id: "5", number: 5, section: "ulaz", x: 150, y: 130, available: true },
  { id: "6", number: 6, section: "ulaz", x: 200, y: 130, available: false },
  { id: "7", number: 7, section: "ulaz", x: 250, y: 130, available: true },
  { id: "8", number: 8, section: "ulaz", x: 100, y: 180, available: true },
  { id: "9", number: 9, section: "ulaz", x: 150, y: 180, available: true },
  { id: "10", number: 10, section: "ulaz", x: 200, y: 180, available: true },

  // Bina zona (11-20)
  { id: "11", number: 11, section: "bina", x: 350, y: 80, available: true },
  { id: "12", number: 12, section: "bina", x: 400, y: 80, available: true },
  { id: "13", number: 13, section: "bina", x: 350, y: 130, available: true },
  { id: "14", number: 14, section: "bina", x: 400, y: 130, available: false },
  { id: "15", number: 15, section: "bina", x: 450, y: 130, available: true },
  { id: "16", number: 16, section: "bina", x: 500, y: 130, available: true },
  { id: "17", number: 17, section: "bina", x: 350, y: 180, available: true },
  { id: "18", number: 18, section: "bina", x: 400, y: 180, available: true },
  { id: "19", number: 19, section: "bina", x: 450, y: 180, available: true },
  { id: "20", number: 20, section: "bina", x: 500, y: 180, available: true },

  // Lijevi šank/DJ zona (21-29)
  { id: "21", number: 21, section: "lijevi-sank", x: 120, y: 280, available: true },
  { id: "22", number: 22, section: "lijevi-sank", x: 120, y: 320, available: true },
  { id: "23", number: 23, section: "lijevi-sank", x: 120, y: 360, available: true },
  { id: "24", number: 24, section: "lijevi-sank", x: 120, y: 400, available: true },
  { id: "25", number: 25, section: "lijevi-sank", x: 120, y: 440, available: false },
  { id: "26", number: 26, section: "lijevi-sank", x: 120, y: 480, available: true },
  { id: "27", number: 27, section: "lijevi-sank", x: 120, y: 520, available: true },
  { id: "28", number: 28, section: "lijevi-sank", x: 120, y: 560, available: true },
  { id: "29", number: 29, section: "lijevi-sank", x: 120, y: 600, available: true },

  // Centralna zona (30-43)
  { id: "30", number: 30, section: "centar", x: 220, y: 280, available: true },
  { id: "31", number: 31, section: "centar", x: 200, y: 320, available: true },
  { id: "32", number: 32, section: "centar", x: 240, y: 320, available: true },
  { id: "33", number: 33, section: "centar", x: 220, y: 360, available: true },
  { id: "34", number: 34, section: "centar", x: 200, y: 400, available: true },
  { id: "35", number: 35, section: "centar", x: 200, y: 440, available: true },
  { id: "36", number: 36, section: "centar", x: 200, y: 480, available: false },
  { id: "37", number: 37, section: "centar", x: 240, y: 400, available: true },
  { id: "38", number: 38, section: "centar", x: 240, y: 440, available: true },
  { id: "39", number: 39, section: "centar", x: 240, y: 480, available: true },
  { id: "40", number: 40, section: "centar", x: 240, y: 520, available: true },
  { id: "41", number: 41, section: "centar", x: 220, y: 560, available: true },
  { id: "42", number: 42, section: "centar", x: 240, y: 600, available: true },
  { id: "43", number: 43, section: "centar", x: 200, y: 640, available: true },

  // Desna zona (44-52)
  { id: "44", number: 44, section: "desna", x: 340, y: 260, available: true },
  { id: "45", number: 45, section: "desna", x: 380, y: 280, available: true },
  { id: "46", number: 46, section: "desna", x: 360, y: 320, available: true },
  { id: "47", number: 47, section: "desna", x: 400, y: 320, available: true },
  { id: "48", number: 48, section: "desna", x: 380, y: 360, available: false },
  { id: "49", number: 49, section: "desna", x: 380, y: 420, available: true },
  { id: "50", number: 50, section: "desna", x: 360, y: 480, available: true },
  { id: "51", number: 51, section: "desna", x: 400, y: 480, available: true },
  { id: "52", number: 52, section: "desna", x: 380, y: 540, available: true },

  // Glavni šank (53-64)
  { id: "53", number: 53, section: "glavni-sank", x: 440, y: 260, available: true },
  { id: "54", number: 54, section: "glavni-sank", x: 440, y: 340, available: true },
  { id: "55", number: 55, section: "glavni-sank", x: 440, y: 400, available: true },
  { id: "56", number: 56, section: "glavni-sank", x: 440, y: 460, available: true },
  { id: "57", number: 57, section: "glavni-sank", x: 440, y: 540, available: true },
  { id: "58", number: 58, section: "glavni-sank", x: 500, y: 260, available: true },
  { id: "59", number: 59, section: "glavni-sank", x: 500, y: 320, available: false },
  { id: "60", number: 60, section: "glavni-sank", x: 500, y: 360, available: true },
  { id: "61", number: 61, section: "glavni-sank", x: 500, y: 420, available: true },
  { id: "62", number: 62, section: "glavni-sank", x: 500, y: 480, available: true },
  { id: "63", number: 63, section: "glavni-sank", x: 500, y: 540, available: true },
  { id: "64", number: 64, section: "glavni-sank", x: 500, y: 600, available: true },
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
    setStep("table");
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
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-bronze drop-shadow-lg animate-fade-in">
            Rezervirajte svoj stol
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Odaberite stol ili VIP box i osigurajte sebi nezaboravnu večer!
          </p>
        </div>
      </section>

      {/* Reservation Section */}
      <section
        ref={reservationSection.ref}
        className={`py-16 px-4 transition-all duration-1000 ${reservationSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container mx-auto max-w-7xl">
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">Odaberite sektor</h2>
                <p className="text-muted-foreground">Kliknite na željeni sektor na tlocrtu ili odaberite iz liste</p>
              </div>

              {/* Event Info Banner */}
              {eventInfo && (
                <div className="mb-8 max-w-2xl mx-auto bg-primary/10 border-2 border-primary/30 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-2">{eventInfo.eventTitle}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {eventInfo.eventDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {eventInfo.eventTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-4 h-4" />
                          {eventInfo.eventCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Dropdown */}
              <div className="mb-8 max-w-md mx-auto">
                <Label>Odaberite iz liste</Label>
                <Select value={selectedSection} onValueChange={(value) => handleSectionSelect(value as Section)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Odaberite sektor..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name} ({tables.filter((t) => t.section === section.id && t.available).length} dostupno)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interactive Floor Plan - All Sections */}
              <div className="bg-card rounded-lg border-2 border-border p-4 mb-8">
                <svg viewBox="0 0 750 480" className="w-full h-auto max-h-[600px]">
                  {/* Background */}
                  <rect width="750" height="480" fill="hsl(var(--background))" />

                  {/* Rotated layout container */}
                  <g transform="translate(375, 240) rotate(90) translate(-300, -315)">
                    {/* Section Background Areas - Clickable */}
                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("ulaz")}
                      onMouseEnter={() => setHoveredSection("ulaz")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="70"
                        y="60"
                        width="200"
                        height="150"
                        fill={
                          selectedSection === "ulaz" || hoveredSection === "ulaz"
                            ? sections[0].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "ulaz" ? 0.4 : hoveredSection === "ulaz" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "ulaz" || hoveredSection === "ulaz"
                            ? sections[0].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "ulaz" ? 3 : hoveredSection === "ulaz" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("bina")}
                      onMouseEnter={() => setHoveredSection("bina")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="330"
                        y="60"
                        width="200"
                        height="150"
                        fill={
                          selectedSection === "bina" || hoveredSection === "bina"
                            ? sections[1].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "bina" ? 0.4 : hoveredSection === "bina" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "bina" || hoveredSection === "bina"
                            ? sections[1].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "bina" ? 3 : hoveredSection === "bina" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("lijevi-sank")}
                      onMouseEnter={() => setHoveredSection("lijevi-sank")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="90"
                        y="260"
                        width="60"
                        height="370"
                        fill={
                          selectedSection === "lijevi-sank" || hoveredSection === "lijevi-sank"
                            ? sections[2].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "lijevi-sank" ? 0.4 : hoveredSection === "lijevi-sank" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "lijevi-sank" || hoveredSection === "lijevi-sank"
                            ? sections[2].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "lijevi-sank" ? 3 : hoveredSection === "lijevi-sank" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("centar")}
                      onMouseEnter={() => setHoveredSection("centar")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="160"
                        y="260"
                        width="100"
                        height="370"
                        fill={
                          selectedSection === "centar" || hoveredSection === "centar"
                            ? sections[3].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "centar" ? 0.4 : hoveredSection === "centar" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "centar" || hoveredSection === "centar"
                            ? sections[3].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "centar" ? 3 : hoveredSection === "centar" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("desna")}
                      onMouseEnter={() => setHoveredSection("desna")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="275"
                        y="220"
                        width="135"
                        height="400"
                        fill={
                          selectedSection === "desna" || hoveredSection === "desna"
                            ? sections[4].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "desna" ? 0.4 : hoveredSection === "desna" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "desna" || hoveredSection === "desna"
                            ? sections[4].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "desna" ? 3 : hoveredSection === "desna" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSectionSelect("glavni-sank")}
                      onMouseEnter={() => setHoveredSection("glavni-sank")}
                      onMouseLeave={() => setHoveredSection("")}
                    >
                      <rect
                        x="425"
                        y="240"
                        width="95"
                        height="380"
                        fill={
                          selectedSection === "glavni-sank" || hoveredSection === "glavni-sank"
                            ? sections[5].color
                            : "hsl(var(--muted))"
                        }
                        opacity={selectedSection === "glavni-sank" ? 0.4 : hoveredSection === "glavni-sank" ? 0.3 : 0.1}
                        stroke={
                          selectedSection === "glavni-sank" || hoveredSection === "glavni-sank"
                            ? sections[5].color
                            : "hsl(var(--border))"
                        }
                        strokeWidth={selectedSection === "glavni-sank" ? 3 : hoveredSection === "glavni-sank" ? 2 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* All Tables - rotated circles but upright text */}
                    {tables.map((table) => {
                      const sectionColor = sections.find((s) => s.id === table.section)?.color || "#666";
                      const isInSelectedSection = selectedSection === table.section;
                      const isInHoveredSection = hoveredSection === table.section;

                      return (
                        <g key={table.id} className="pointer-events-none">
                          <circle
                            cx={table.x}
                            cy={table.y}
                            r={isInSelectedSection || isInHoveredSection ? 20 : 16}
                            fill={
                              !table.available
                                ? "hsl(var(--muted))"
                                : isInSelectedSection || isInHoveredSection
                                  ? sectionColor
                                  : "hsl(var(--card))"
                            }
                            stroke={isInSelectedSection || isInHoveredSection ? sectionColor : "hsl(var(--border))"}
                            strokeWidth={isInSelectedSection || isInHoveredSection ? 3 : 2}
                            opacity={!table.available ? 0.5 : isInSelectedSection || isInHoveredSection ? 1 : 0.8}
                            className="transition-all duration-300"
                          />
                          <text
                            x={table.x}
                            y={table.y + 5}
                            textAnchor="middle"
                            fill={isInSelectedSection || isInHoveredSection ? "white" : "hsl(var(--foreground))"}
                            fontSize="11"
                            fontWeight="bold"
                            opacity={isInSelectedSection || isInHoveredSection ? 1 : 0.6}
                            className="pointer-events-none"
                            transform={`rotate(-90, ${table.x}, ${table.y})`}
                          >
                            {table.number}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* Section Labels - positioned for horizontal layout */}
                  <text
                    x="700"
                    y="270"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                    transform="rotate(90, 700, 270)"
                  >
                    ULAZ
                  </text>
                  <text
                    x="630"
                    y="380"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                    transform="rotate(90, 630, 380)"
                  >
                    BINA
                  </text>
                  <text
                    x="375"
                    y="35"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    DJ
                  </text>
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

              {selectedSection && (
                <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8 text-center">
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

              <div className="flex gap-4">
                <Button onClick={handleContinue} size="lg" className="flex-1" disabled={!selectedSection}>
                  Nastavi na odabir stola
                </Button>
              </div>

              <div className="mt-12 bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-3 text-primary">Kontakt za rezervacije</h3>
                <p className="text-sm text-muted-foreground">
                  Za direktne rezervacije nazovite: <span className="text-primary font-semibold">+387 63 267 715</span>{" "}
                  ili <span className="text-primary font-semibold">+387 63 196 490</span>
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Table Selection */}
          {step === "table" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  {sections.find((s) => s.id === selectedSection)?.name}
                </h2>
                <p className="text-muted-foreground">Odaberite željeni stol</p>
              </div>

              {/* Interactive Floor Plan */}
              <div className="bg-card rounded-lg border-2 border-border p-4 mb-8">
                <svg viewBox="0 0 750 480" className="w-full h-auto max-h-[600px]">
                  {/* Background */}
                  <rect width="750" height="480" fill="hsl(var(--background))" />

                  {/* Rotated layout container */}
                  <g transform="translate(375, 240) rotate(90) translate(-300, -315)">
                    {/* Section Background Areas */}
                    <g>
                      <rect
                        x="70"
                        y="60"
                        width="200"
                        height="150"
                        fill={selectedSection === "ulaz" ? sections[0].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "ulaz" ? 0.4 : 0.1}
                        stroke={selectedSection === "ulaz" ? sections[0].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "ulaz" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g>
                      <rect
                        x="330"
                        y="60"
                        width="200"
                        height="150"
                        fill={selectedSection === "bina" ? sections[1].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "bina" ? 0.4 : 0.1}
                        stroke={selectedSection === "bina" ? sections[1].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "bina" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g>
                      <rect
                        x="90"
                        y="260"
                        width="60"
                        height="370"
                        fill={selectedSection === "lijevi-sank" ? sections[2].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "lijevi-sank" ? 0.4 : 0.1}
                        stroke={selectedSection === "lijevi-sank" ? sections[2].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "lijevi-sank" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g>
                      <rect
                        x="160"
                        y="260"
                        width="100"
                        height="370"
                        fill={selectedSection === "centar" ? sections[3].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "centar" ? 0.4 : 0.1}
                        stroke={selectedSection === "centar" ? sections[3].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "centar" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g>
                      <rect
                        x="275"
                        y="220"
                        width="135"
                        height="380"
                        fill={selectedSection === "desna" ? sections[4].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "desna" ? 0.4 : 0.1}
                        stroke={selectedSection === "desna" ? sections[4].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "desna" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    <g>
                      <rect
                        x="425"
                        y="240"
                        width="95"
                        height="380"
                        fill={selectedSection === "glavni-sank" ? sections[5].color : "hsl(var(--muted))"}
                        opacity={selectedSection === "glavni-sank" ? 0.4 : 0.1}
                        stroke={selectedSection === "glavni-sank" ? sections[5].color : "hsl(var(--border))"}
                        strokeWidth={selectedSection === "glavni-sank" ? 3 : 1}
                        rx="8"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* All Tables */}
                    {tables.map((table) => {
                      const sectionColor = sections.find((s) => s.id === table.section)?.color || "#666";
                      const isSelected = selectedTable?.id === table.id;
                      const isInSelectedSection = table.section === selectedSection;

                      return (
                        <g key={table.id}>
                          <circle
                            cx={table.x}
                            cy={table.y}
                            r={isSelected ? 22 : isInSelectedSection ? 20 : 16}
                            fill={
                              !table.available
                                ? "hsl(var(--muted))"
                                : isSelected
                                  ? sectionColor
                                  : isInSelectedSection
                                    ? sectionColor
                                    : "hsl(var(--card))"
                            }
                            stroke={isSelected || isInSelectedSection ? sectionColor : "hsl(var(--border))"}
                            strokeWidth={isSelected ? 3 : isInSelectedSection ? 2 : 1}
                            className="cursor-pointer transition-all duration-200"
                            onClick={() => handleTableSelect(table)}
                            opacity={!table.available ? 0.5 : isSelected || isInSelectedSection ? 1 : 0.6}
                          />
                          <text
                            x={table.x}
                            y={table.y + 5}
                            textAnchor="middle"
                            fill={isSelected || isInSelectedSection ? "white" : "hsl(var(--foreground))"}
                            fontSize="12"
                            fontWeight="bold"
                            className="pointer-events-none"
                            transform={`rotate(-90, ${table.x}, ${table.y})`}
                          >
                            {table.number}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* Section Labels - positioned for horizontal layout */}
                  <text
                    x="700"
                    y="270"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform="rotate(90, 700, 270)"
                  >
                    ULAZ
                  </text>
                  <text
                    x="630"
                    y="380"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform="rotate(90, 630, 380)"
                  >
                    BINA
                  </text>
                  <text
                    x="375"
                    y="35"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    DJ
                  </text>
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-card border-2 border-border" />
                    <span>Dostupno</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: sections.find((s) => s.id === selectedSection)?.color }}
                    />
                    <span>Odabrano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted opacity-50" />
                    <span>Zauzeto</span>
                  </div>
                </div>
              </div>

              {selectedTable && (
                <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8 text-center">
                  <p className="text-lg font-semibold mb-2">
                    Odabrani stol: <span className="text-primary text-2xl">#{selectedTable.number}</span>
                  </p>
                  <p className="text-muted-foreground">
                    u sektoru {sections.find((s) => s.id === selectedTable.section)?.name}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="outline" size="lg" className="flex-1">
                  Nazad
                </Button>
                <Button onClick={handleContinue} size="lg" className="flex-1" disabled={!selectedTable}>
                  Nastavi
                </Button>
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

                {/* Date and Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Datum *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
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
                  <Button type="button" onClick={handleBack} variant="outline" size="lg" className="flex-1">
                    Nazad
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Rezerviraj
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

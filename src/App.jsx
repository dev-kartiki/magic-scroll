import { useState, useCallback, useEffect, useRef } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Timeline from "./components/Timeline";

// Sections
import SectionWrapper from "./components/sections/SectionWrapper";
import IntroSection from "./components/sections/IntroSection";
import PrefaceSection from "./components/sections/PrefaceSection";
import Era1976_1985 from "./components/sections/Era1976_1985";
import Era1985_1996 from "./components/sections/Era1985_1996";
import Era1996_2011 from "./components/sections/Era1996_2011";
import EventsSection from "./components/sections/EventsSection";
import CreditsSection from "./components/sections/CreditsSection";
import HeroSection from "./components/sections/HeroSection";
import Navbar from "./components/Navbar";

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [triggerZoom, setTriggerZoom] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const [timelineActive, setTimelineActive] = useState(false);
  const sectionRefs = useRef([]); // holds references to all sections

  const sections = [
    { id: "hero", label: "" },
    { id: "intro", label: "Intro" },
    { id: "preface", label: "Preface" },
    { id: "1976-1985", label: "1976–1985" },
    { id: "1985-1996", label: "1985–1996" },
    { id: "1996-2011", label: "1996–2011" },
    { id: "events", label: "Events" },
    { id: "credits", label: "Credits" },
  ];

  // Update active section based on visibility
  const handleVisible = useCallback(
    (id) => {
      const index = sections.findIndex((s) => s.id === id);
      if (index !== -1) setActiveSection(index);
    },
    [sections]
  );

  // Helper: zoom a section (mobile timeline)
  const zoomSection = (sectionId) => {
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      if (s.id === sectionId) {
        el.classList.add("section--zoomed");
        el.classList.remove("section--zoomed-out", "section--normal");
      } else {
        el.classList.add("section--zoomed-out");
        el.classList.remove("section--zoomed", "section--normal");
      }
    });
  };

  // Helper: reset all sections (desktop or timeline closed)
  const resetSections = () => {
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      el.classList.add("section--normal");
      el.classList.remove("section--zoomed", "section--zoomed-out");
    });
  };

  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // Zoom all sections to 0.65 when toggle activated
      sections?.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) el.style.transform = "scale(0.65)";
        el.style.transition = "transform 0.3s ease-out";
      });
    } else {
      // Reset zoom when toggle closed
      sections?.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) el.style.transform = "scale(1)";
        el.style.transition = "transform 0.3s ease-out";
      });
    }
  };

  // Zoom out all sections when mobile timeline opens
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMenuOpen && isMobile) {
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        el.classList.add("section--zoomed-out");
        el.classList.remove("section--zoomed", "section--normal");
      });
    } else {
      resetSections();
    }
  }, [timelineActive, isMenuOpen]);

  const handleSectionClick = (index) => {
    const section = sections[index];
    const target = document.getElementById(section.id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });

    const isMobileView = window.innerWidth < 768;

    if (isMobileView && timelineActive) {
      zoomSection(section.id); // Zoom clicked section, zoom out others
    } else {
      resetSections(); // Desktop: all sections normal
    }

    // Optional short animation effect
    setTriggerZoom(true);
    setTimeout(() => setTriggerZoom(false), 500);
  };

  const zoomInSection = (sectionId) => {
    zoomSection(sectionId);
  };

  return (
    <SmoothScroll>
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Navbar */}
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleToggleClick={handleToggleClick}
          timelineActive={timelineActive}
          setTimelineActive={setTimelineActive}
          sections={sections}
          sectionRefs={sectionRefs}
        />

        {/* Main content */}
        <div className="flex-1 md:grow overflow-x-hidden px-4 md:px-8">
          {sections.map((section, index) => (
            <SectionWrapper
              key={section.id}
              id={section.id}
              onVisible={handleVisible}
              isActive={activeSection === index}
              triggerZoom={triggerZoom}
              className="section" // ✅ important
              ref={(el) => (sectionRefs.current[index] = el)}
            >
              {section.id === "hero" && <HeroSection onSectionClick={zoomInSection} />}
              {section.id === "intro" && <IntroSection onSectionClick={zoomInSection} />}
              {section.id === "preface" && <PrefaceSection onSectionClick={zoomInSection} />}
              {section.id === "1976-1985" && <Era1976_1985 onSectionClick={zoomInSection} />}
              {section.id === "1985-1996" && <Era1985_1996 onSectionClick={zoomInSection} />}
              {section.id === "1996-2011" && <Era1996_2011 onSectionClick={zoomInSection} />}
              {section.id === "events" && <EventsSection onSectionClick={zoomInSection} />}
              {section.id === "credits" && <CreditsSection onSectionClick={zoomInSection} />}
            </SectionWrapper>
          ))}
        </div>

        {/* Timeline sidebar */}
        <div className="hidden md:block">
          <Timeline
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </div>

        {/* Mobile timeline overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end md:hidden"
            onClick={() => handleToggleClick()}
          >
            <div
              className="h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside timeline
            >
              <Timeline
                sections={sections}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                isMobile={true}
              />
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}

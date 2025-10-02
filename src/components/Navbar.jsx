import { useEffect, useState } from "react";
import { useTimeline } from "./TimelineContext";
import logo from '../assets/react.svg';

export default function Navbar({ isMenuOpen,  sections, sectionRefs, activeSection, handleToggleClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [bgColor, setBgColor] = useState("transparent");
  const { activeName } = useTimeline();

 useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setBgColor("transparent");
      return;
    }

    const handleScroll = () => {
      if (!sections?.length || !sectionRefs?.current) return;

      const scrollPos = window.scrollY + 60;
      let color = "transparent";

      sections.forEach((section, idx) => {
        const el = sectionRefs.current[idx];
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            color = section.bgColor || "white";
          }
        }
      });

      setBgColor(color);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, sectionRefs, isMobile]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{ backgroundColor: isMobile ? '#ffffff' : bgColor }}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4 relative">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>

        {isMobile && (
          <p className="absolute left-1/2 transform -translate-x-1/2 text-gray-700 font-medium">
            {sections?.[activeSection]?.label || activeName}
          </p>
        )}

        <button
          onClick={handleToggleClick}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-700 my-1 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 my-1 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 my-1 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
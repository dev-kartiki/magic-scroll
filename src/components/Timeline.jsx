import { useEffect, useRef, useState } from "react";
import TimelineItem from "./TimelineItem";
import { useTimeline } from "./TimelineContext";

export default function Timeline({ sections = [], activeSection = 0, onSectionClick = () => { }, isMobile, bgColor }) {
  const [fillHeight, setFillHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timelineRef = useRef(null);
  const sectionsHeightRef = useRef([]);
  const { activeName, isWhiteBgActive } = useTimeline();
  // Calculate section heights
  useEffect(() => {
    const calculateSectionHeights = () => {
      const heights = sections.map((section) => {
        const el = document.getElementById(section.id);
        return el ? el.offsetHeight : 0;
      });
      sectionsHeightRef.current = heights;
    };

    calculateSectionHeights();
    window.addEventListener("resize", calculateSectionHeights);
    return () => window.removeEventListener("resize", calculateSectionHeights);
  }, [sections, activeName]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const firstSection = document.getElementById(sections[0]?.id);
      const lastSection = document.getElementById(sections[sections.length - 1]?.id);

      if (!firstSection || !lastSection) return;

      const top = firstSection.offsetTop;
      const bottom = lastSection.offsetTop + lastSection.offsetHeight;

      const progress = Math.min(Math.max((scrollY + windowHeight / 2 - top) / (bottom - top), 0), 1);
      setFillHeight(progress * 100);
    };

    let rafId;
    const rafLoop = () => {
      handleScroll();
      rafId = requestAnimationFrame(rafLoop);
    };
    rafLoop();

    return () => cancelAnimationFrame(rafId);
  }, [sections, isDragging, activeName, isMobile]);

  // Zoom helper
  const zoomAllSections = (scale) => {
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        el.style.transform = `scale(${scale})`;
        el.style.transition = "transform 0.3s ease-out";
      }
    });
  };

  // Tap/click zoom for mobile/desktop
  const handleSectionClick = (index) => {
    const section = sections[index];
    const el = document.getElementById(section.id);
    if (!el) return;

    // Zoom clicked/tapped section
    el.style.transform = "scale(1.05)";
    el.style.transition = "transform 0.5s ease-out";

    // Reset others
    sections.forEach((s) => {
      if (s.id !== section.id) {
        const otherEl = document.getElementById(s.id);
        if (otherEl) otherEl.style.transform = window.innerWidth >= 768 ? "scale(1)" : "scale(0.65)";
      }
    });

    onSectionClick(index);
  };

  // Drag / Touch handlers
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    zoomAllSections(0.65); // temporarily zoom out while dragging
    document.body.style.userSelect = "none";
  };

  const handleDragMove = (e) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const progress = Math.min(Math.max(y / rect.height, 0), 1);

    setFillHeight(progress * 100);

    const firstSection = document.getElementById(sections[0]?.id);
    const lastSection = document.getElementById(sections[sections.length - 1]?.id);

    if (firstSection && lastSection) {
      const top = firstSection.offsetTop;
      const bottom = lastSection.offsetTop + lastSection.offsetHeight;
      const targetScroll = top + (bottom - top) * progress - window.innerHeight / 2;
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.style.userSelect = "";

    // Desktop: zoom active section
    if (window.innerWidth >= 768) {
      const currentProgress = fillHeight / 100;
      const activeIndex = Math.floor(currentProgress * sections.length);
      handleSectionClick(activeIndex);
    }
    // Mobile: leave all zoomed out (0.65) until tapped
    else {
      zoomAllSections(0.65);
    }
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    e.preventDefault();
    setIsDragging(true);
    zoomAllSections(0.65);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !timelineRef.current || !e.touches || e.touches.length === 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const y = e.touches[0].clientY - rect.top;
    const progress = Math.min(Math.max(y / rect.height, 0), 1);

    setFillHeight(progress * 100);

    const firstSection = document.getElementById(sections[0]?.id);
    const lastSection = document.getElementById(sections[sections.length - 1]?.id);

    if (firstSection && lastSection) {
      const top = firstSection.offsetTop;
      const bottom = lastSection.offsetTop + lastSection.offsetHeight;
      const targetScroll = top + (bottom - top) * progress - window.innerHeight / 2;
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    handleDragEnd();
  };

  // Attach mouse + touch listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, fillHeight, sections]);

  const totalHeight = sectionsHeightRef.current.reduce((sum, h) => sum + h, 0);
  let cumulativeHeight = 0;

  return (
    <aside className="w-56 flex-shrink-0  border-gray-200 pe-5 py-16 flex flex-col fixed right-0 top-0 bottom-0 z-10">
      <h3 className={`${isWhiteBgActive ? 'text-blue-500' : 'text-white'} text-sm self-end font-serif italic mb-12`}>{activeName}</h3>

      <nav
        ref={timelineRef}
        className="flex-1 relative min-h-0"
        onMouseDown={handleDragStart}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="relative h-full" onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {sections.map((section, index) => {
            const sectionHeight = sectionsHeightRef.current[index] || 0;
            const heightPercentage =
              totalHeight > 0 ? (sectionHeight / totalHeight) * 100 : 100 / sections.length;

            const dashStart = cumulativeHeight;
            cumulativeHeight += heightPercentage;

            const isActive = fillHeight >= dashStart;
            const fillInDash = Math.min(Math.max(fillHeight - dashStart, 0), heightPercentage);
            const dashFillPercentage =
              heightPercentage > 0 ? (fillInDash / heightPercentage) * 100 : 0;

            return (
              <TimelineItem
                key={section.id}
                section={section}
                isActive={isActive}
                isHovered={isHovered}
                heightPercentage={heightPercentage}
                dashFillPercentage={dashFillPercentage}
                onClick={() => handleSectionClick(index)}
                isMobile={isMobile}
                isDragging={isDragging}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

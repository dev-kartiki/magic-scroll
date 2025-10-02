// hooks/useWhiteBgObserver.js
import { useEffect, useRef } from "react";
import { useTimeline } from "../components/TimelineContext"; // adjust path

export function useWhiteBgObserver() {
  const ref = useRef(null);
  const { setIsWhiteBgActive } = useTimeline();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWhiteBgActive(entry.isIntersecting); // true if visible, false otherwise
      },
      { threshold: 0.3 } // adjust sensitivity
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [setIsWhiteBgActive]);

  return ref;
}

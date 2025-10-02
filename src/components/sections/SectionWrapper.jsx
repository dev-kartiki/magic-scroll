import { useEffect, useRef } from "react";

export default function SectionWrapper({ id, onVisible, activeId, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(id);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [id, onVisible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isActive = activeId === id;
    el.dataset.active = isActive;

    if (isActive) {
      el.style.transform = "scale(1.05)";
      el.style.transition =
        "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    } else {
      el.style.transform = "scale(1)";
      el.style.transition = "transform 0.4s ease-out";
    }
  }, [activeId, id]);

  return (
    <section
      id={id}
      ref={ref}
      data-active={false}
      className="
        min-h-screen w-full 
        flex flex-col items-center justify-center 
        px-0 sm:px-0 md:px-0 lg:px-0 
        
        text-center md:text-left
        will-change-transform
      "
    >
      <div className="w-full max-w-full">{children}</div>
    </section>
  );
}

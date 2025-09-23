import React, { useState, useEffect, useRef } from 'react';
import { steps } from '../../utilities/utils';
import DashedTrackProgress from '../DashedTrackProgress';

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [sectionClicked, setSectionClicked] = useState(false);
  const sections = ["Architecture", "UX Flows", "Deliverables"];
  const contentRef = useRef(null); // ref to wrap all scrollable content

  // Track active step on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2; // middle of viewport
      const stepIndex = sections.findIndex((id) => {
        const elem = document.getElementById(id);
        if (!elem) return false;
        const top = elem.offsetTop;
        const bottom = top + elem.offsetHeight;
        return scrollPos >= top && scrollPos < bottom;
      });
      if (stepIndex !== -1) setActiveStep(stepIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scale on mobile
  useEffect(() => {
    const handleResizeOrInit = () => {
      if (window.innerWidth <= 768) { // mobile breakpoint
        if (contentRef.current) {
          contentRef.current.style.transform = 'scale(1)';
          contentRef.current.style.transition = 'transform 0.3s ease'; // smooth reset
        }
      }
    };

    window.addEventListener('resize', handleResizeOrInit);
    handleResizeOrInit(); // run on mount

    return () => window.removeEventListener('resize', handleResizeOrInit);
  }, [sectionClicked]);

  return (
    <div className=" mt-4">
      <div className="row;">
        {/* Left: Sections */}
        <div
          ref={contentRef}
          onClick={() => setSectionClicked(!sectionClicked)} // to trigger zoom reset on mobile
          className="col-md-k9 mt-4 content-wrapper"
        >
          {sections.map((s, i) => (
            <section
              key={i}
              id={s}
              className="scroll-section m-4 border-white"
              style={{ minHeight: "100vh" }} // full screen sections
            >
              <p hidden>{s.toUpperCase()}</p>
              {steps[i]?.element}
            </section>
          ))}
        </div>

        {/* Right: Progress Bar */}
        {/* <aside className="col-md-3 d-flex justify-content-center align-items-center"> */}
          <DashedTrackProgress
            steps={sections.map((s) => ({ label: s }))}
            activeStep={activeStep}
            contentRef={contentRef} // pass ref for zoom animation
            hasScrollReset={sectionClicked} // trigger zoom reset
            onStepClick={(index, label) => {
              setActiveStep(index);
              document.getElementById(label)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        {/* </aside> */}
      </div>
    </div>
  );
};

export default Index;

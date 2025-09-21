import React, { useState, useEffect } from 'react'
import { steps } from '../../utilities/utils';
import DashedTrackProgress from '../DashedTrackProgress';

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sections = ["Architecture", "UX Flows", "Deliverables"];

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

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left: Sections */}
        <div className="col-md-9 mt-4">
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
        <aside className="col-md-3 d-flex justify-content-center align-items-center">
          <DashedTrackProgress
            steps={sections.map((s) => ({ label: s }))}
            activeStep={activeStep}
            onStepClick={(index, label) => {
              setActiveStep(index);
              document.getElementById(label)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </aside>
      </div>
    </div>
  );
};

export default Index;

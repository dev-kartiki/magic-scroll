import React, { useRef, useState, useEffect } from "react";

const DashedTrackProgress = ({
  steps = [],
  activeStep = 0,
  width = 8,
  dashLength = 50,
  gapLength = 2,
  color = "#1bef8c",
  bgColor = "#ddd",
  onStepClick
}) => {
  
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [trackHeight, setTrackHeight] = useState(300); // default height

  useEffect(() => {
    // Adjust height dynamically based on viewport minus header/footer
    const updateHeight = () => {
      const headerHeight = 90; // adjust if your header is different
      const footerHeight = 90; // adjust if your footer is different
      const availableHeight = window.innerHeight - headerHeight - footerHeight - 100; // 40px padding buffer
      setTrackHeight(Math.max(200, availableHeight)); // minimum height = 200
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const stepHeight = trackHeight / steps.length;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const stepIndex = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(y / stepHeight))
    );
    onStepClick(stepIndex, steps[stepIndex].label);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className="dashed-progress-wrapper mt-4"
    >
      {steps[activeStep]?.label && <p className="progress-title text-light">{steps[activeStep]?.label}</p>}

      <div className="progress-container">
        <svg width={77} height={trackHeight}>
          {/* Full dashed track */}
          <line
            x1={75} // center track in middle of SVG
            y1={0}
            x2={75}
            y2={trackHeight}
            stroke={bgColor}
            strokeWidth={width}
            strokeDasharray={`${dashLength},${gapLength}`}
            strokeLinecap="butt"
            className="dashed-track"
          />

          {/* Steps with labels */}
          {steps.map((step, index) => {
            const y1 = index * stepHeight;
            const y2 = (index + 1) * stepHeight;
            const textY = y1 + stepHeight / 2; // center label vertically
            const isActive = index <= activeStep;

            return (
              <React.Fragment key={index}>
                {/* Progress line (only if active) */}
                {isActive && (
                  <line
                    className="progress-line"
                    x1={75}
                    y1={y1}
                    x2={75}
                    y2={y2}
                    stroke={color}
                    strokeWidth={width}
                    strokeLinecap="butt"
                  />
                )}

                {/* Label on LEFT */}
                <text
                  x={65} // left side of the line
                  y={textY}
                  fill={isActive ? color : "#999"}
                  fontSize="12"
                  fontWeight={isActive ? "bold" : "normal"}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="step-label"
                  style={{
                    fontFamily: "sans-serif",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                  onClick={() => onStepClick(index, step.label)}
                >
                  {step.label || `Step ${index + 1}`}
                </text>
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DashedTrackProgress;

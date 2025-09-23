import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Menu } from "lucide-react";

const DashedTrackProgress = ({
  steps = [],
  activeStep = 0,
  width = 8,
  dashLength = 50,
  gapLength = 2,
  color = "#1bef8c",
  bgColor = "#ddd",
  onStepClick,
  contentRef,
  hasScrollReset,
}) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [trackHeight, setTrackHeight] = useState(300);
  const [isOpen, setIsOpen] = useState(false);

  // Update track height
  useEffect(() => {
    hasScrollReset && setIsOpen(false); // close on mobile if content clicked
    const updateHeight = () => {
      const headerHeight = 90;
      const footerHeight = 90;
      const availableHeight = window.innerHeight - headerHeight - footerHeight - 100;
      setTrackHeight(Math.max(200, availableHeight));
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [hasScrollReset]);

  const stepHeight = trackHeight / steps.length;

  // Animate thumb
  useEffect(() => {
    if (!isDragging && thumbRef.current) {
      const targetY = activeStep * stepHeight + stepHeight / 2;
      gsap.to(thumbRef.current, { duration: 0.4, attr: { cy: targetY }, ease: "power2.out" });
    }
  }, [activeStep, stepHeight, isDragging]);

  // Zoom effect
  useEffect(() => {
    if (!contentRef?.current) return;

    const scaleValue = isDragging || isOpen ? 0.65 : 1;

    gsap.to(contentRef.current, {
      scale: scaleValue,
      transformOrigin: "top center",
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isDragging, isOpen, contentRef]);

  // Helpers
  const getClientY = (e) => {
    if (!e) return 0;
    return e.touches ? e.touches[0].clientY : e.clientY;
  };

  //  Dragging
  const startDrag = (e) => {
    if (e.type === "touchstart") e.preventDefault(); // fix passive warning
    setIsDragging(true);
  };

  const moveDrag = (e) => {
    if (!isDragging) return;
    const rect = trackRef.current.getBoundingClientRect();
    const y = getClientY(e) - rect.top;
    const clampedY = Math.min(trackHeight, Math.max(0, y));

    gsap.to(thumbRef.current, { duration: 0.1, attr: { cy: clampedY }, ease: "power2.out" });
  };

  const endDrag = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const rect = trackRef.current.getBoundingClientRect();
    const y = getClientY(e) - rect.top;
    const stepIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(y / stepHeight)));
    const targetY = stepIndex * stepHeight + stepHeight / 2;

    gsap.to(thumbRef.current, { duration: 0.2, attr: { cy: targetY }, ease: "power2.out" });
    onStepClick(stepIndex, steps[stepIndex].label);
  };

  // Attach drag listeners
  useEffect(() => {
    if (!trackRef.current) return;

    const trackEl = trackRef.current;

    const touchStartHandler = (e) => startDrag(e);
    const mouseDownHandler = (e) => startDrag(e);

    trackEl.addEventListener("touchstart", touchStartHandler, { passive: false });
    trackEl.addEventListener("mousedown", mouseDownHandler);

    return () => {
      trackEl.removeEventListener("touchstart", touchStartHandler);
      trackEl.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", moveDrag);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchmove", moveDrag, { passive: false });
      window.addEventListener("touchend", endDrag);
    } else {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    }
    return () => {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [isDragging]);

  // Jump to step on click
  const jumpToStep = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const y = getClientY(e) - rect.top;
    const stepIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(y / stepHeight)));
    const targetY = stepIndex * stepHeight + stepHeight / 2;

    gsap.to(thumbRef.current, { duration: 0.2, attr: { cy: targetY }, ease: "power2.out" });
    onStepClick(stepIndex, steps[stepIndex].label);
  };

  const handleTrackDown = (e) => {
    jumpToStep(e);

    const moveHandler = (moveEvent) => jumpToStep(moveEvent);
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", upHandler);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <nav className="d-flex justify-content-between d-md-none w-25 btn btn-dark position-fixed"
        style={{ top: "1rem", right: "1rem", zIndex: 1100 }}
      >
        <h1>
          {steps[activeStep]?.label && (
            <p className="progress-title text-light">{steps[activeStep]?.label}</p>
          )}
        </h1>
        <button
          className={`d-block d-md-none btn btn-dark position-fixed`}
          style={{ top: "1rem", right: "1rem", zIndex: 1100 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Menu size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* Progress bar */}
      <div
        ref={trackRef}
        onMouseDown={handleTrackDown}
        onTouchStart={handleTrackDown}
        className={`dashed-progress-wrapper mt-4 ${isOpen ? "d-block" : "d-none d-md-block"}`}
      >
        {steps[activeStep]?.label && (
          <p className="progress-title text-light">{steps[activeStep]?.label}</p>
        )}

        <div className="progress-container">
          <svg width={77} height={trackHeight}>
            <line
              x1={75}
              y1={0}
              x2={75}
              y2={trackHeight}
              stroke={bgColor}
              strokeWidth={width}
              strokeDasharray={`${dashLength},${gapLength}`}
              strokeLinecap="butt"
            />
            {steps.map((step, index) => {
              const y1 = index * stepHeight;
              const y2 = (index + 1) * stepHeight;
              const textY = y1 + stepHeight / 2;
              const isActive = index <= activeStep;

              return (
                <React.Fragment key={index}>
                  {isActive && <line x1={75} y1={y1} x2={75} y2={y2} stroke={color} strokeWidth={width} />}
                  <text
                    x={65}
                    y={textY}
                    fill={isActive ? color : "#999"}
                    fontSize="12"
                    fontWeight={isActive ? "bold" : "normal"}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    style={{ fontFamily: "sans-serif", cursor: "pointer", userSelect: "none" }}
                    onClick={() => onStepClick(index, step.label)}
                  >
                    {step.label || `Step ${index + 1}`}
                  </text>
                </React.Fragment>
              );
            })}
            <circle
              ref={thumbRef}
              cx={75}
              cy={activeStep * stepHeight + stepHeight / 2}
              r={width * 2}
              fill="transparent"
              style={{ cursor: "grab" }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DashedTrackProgress;

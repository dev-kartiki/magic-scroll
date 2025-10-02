import { useEffect } from "react";
import { useTimeline } from "./TimelineContext";

export default function TimelineItem({
  section,
  isActive,
  isHovered,
  heightPercentage,
  dashFillPercentage,
  onClick,
  isMobile,
  timelineActive,
  isDragging
}) {
  const { setActiveName, isWhiteBgActive } = useTimeline();
  const gapSize = 2;

  useEffect(() => {
    setActiveName(section.label);
  }, [isActive, section.label]);

  const showEffects = isHovered || timelineActive || isMobile;

 // Text color logic
let textColor;
if (isDragging) {
  // Keep color fixed while dragging
  textColor = "text-blue-500 font-medium";
} else {
  if (!isActive) textColor = "text-gray-400";
  else textColor = isMobile || isWhiteBgActive ? "text-blue-500 font-medium" : "text-white";
}

// Bar color logic
let barColor;
if (isDragging) {
  // Keep bar color fixed while dragging
  barColor = "bg-blue-500";
} else {
  barColor = isMobile ? "bg-blue-500" : isWhiteBgActive ? "bg-blue-500" : "bg-white";
}


  return (
    <li
      className="relative cursor-pointer pointer-events-auto"
      style={{ height: `${heightPercentage}%` }}
      onClick={onClick}
    >
      {/* Label */}
      <span
        className={`absolute right-8 top-1/2 -translate-y-1/2 text-sm whitespace-nowrap text-right overflow-hidden overflow-ellipsis max-w-[100px]
          transition-opacity duration-150 ${showEffects ? "opacity-100" : "opacity-0"} ${textColor}`}
      >
        {section?.id !== "hero" && (section.label || section.id)}
      </span>

      {/* Background static bar */}
      <div
        className="absolute right-0 bg-gray-300 transition-all ease-out duration-150"
        style={{
          width: showEffects ? "8px" : "2px",
          top: `${gapSize}px`,
          bottom: `${gapSize}px`,
        }}
      ></div>

      {/* Foreground active bar */}
      <div
        className={`absolute right-0 ${barColor} transition-all ease-out duration-150`}
        style={{
          width: showEffects ? "8px" : "2px",
          top: `${gapSize}px`,
          height: `calc(${dashFillPercentage}% - ${gapSize * 2}px)`,
        }}
      ></div>
    </li>
  );
}

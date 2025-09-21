import React, { useState } from "react";

const Architecture = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      id: "input",
      title: "Input Layer",
      subtitle: "Event Capture",
      description:
        "Captures and processes all user interaction events across input methods",
      color: "#667eea",
      icon: "🎯",
      inputs: ["Wheel Events", "Touch Gestures", "Drag Actions", "Keyboard Input"],
      techDetails: ["Event listeners", "Input validation", "Gesture recognition"],
    },
    {
      id: "sync",
      title: "Sync Layer",
      subtitle: "Progress Normalization",
      description: "Normalizes all input types to a unified progress value",
      color: "#f093fb",
      icon: "⚡",
      inputs: ["Raw Events", "Delta Values", "Position Data", "Timing Info"],
      techDetails: ["Smoothing algorithms", "Boundary handling", "State management"],
    },
    {
      id: "render",
      title: "Render Layer",
      subtitle: "Visual Updates",
      description: "Maps normalized progress to visual elements and viewport updates",
      color: "#4facfe",
      icon: "🎨",
      inputs: ["Progress 0-1", "Animation Frame", "DOM Updates", "Style Changes"],
      techDetails: ["requestAnimationFrame", "DOM manipulation", "CSS transforms"],
    },
  ];

  return (
    <div className="architecture-wrapper text-light border-light ">
      <h2 className="text-center mb-3">Architecture</h2>
      <p className="text-center small mb-4">
        Three-layer pipeline: Input → Sync → Render
      </p>

      <div className="layers-container">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`layer-card ${activeLayer === index ? "active" : "inactive"}`}
            style={{ borderColor: layer.color }}
            onClick={() => setActiveLayer(index)}
          >
            <div className="layer-header">
              <div className="layer-icon" style={{ background: layer.color }}>
                {layer.icon}
              </div>
              <div>
                <h5 className="mb-1">{layer.title}</h5>
                <small>{layer.subtitle}</small>
              </div>
            </div>
            <div className="layer-content">
              <p className="small">{layer.description}</p>
              <strong>Inputs:</strong>
              <ul className="small">
                {layer.inputs.map((input, i) => (
                  <li key={i}>{input}</li>
                ))}
              </ul>
              <strong>Implementation:</strong>
              <ul className="small mb-0">
                {layer.techDetails.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="benefits-container">
        <div className="benefit">🎯 Clean Separation</div>
        <div className="benefit">🔄 Consistent Logic</div>
        <div className="benefit">⚡ Performance</div>
        <div className="benefit">🛡️ Cross-Platform</div>
      </div>
    </div>
  );
};

export default Architecture;

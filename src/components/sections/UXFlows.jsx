import React, { useState } from "react";

const UXFlows = () => {
  const [activeFlow, setActiveFlow] = useState(0);

  const flows = [
    {
      id: "gestures",
      title: "Scroll Gestures",
      subtitle: "Wheel • Trackpad • Touch",
      description: "Natural scrolling with mouse wheel, trackpad gestures, and touch interactions",
      icon: "👆",
      color: "#667eea",
      demo: "🖱️ → 📜",
      features: ["Mouse wheel support", "Trackpad gestures", "Touch scrolling", "Momentum physics"],
    },
    {
      id: "clicks",
      title: "Track Clicks",
      subtitle: "Jump to Position",
      description: "Click anywhere on the scrollbar track to instantly jump to that position",
      icon: "🎯",
      color: "#f093fb",
      demo: "👆 → ⚡",
      features: ["Instant positioning", "Visual feedback", "Smooth transitions", "Precise targeting"],
    },
    {
      id: "drags",
      title: "Handle Drags",
      subtitle: "Continuous Updates",
      description: "Drag the scrollbar handle for real-time updates with perfect synchronization",
      icon: "🔄",
      color: "#4facfe",
      demo: "✋ → 🔄",
      features: ["Real-time updates", "Smooth dragging", "Visual indicators", "Perfect sync"],
    },
  ];

  return (
    <div className="uxflows-wrapper p-3 text-white">
      <h2 className="text-center mb-3 ">UX Flows</h2>
      <p className="text-center small mb-4 ">
        Three seamless interaction patterns synchronized with viewport content
      </p>

      <div className="flows-container">
        {flows.map((flow, index) => (
          <div
            key={flow.id}
            className={`flow-card ${activeFlow === index ? "active" : "inactive"}`}
            style={{ borderColor: flow.color }}
            onClick={() => setActiveFlow(index)}
          >
            <div className="flow-header">
              <div className="flow-icon" style={{ background: flow.color }}>
                {flow.icon}
              </div>
              <div>
                <h5 className="mb-1">{flow.title}</h5>
                <small>{flow.subtitle}</small>
              </div>
            </div>

            <div className="flow-content">
              <p className="small">{flow.description}</p>
              <div className="flow-demo">{flow.demo}</div>
              <ul className="feature-list">
                {flow.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flow-indicators mt-3 d-flex justify-content-center gap-2">
        {flows.map((_, i) => (
          <div
            key={i}
            className={`indicator ${activeFlow === i ? "active" : ""}`}
            onClick={() => setActiveFlow(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default UXFlows;

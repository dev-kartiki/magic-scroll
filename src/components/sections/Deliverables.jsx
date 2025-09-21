import React, { useState } from "react";

const Deliverables = () => {
  const [activeCategory, setActiveCategory] = useState("stack");

  const deliverables = {
    stack: {
      title: "Technology Stack",
      icon: "⚛️",
      color: "#61dafb",
      items: [
        { name: "React + Hooks", description: "Modern React with hooks", tech: "React 18+" },
        { name: "SCSS/Styled Components", description: "Advanced styling", tech: "SCSS | styled-components" },
      ],
    },
    repo: {
      title: "Repository & Documentation",
      icon: "📚",
      color: "#f39c12",
      items: [
        { name: "GitHub Repository", description: "Clean commit history", tech: "Git + GitHub" },
        { name: "Setup Instructions", description: "Installation guide", tech: "README.md" },
        { name: "Documentation", description: "Comprehensive docs", tech: "Markdown" },
      ],
    },
    deployment: {
      title: "Live Deployment",
      icon: "🌐",
      color: "#00d4aa",
      items: [
        { name: "Vercel Hosting", description: "Fast, reliable hosting", tech: "Vercel" },
        { name: "Netlify Alternative", description: "Alternative hosting", tech: "Netlify" },
      ],
    },
    bonus: {
      title: "Bonus Enhancements",
      icon: "✨",
      color: "#667eea",
      items: [
        { name: "Easing Functions", description: "Smooth animations", tech: "d3-ease" },
        { name: "Theme Support", description: "Dark/light toggle", tech: "CSS Variables" },
        { name: "Code Comments", description: "Annotations explaining trade-offs", tech: "JSDoc" },
      ],
    },
  };

  return (
    <div className="deliverables-wrapper p-3 ">
      <h2 className="text-center mb-3">Deliverables</h2>
      <p className="text-center small mb-4">
        Project requirements, hosting options, and bonus enhancements
      </p>

      {/* Category Tabs */}
      <div className="category-tabs mb-4 d-flex flex-wrap justify-content-center gap-2">
        {Object.entries(deliverables).map(([key, category]) => (
          <button
            key={key}
            className={`category-tab ${activeCategory === key ? "active" : ""}`}
            onClick={() => setActiveCategory(key)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-title d-none d-md-inline">{category.title}</span>
          </button>
        ))}
      </div>

      {/* Category Items */}
      <div className="items-grid">
        {deliverables[activeCategory].items.map((item, index) => (
          <div key={index} className="deliverable-item">
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
              <div className="item-tech">{item.tech}</div>
            </div>
            <p className="item-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliverables;

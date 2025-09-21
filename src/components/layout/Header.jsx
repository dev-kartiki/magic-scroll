import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = ['Architecture', 'UX Flows', 'Deliverables'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'Architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'UX Flows', label: 'UX Flows', icon: '🔄' },
    { id: 'Deliverables', label: 'Deliverables', icon: '📦' }
  ];

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-glass">
        <nav className="navbar-content">
          <div className="logo-section">
            <div className="logo">
              🎯
            </div>
            <div>
              <h1 className="brand-text">ScrollSync</h1>
              <p className="brand-subtitle">Interactive Scrollbar Demo</p>
            </div>
          </div>

          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`nav-link text-light ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="d-none d-lg-inline">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
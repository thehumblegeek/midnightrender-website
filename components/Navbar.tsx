
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : ''
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <a href="#about" className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1">
        About Us
      </a>
      <a href="#work" className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1">
        Work
      </a>
      <a href="#contact" className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1">
        Contact Us
      </a>
    </nav>
  );
};

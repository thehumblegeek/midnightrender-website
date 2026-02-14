
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12">
      <a href="#about" className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-white transition-colors">
        About Us
      </a>
      <a href="#contact" className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-white transition-colors">
        Contact Us
      </a>
    </nav>
  );
};

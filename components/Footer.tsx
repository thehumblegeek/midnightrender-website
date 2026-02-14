
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-32 px-6 md:px-12 flex flex-col items-center text-center">
      <div className="mb-20">
        <img src="/logo.png" alt="MidnightRender.com" className="h-24 md:h-32 w-auto" />
        <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter text-white">
          AI VIDEOS THAT <br className="md:hidden" /> ACTUALLY GO VIRAL
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-32">
        <a href="#contact" className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity">Contact Us</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity">Join Our Team</a>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-gray-600 tracking-[0.3em] uppercase">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">X</a>
          <a href="#" className="hover:text-white transition-colors">IG</a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <span>© 2025 MIDNIGHTRENDER</span>
        </div>
      </div>
    </footer>
  );
};

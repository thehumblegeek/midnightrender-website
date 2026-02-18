
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-32 px-6 md:px-12 flex flex-col items-center text-center">
      <div className="mb-20">
        <a href="#top" aria-label="MidnightRender - Back to top">
          <img src="/logo.png" alt="MidnightRender.com" className="h-24 md:h-32 w-auto" />
        </a>
        <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter text-white">
          AI VIDEOS THAT <br className="md:hidden" /> ACTUALLY GO VIRAL
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-32">
        <a href="#contact" className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1">Contact Us</a>
        <a href="mailto:hello@midnightrender.com" className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1">Email Us</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1">Join Our Team</a>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-gray-600 tracking-[0.3em] uppercase">
        <div className="flex gap-6">
          <a href="#" aria-label="Follow us on X (Twitter)" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded" rel="noopener noreferrer">X</a>
          <a href="#" aria-label="Follow us on Instagram" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded" rel="noopener noreferrer">IG</a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Terms</a>
          <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded">Privacy</a>
          <span>© 2025 MIDNIGHTRENDER</span>
        </div>
      </div>
    </footer>
  );
};


import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative w-full h-screen overflow-hidden">
      {/* SEO: Hidden h1 for search engines */}
      <h1 className="sr-only">MidnightRender — Cinema Quality AI Video Production</h1>

      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/logo.png"
        className="absolute inset-0 w-full h-full object-cover animate-zoom"
      >
        <source src="/videos/1. Show Reel.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Text content - positioned at bottom-left */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <a href="#top" aria-label="MidnightRender - Back to top">
            <img src="/logo.png" alt="MidnightRender.com" className="h-20 md:h-32 w-auto mb-6" />
          </a>

          {/* Secondary CTA */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="#work"
              className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-white border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-black bg-white px-6 py-3 hover:bg-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

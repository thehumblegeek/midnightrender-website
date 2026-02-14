
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover animate-zoom"
      >
        <source src="/videos/1. Show Reel.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Text content - positioned at bottom-left like the reference */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <img src="/logo.png" alt="MidnightRender.com" className="h-20 md:h-32 w-auto mb-6" />
        </div>
      </div>
    </section>
  );
};

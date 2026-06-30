
import React, { useEffect } from 'react';

export const BookingSection: React.FC = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" className="relative py-24 px-6 md:px-16 bg-black min-h-[75vh] flex flex-col justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 grayscale opacity-100">
        <img
          src="/studio-bg.jpg"
          alt="Contact Background"
          className="w-full h-full object-cover object-[center_10%]"
        />
        {/* Deeper gradual backdrop gradient from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 via-black/40 to-transparent z-0" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white text-center md:text-left leading-[0.9]">
          Book a call with us!
        </h2>

        <p className="text-sm md:text-base text-white mb-10 text-center md:text-left font-bold">
          You can also reach us directly at{' '}
          <a
            href="mailto:davissagedas@gmail.com"
            className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            davissagedas@gmail.com
          </a>
          {' '}for Sage or{' '}
          <a
            href="mailto:angelsotofilm@gmail.com"
            className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            angelsotofilm@gmail.com
          </a>
          {' '}for Angel. We look forward to working with you!
        </p>

        {/* Calendly inline widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="calendly-inline-widget rounded-xl overflow-hidden shadow-2xl shadow-white/5 border border-white/5"
            data-url="https://calendly.com/portal404house"
            style={{ minWidth: '320px', height: '700px' }}
          />
          <div
            className="calendly-inline-widget rounded-xl overflow-hidden shadow-2xl shadow-white/5 border border-white/5"
            data-url="https://calendly.com/angelsoto"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
};

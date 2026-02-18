
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
    <section id="contact" className="py-32 px-6 md:px-12 bg-black min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 text-white text-center md:text-left">
          Book a call with us!
        </h2>

        <p className="text-lg text-gray-400 mb-16 text-center md:text-left">
          Or reach us directly at{' '}
          <a
            href="mailto:hello@midnightrender.com"
            className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            hello@midnightrender.com
          </a>
        </p>

        {/* Calendly inline widget */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/portal404house"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
};


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
        <h2 className="text-5xl md:text-9xl font-bold tracking-tighter mb-16 text-white text-center md:text-left">
          Book a call with us!
        </h2>

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

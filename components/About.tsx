
import React from 'react';

export const About: React.FC = () => {
    return (
        <section id="about" className="py-20 px-6 md:px-12 bg-black text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-8">
                    Tomorrow's content<br />
                    Rendered tonight
                </h2>
                <p className="text-lg md:text-2xl text-gray-400 mb-8 leading-relaxed">
                    Using advanced AI, we craft viral content for brands, artists, and studios that demand both spectacular visuals and rapid delivery.
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                    Quality content that scales.
                </p>
            </div>
        </section>
    );
};

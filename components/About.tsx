
import React from 'react';

export const About: React.FC = () => {
    return (
        <div id="about" className="bg-black text-left">
            <div className="max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                    Tomorrow's content<br />
                    Rendered tonight
                </h2>
                <div className="w-12 h-1 bg-white mb-6" />
                <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-xl font-medium">
                    Using advanced AI, we craft viral content for brands, artists, and studios that demand both spectacular visuals and rapid delivery.
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                    Quality content that scales.
                </p>
            </div>
        </div>
    );
};

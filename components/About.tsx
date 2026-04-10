
import React from 'react';

export const About: React.FC = () => {
    return (
        <div id="about" className="bg-black text-left">
            <div className="max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                    AI Video.<br />
                    Done Right.
                </h2>
                <div className="w-12 h-1 bg-white mb-6" />
                <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl font-medium">
                    Cinema-quality AI video production. Built for brands, artists, and studios that give a damn. We bring a filmmaker's eye to every frame — just without the six-week turnaround.
                </p>
            </div>
        </div>
    );
};

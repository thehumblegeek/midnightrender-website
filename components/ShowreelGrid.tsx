
import React from 'react';
import { ShowreelItem } from '../types';

interface ShowreelGridProps {
  items: ShowreelItem[];
  onSelectItem: (item: ShowreelItem) => void;
  generatingIds: string[];
}

export const ShowreelGrid: React.FC<ShowreelGridProps> = ({ items, onSelectItem, generatingIds }) => {
  return (
    <section id="work" className="w-full bg-black">
      <div className="flex flex-col">
        {items.map((item) => {
          const isGenerating = generatingIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`relative w-full aspect-video md:aspect-[21/9] overflow-hidden group border-b border-black ${isGenerating ? 'cursor-wait' : 'cursor-pointer'}`}
              onClick={() => !isGenerating && onSelectItem(item)}
            >


              {/* Background Video */}
              <video
                key={item.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1s] ease-out ${isGenerating ? 'opacity-30 blur-sm' : 'opacity-80'}`}
              >
                <source src={item.videoUrl} type={item.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
              </video>

              {/* Generation Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white animate-pulse">
                    Synthesizing Cinematic Data...
                  </p>
                </div>
              )}

              {/* Bottom Text Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                <div className="max-w-4xl">
                  <h4 className="text-2xl md:text-5xl font-black tracking-tighter text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-lg font-bold text-white/90">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* Play Button Indicator */}
              {!isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md p-6 rounded-full">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

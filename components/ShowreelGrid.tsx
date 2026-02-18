
import React, { useRef, useEffect, useState } from 'react';
import { ShowreelItem } from '../types';

interface ShowreelGridProps {
  items: ShowreelItem[];
  onSelectItem: (item: ShowreelItem) => void;
  generatingIds: string[];
}

const LazyVideo: React.FC<{
  item: ShowreelItem;
  isGenerating: boolean;
  onSelect: () => void;
}> = ({ item, isGenerating, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Pause video when out of view to save resources
          if (videoRef.current && hasLoaded) {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  useEffect(() => {
    if (isVisible && videoRef.current && !hasLoaded) {
      videoRef.current.load();
      setHasLoaded(true);
    }
    if (isVisible && videoRef.current && hasLoaded) {
      videoRef.current.play().catch(() => { });
    }
  }, [isVisible, hasLoaded]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isGenerating) onSelect();
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${item.title} — ${item.category}`}
      className={`relative w-full aspect-video md:aspect-[21/9] overflow-hidden group border-b border-black focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset ${isGenerating ? 'cursor-wait' : 'cursor-pointer'}`}
      onClick={() => !isGenerating && onSelect()}
      onKeyDown={handleKeyDown}
    >
      {/* Background Video — lazy loaded */}
      <video
        ref={videoRef}
        key={item.videoUrl}
        muted
        loop
        playsInline
        poster={item.thumbnailUrl}
        preload="none"
        className={`w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1s] ease-out ${isGenerating ? 'opacity-30 blur-sm' : 'opacity-80'}`}
      >
        {isVisible && <source src={item.videoUrl} type={item.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />}
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
        <div className="max-w-4xl flex justify-between items-end">
          <div>
            <h4 className="text-2xl md:text-5xl font-black tracking-tighter text-white mb-2">
              {item.title}
            </h4>
            <p className="text-sm md:text-lg font-bold text-white/90">
              {item.category}
            </p>
          </div>
          {/* View count badge */}
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white/50 hidden md:block">
            {item.year}
          </span>
        </div>
      </div>

      {/* Play Button Indicator */}
      {!isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-full">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export const ShowreelGrid: React.FC<ShowreelGridProps> = ({ items, onSelectItem, generatingIds }) => {
  return (
    <section id="work" className="w-full bg-black" aria-label="Video showreel">
      <div className="flex flex-col">
        {items.map((item) => (
          <LazyVideo
            key={item.id}
            item={item}
            isGenerating={generatingIds.includes(item.id)}
            onSelect={() => onSelectItem(item)}
          />
        ))}
      </div>
    </section>
  );
};

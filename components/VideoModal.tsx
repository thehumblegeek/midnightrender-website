
import React, { useEffect, useState } from 'react';
import { ShowreelItem } from '../types';
import { generateDirectorVision } from '../services/geminiService';

interface VideoModalProps {
  item: ShowreelItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {
  const [vision, setVision] = useState<string>('Generating director vision...');

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      generateDirectorVision(item.title, item.category).then(setVision);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl aspect-video bg-neutral-900 rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-white hover:text-gray-400 p-2 mix-blend-difference"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <video
          controls
          autoPlay
          className="w-full h-full object-cover"
        >
          <source src={item.videoUrl} type={item.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
        </video>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-gray-400">{item.category} • {item.year}</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">{item.title}</h3>
            <p className="text-sm md:text-base text-gray-300 font-light italic opacity-90">
              &ldquo;{vision}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { ShowreelItem } from '../types';
import { STREAM_URL_HD } from './CloudflareVideo';

interface VideoModalProps {
  item: ShowreelItem | null;
  onClose: () => void;
}

const ModalVideo: React.FC<{ videoId: string }> = ({ videoId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = STREAM_URL_HD(videoId);
    let hls: Hls | null = null;

    const savedVolume = parseFloat(localStorage.getItem('mr_volume') ?? '0.7');

    const playWithSound = () => {
      video.muted = false;
      video.volume = savedVolume;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    const saveVolume = () => {
      if (!video.muted) localStorage.setItem('mr_volume', String(video.volume));
    };

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', playWithSound, { once: true });
    } else if (Hls.isSupported()) {
      hls = new Hls({ maxBufferLength: 15, startLevel: 0 });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playWithSound);
    }

    video.addEventListener('volumechange', saveVolume);

    return () => {
      if (hls) hls.destroy();
      video.removeEventListener('volumechange', saveVolume);
    };
  }, [videoId]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      className="w-full h-full"
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl aspect-video bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-400 p-2 bg-black/50 rounded-full backdrop-blur-sm"
          aria-label="Close video"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.videoId ? (
          <ModalVideo videoId={item.videoId} />
        ) : item.videoUrl ? (
          <video
            controls
            autoPlay
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover"
          >
            <source src={item.videoUrl} type="video/mp4" />
          </video>
        ) : null}

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-gray-400">{item.category}</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2">{item.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

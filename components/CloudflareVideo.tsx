
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Hls from 'hls.js';

interface CloudflareVideoProps {
  videoId: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
  onCanPlay?: () => void;
  onTimeUpdate?: () => void;
  preload?: string;
}

// Load the 1080p-specific manifest directly — bypasses ABR startup (no 240p first segment).
// Cloudflare's clientBandwidthHint filters the manifest server-side to only high-quality renditions.
export const STREAM_URL = (videoId: string) =>
  `https://videodelivery.net/${videoId}/manifest/video.m3u8`;

// High-quality manifest: Cloudflare filters out low-res renditions server-side.
// hls.js can't pick 240p if it's not in the manifest — eliminates the ABR warmup issue.
export const STREAM_URL_HD = (videoId: string) =>
  `https://videodelivery.net/${videoId}/manifest/video.m3u8?clientBandwidthHint=10`;

export const IFRAME_URL = (videoId: string, autoplay = true) =>
  `https://iframe.videodelivery.net/${videoId}?autoplay=${autoplay}&muted=false&loop=false&controls=true`;

/**
 * CloudflareVideo — HLS background video for hero + showreel grid.
 * - Safari: native HLS via video.src
 * - Chrome/Firefox: hls.js attached to the video element
 * Use CloudflareEmbed for modal/full-screen playback instead.
 */
export const CloudflareVideo = forwardRef<HTMLVideoElement, CloudflareVideoProps>(
  (
    {
      videoId,
      className,
      autoPlay = false,
      muted = true,
      loop = false,
      playsInline = true,
      poster,
      onCanPlay,
      onTimeUpdate,
      preload = 'auto',
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      const video = internalRef.current;
      if (!video || !videoId) return;

      const src = STREAM_URL_HD(videoId); // Start at 1080p — no ABR warmup
      let hls: Hls | null = null;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari — native HLS support
        video.src = src;
      } else if (Hls.isSupported()) {
        // Chrome / Firefox — use hls.js
        // startLevel: last level = highest quality (only one rendition in HD manifest)
        hls = new Hls({
          maxBufferLength: 15,
          maxMaxBufferLength: 30,
          startLevel: 0, // HD manifest has one level — always highest
        });
        hls.loadSource(src);
        hls.attachMedia(video);
      }

      return () => {
        if (hls) hls.destroy();
      };
    }, [videoId]);

    return (
      <video
        ref={internalRef}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        preload={preload}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
      />
    );
  }
);

CloudflareVideo.displayName = 'CloudflareVideo';

/**
 * CloudflareEmbed — iframe embed for modal/full-playback.
 * Dead simple, works everywhere, no library needed.
 */
export const CloudflareEmbed: React.FC<{
  videoId: string;
  className?: string;
  autoplay?: boolean;
}> = ({ videoId, className, autoplay = true }) => (
  <iframe
    src={IFRAME_URL(videoId, autoplay)}
    className={className}
    style={{ border: 'none' }}
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowFullScreen
  />
);

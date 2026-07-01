
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import Hls from 'hls.js';
import { STREAM_URL_HD } from './CloudflareVideo';

interface VideoItem {
  id: string;
  title: string;
  category: 'Commercial' | 'Narrative';
  videoId: string;
  thumbnailUrl: string;
}

const COMMERCIAL_VIDEOS: VideoItem[] = [
  { id: 'c20', title: 'Smiles',                                  category: 'Commercial', videoId: '9862f57ea580d5fff34848be7d6ed6af', thumbnailUrl: 'https://videodelivery.net/9862f57ea580d5fff34848be7d6ed6af/thumbnails/thumbnail.jpg?time=0s' },
  { id: 'c14', title: 'Fizz Soda: Not Feeling Like Yourself?',  category: 'Commercial', videoId: '46de4c91ab7774cba031e7ee354c1593', thumbnailUrl: '/thumbnails/commercial/Fizz Soda Not Feeling Like Yourself.webp' },
  { id: 'c1',  title: "Denny's — Chroma Awards",           category: 'Commercial', videoId: '879f3b1889a6fffe6b64424b87db217d', thumbnailUrl: "/thumbnails/commercial/We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.webp" },
  { id: 'c2',  title: 'Atombit Minisite',                       category: 'Commercial', videoId: '669327b049cc82804a8d68a6467cfc16', thumbnailUrl: '/thumbnails/commercial/Atombit Minisite v2 (with dialogue).webp' },
  { id: 'c3',  title: 'Atombit Keynote',                        category: 'Commercial', videoId: '07d35ef35bde696e2c086474718f7dc0', thumbnailUrl: '/thumbnails/commercial/Atombit Keynote 1 Compilation (1).webp' },
  { id: 'c4',  title: 'Alpha Teaser',                           category: 'Commercial', videoId: 'dffaeb7e76e714d2a5a0fdd81c33ddd0', thumbnailUrl: '/thumbnails/commercial/Alpha Teaser.webp' },
  { id: 'c15', title: 'Cyclone: April Fools Day Spec Ad',       category: 'Commercial', videoId: 'bbcddb197428f16434c241f8f50a2877', thumbnailUrl: '/thumbnails/commercial/Cyclone April Fools Day Spec Ad.webp' },
  { id: 'c5',  title: 'Bionic Awards Opener',                   category: 'Commercial', videoId: 'ee921e6772a9047fda2f4810daea6553', thumbnailUrl: '/thumbnails/commercial/BIONIC AWARDS OPENER.webp' },
  { id: 'c16', title: 'Alpha: Official Book Trailer',           category: 'Commercial', videoId: '02c4762504f771e476bd3cd8c84b78be', thumbnailUrl: '/thumbnails/commercial/Alpha Official Book Trailer.webp' },
  { id: 'c17', title: 'AlterMe Brand Video',                    category: 'Commercial', videoId: '474fec8e418f13380db20375b5fbe87a', thumbnailUrl: '/thumbnails/commercial/AlterMe Brand Video.webp' },
  { id: 'c6',  title: 'Buckley Law',                            category: 'Commercial', videoId: '8b49d670b44204b8ab9b7b7f1f7bac79', thumbnailUrl: '/thumbnails/commercial/Buckley Law Commercial (Broadcast Ready).webp' },
  { id: 'c7',  title: 'Dead Clean',                             category: 'Commercial', videoId: '7294005979f5795d96e6028a89a08dec', thumbnailUrl: '/thumbnails/commercial/Dead Clean.webp' },
  { id: 'c8',  title: 'Liquor Brand Spec Ad',                   category: 'Commercial', videoId: '150d3e6299f71e33ae547420dd2ec1c3', thumbnailUrl: '/thumbnails/commercial/Field to Flasks Demo Ad.webp' },
  { id: 'c9',  title: "Moddy's",                                category: 'Commercial', videoId: '1a7ef2b2b168493d93f2f356775748ae', thumbnailUrl: "/thumbnails/commercial/For Moddy's!!.webp" },
  { id: 'c10', title: 'NoScrubs Laundry',                       category: 'Commercial', videoId: '08a8f1d567a7512904bfd3f1871611dc', thumbnailUrl: '/thumbnails/commercial/NoScrubs Laundry.webp' },
  { id: 'c11', title: 'Skunks',                                 category: 'Commercial', videoId: 'cbf254596f9046bebd4d2a66ad475b3e', thumbnailUrl: '/thumbnails/commercial/Skunks 1a.webp' },
  { id: 'c12', title: 'Teleios Website Hero',                   category: 'Commercial', videoId: '33856860b6552ed4d7d3935c9ca0c6c7', thumbnailUrl: '/thumbnails/commercial/Teleios Website Hero.webp' },
  { id: 'c19', title: 'Froya: You Are Worthy',                category: 'Commercial', videoId: '807af4802981df21418ccf66316ea333', thumbnailUrl: '/thumbnails/commercial/Froya_Ad_Landscape.webp' },
  { id: 'c13', title: 'Trading App Demo',                       category: 'Commercial', videoId: 'd3b8c4fa03d8b3e8a3f8e21577adbd3f', thumbnailUrl: '/thumbnails/commercial/Trading App Demo.webp' },
  { id: 'c18', title: 'PadSplit: A Better Way to Live',         category: 'Commercial', videoId: '4e3d321add8b2c496a2ef5b05d0337b7', thumbnailUrl: '/thumbnails/commercial/PadSplit A Better Way to Live.webp' },
  { id: 'c21', title: 'Blum & Co App Trailer',                 category: 'Commercial', videoId: '24f3f950e05c1bb632d9a3ccd2624374', thumbnailUrl: 'https://videodelivery.net/24f3f950e05c1bb632d9a3ccd2624374/thumbnails/thumbnail.jpg?time=0s' },
{ id: 'c23', title: 'Bad Driver',                            category: 'Commercial', videoId: '4fac975776cf6126ea30aa3a14af8bd2', thumbnailUrl: 'https://videodelivery.net/4fac975776cf6126ea30aa3a14af8bd2/thumbnails/thumbnail.jpg?time=0s' },
  { id: 'c24', title: 'Veteran Recruiter',                     category: 'Commercial', videoId: '2840f3ec170d4b8acce75c089058681c', thumbnailUrl: 'https://videodelivery.net/2840f3ec170d4b8acce75c089058681c/thumbnails/thumbnail.jpg?time=0.42s' },
  { id: 'c25', title: 'Official D&D One Shot Trailer',         category: 'Commercial', videoId: '666d003483b4d2ce4fbb45db87e9ae6b', thumbnailUrl: 'https://videodelivery.net/666d003483b4d2ce4fbb45db87e9ae6b/thumbnails/thumbnail.jpg?time=0s' },
];

const NARRATIVE_VIDEOS: VideoItem[] = [
  { id: 'n1',  title: 'AOT Live Action Trailer',     category: 'Narrative', videoId: '90c463b4e96fcf2c5ab9da52f88dbab4', thumbnailUrl: '/thumbnails/narrative/AOT Live action trailer.webp' },
  { id: 'n2',  title: 'Alpha Teaser',                category: 'Narrative', videoId: '5d90efa235aac32cffa03b5a29b409d7', thumbnailUrl: '/thumbnails/narrative/Alpha Teaser.webp' },
  { id: 'n3',  title: 'Blood & Violence',            category: 'Narrative', videoId: 'ff728e748ac94c1c1e286d43c1d9afc2', thumbnailUrl: '/thumbnails/narrative/Blood & Violence Teaser - Higgsfield Action Contest.webp' },
  { id: 'n4',  title: 'Burn',                        category: 'Narrative', videoId: 'c9298533a5a6c665ccf0fb79a314808e', thumbnailUrl: '/thumbnails/narrative/Burn.webp' },
  { id: 'n5',  title: 'Chinese Watercolor',          category: 'Narrative', videoId: '0b69784aba21dde2a2dfd111de2ac331', thumbnailUrl: '/thumbnails/narrative/Chinese water color.webp' },
  { id: 'n6',  title: 'Horror Experiments',          category: 'Narrative', videoId: 'b161683e94eb1355a45b5339c3a7d71d', thumbnailUrl: '/thumbnails/narrative/Horror experiments.webp' },
  { id: 'n7',  title: 'Monster Movie',               category: 'Narrative', videoId: '0f47ba73b39222e6547083c0611178bf', thumbnailUrl: '/thumbnails/narrative/Monster Movie.webp' },
  { id: 'n8',  title: 'Randomville',                 category: 'Narrative', videoId: 'b7b8dd2a38f5a54b26f4e4f82f5c8185', thumbnailUrl: '/thumbnails/narrative/Randomville Final 24fps.webp' },
  { id: 'n9',  title: 'Sage Footballer',             category: 'Narrative', videoId: '64d40a263c638c998e516fe672021a6e', thumbnailUrl: '/thumbnails/narrative/Sage Footballer.webp' },
  { id: 'n11', title: 'Surviving AI',                category: 'Narrative', videoId: 'a82e887e4799bf1cb1b280da7334679d', thumbnailUrl: '/thumbnails/narrative/Surviving AI snippet.webp' },
  { id: 'n12', title: 'Werewolf',                    category: 'Narrative', videoId: '8a34cb1dbd3863163145e0b80041df12', thumbnailUrl: '/thumbnails/narrative/Werewolf.webp' },
];

const ALL_VIDEOS = [...COMMERCIAL_VIDEOS, ...NARRATIVE_VIDEOS];

type FilterType = 'All' | 'Commercial' | 'Narrative';

const WorksVideoModal: React.FC<{ video: VideoItem; onClose: () => void }> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const src = STREAM_URL_HD(video.videoId);
    let hls: Hls | null = null;
    const savedVolume = parseFloat(localStorage.getItem('mr_volume') ?? '0.7');

    const playWithSound = () => {
      el.muted = false;
      el.volume = savedVolume;
      el.play().catch(() => { el.muted = true; el.play().catch(() => {}); });
    };
    const saveVolume = () => { if (!el.muted) localStorage.setItem('mr_volume', String(el.volume)); };

    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = src;
      el.addEventListener('loadedmetadata', playWithSound, { once: true });
    } else if (Hls.isSupported()) {
      hls = new Hls({ maxBufferLength: 15, startLevel: 0 });
      hls.loadSource(src);
      hls.attachMedia(el);
      hls.on(Hls.Events.MANIFEST_PARSED, playWithSound);
    }
    const onEnded = () => { el.currentTime = 0; };

    el.addEventListener('volumechange', saveVolume);
    el.addEventListener('ended', onEnded);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { if (hls) hls.destroy(); el.removeEventListener('volumechange', saveVolume); el.removeEventListener('ended', onEnded); window.removeEventListener('keydown', onKey); };
  }, [video.videoId, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50 bg-black/40 p-2 rounded-full backdrop-blur-sm"
        aria-label="Close video"
      >
        ✕
      </button>
      <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full rounded-lg"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold tracking-tight uppercase">{video.title}</h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{video.category}</span>
        </div>
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ video: VideoItem; onClick: () => void }> = ({ video, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full aspect-video overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/30 text-left"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />

      {/* Play icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/30 backdrop-blur-sm p-5 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
      </div>

      {/* Bottom overlay with title */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="text-sm md:text-base font-bold tracking-tight text-white uppercase">
          {video.title}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mt-1 block">
          {video.category}
        </span>
      </div>
    </button>
  );
};

export const AllWorks: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  const filteredVideos = filter === 'All'
    ? ALL_VIDEOS
    : filter === 'Commercial'
      ? COMMERCIAL_VIDEOS
      : NARRATIVE_VIDEOS;

  const filters: FilterType[] = ['All', 'Commercial', 'Narrative'];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link
              to="/"
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors mb-6 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
              All Works
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              Our complete portfolio of commercial and narrative projects.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-12 border-b border-white/5 pb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300 ${
                  filter === f
                    ? 'bg-white text-black'
                    : 'bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {f}
                <span className="ml-2 text-[9px] opacity-60">
                  {f === 'All' ? ALL_VIDEOS.length : f === 'Commercial' ? COMMERCIAL_VIDEOS.length : NARRATIVE_VIDEOS.length}
                </span>
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setPlayingVideo(video)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Video Modal — HLS native video for unmuted autoplay */}
      {playingVideo && (
        <WorksVideoModal
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </div>
  );
};

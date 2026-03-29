
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface VideoItem {
  id: string;
  title: string;
  category: 'Commercial' | 'Narrative';
  videoUrl: string;
  thumbnailUrl: string;
}

const COMMERCIAL_VIDEOS: VideoItem[] = [
  { id: 'c1', title: "Denny's — Chroma Awards", category: 'Commercial', videoUrl: "/videos/commercial/We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.mp4", thumbnailUrl: "/thumbnails/commercial/We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.webp" },
  { id: 'c2', title: 'Atombit Minisite', category: 'Commercial', videoUrl: '/videos/commercial/Atombit Minisite v2 (with dialogue).mp4', thumbnailUrl: '/thumbnails/commercial/Atombit Minisite v2 (with dialogue).webp' },
  { id: 'c3', title: 'Atombit Keynote', category: 'Commercial', videoUrl: '/videos/commercial/Atombit Keynote 1 Compilation (1).mp4', thumbnailUrl: '/thumbnails/commercial/Atombit Keynote 1 Compilation (1).webp' },
  { id: 'c4', title: 'Alpha Teaser', category: 'Commercial', videoUrl: '/videos/commercial/Alpha Teaser.mp4', thumbnailUrl: '/thumbnails/commercial/Alpha Teaser.webp' },
  { id: 'c5', title: 'Bionic Awards Opener', category: 'Commercial', videoUrl: '/videos/commercial/BIONIC AWARDS OPENER.mp4', thumbnailUrl: '/thumbnails/commercial/BIONIC AWARDS OPENER.webp' },
  { id: 'c6', title: 'Buckley Law', category: 'Commercial', videoUrl: '/videos/commercial/Buckley Law Commercial (Broadcast Ready).mov', thumbnailUrl: '/thumbnails/commercial/Buckley Law Commercial (Broadcast Ready).webp' },
  { id: 'c7', title: 'Dead Clean', category: 'Commercial', videoUrl: '/videos/commercial/Dead Clean.mp4', thumbnailUrl: '/thumbnails/commercial/Dead Clean.webp' },
  { id: 'c8', title: 'Field to Flasks', category: 'Commercial', videoUrl: '/videos/commercial/Field to Flasks Demo Ad.mp4', thumbnailUrl: '/thumbnails/commercial/Field to Flasks Demo Ad.webp' },
  { id: 'c9', title: "Moddy's", category: 'Commercial', videoUrl: "/videos/commercial/For Moddy's!!.mp4", thumbnailUrl: "/thumbnails/commercial/For Moddy's!!.webp" },
  { id: 'c10', title: 'NoScrubs Laundry', category: 'Commercial', videoUrl: '/videos/commercial/NoScrubs Laundry.mp4', thumbnailUrl: '/thumbnails/commercial/NoScrubs Laundry.webp' },
  { id: 'c11', title: 'Skunks', category: 'Commercial', videoUrl: '/videos/commercial/Skunks 1a.mp4', thumbnailUrl: '/thumbnails/commercial/Skunks 1a.webp' },
  { id: 'c12', title: 'Teleios Website Hero', category: 'Commercial', videoUrl: '/videos/commercial/Teleios Website Hero.mp4', thumbnailUrl: '/thumbnails/commercial/Teleios Website Hero.webp' },
  { id: 'c13', title: 'Trading App Demo', category: 'Commercial', videoUrl: '/videos/commercial/Trading App Demo.mp4', thumbnailUrl: '/thumbnails/commercial/Trading App Demo.webp' },
];

const NARRATIVE_VIDEOS: VideoItem[] = [
  { id: 'n1', title: 'AOT Live Action Trailer', category: 'Narrative', videoUrl: '/videos/narrative/AOT Live action trailer.mp4', thumbnailUrl: '/thumbnails/narrative/AOT Live action trailer.webp' },
  { id: 'n2', title: 'Alpha Teaser', category: 'Narrative', videoUrl: '/videos/narrative/Alpha Teaser.mp4', thumbnailUrl: '/thumbnails/narrative/Alpha Teaser.webp' },
  { id: 'n3', title: 'Blood & Violence', category: 'Narrative', videoUrl: '/videos/narrative/Blood & Violence Teaser - Higgsfield Action Contest.mp4', thumbnailUrl: '/thumbnails/narrative/Blood & Violence Teaser - Higgsfield Action Contest.webp' },
  { id: 'n4', title: 'Burn', category: 'Narrative', videoUrl: '/videos/narrative/Burn.mp4', thumbnailUrl: '/thumbnails/narrative/Burn.webp' },
  { id: 'n5', title: 'Chinese Watercolor', category: 'Narrative', videoUrl: '/videos/narrative/Chinese water color.mp4', thumbnailUrl: '/thumbnails/narrative/Chinese water color.webp' },
  { id: 'n6', title: 'Horror Experiments', category: 'Narrative', videoUrl: '/videos/narrative/Horror experiments.mp4', thumbnailUrl: '/thumbnails/narrative/Horror experiments.webp' },
  { id: 'n7', title: 'Monster Movie', category: 'Narrative', videoUrl: '/videos/narrative/Monster Movie.mp4', thumbnailUrl: '/thumbnails/narrative/Monster Movie.webp' },
  { id: 'n8', title: 'Randomville', category: 'Narrative', videoUrl: '/videos/narrative/Randomville Final 24fps.mp4', thumbnailUrl: '/thumbnails/narrative/Randomville Final 24fps.webp' },
  { id: 'n9', title: 'Sage Footballer', category: 'Narrative', videoUrl: '/videos/narrative/Sage Footballer.mp4', thumbnailUrl: '/thumbnails/narrative/Sage Footballer.webp' },
  { id: 'n10', title: 'Sid', category: 'Narrative', videoUrl: '/videos/narrative/Sid.mov', thumbnailUrl: '/thumbnails/narrative/Sid.webp' },
  { id: 'n11', title: 'Surviving AI', category: 'Narrative', videoUrl: '/videos/narrative/Surviving AI snippet.mp4', thumbnailUrl: '/thumbnails/narrative/Surviving AI snippet.webp' },
  { id: 'n12', title: 'Werewolf', category: 'Narrative', videoUrl: '/videos/narrative/Werewolf.mov', thumbnailUrl: '/thumbnails/narrative/Werewolf.webp' },
];

const ALL_VIDEOS = [...COMMERCIAL_VIDEOS, ...NARRATIVE_VIDEOS];

type FilterType = 'All' | 'Commercial' | 'Narrative';

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

      {/* Video Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setPlayingVideo(null)}
        >
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50"
            aria-label="Close video"
          >
            ✕
          </button>
          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={playingVideo.videoUrl}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            >
              <source
                src={playingVideo.videoUrl}
                type={playingVideo.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
              />
            </video>
            <div className="mt-4">
              <h2 className="text-xl font-bold tracking-tight uppercase">{playingVideo.title}</h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{playingVideo.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

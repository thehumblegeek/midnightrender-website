
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ShowreelGrid } from './components/ShowreelGrid';
import { VideoModal } from './components/VideoModal';
import { BookingSection } from './components/BookingSection';
import { TestimonialCarousel, LogoMarquee } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AllWorks } from './components/AllWorks';
import { ShowreelItem } from './types';
import { SHOWREEL_DATA } from './constants';
import { generateVeoVideo } from './services/videoService';

// The environment provides window.aistudio. We remove the custom declaration 
// to avoid conflicts with the built-in AIStudio type definition.

const HomePage: React.FC = () => {
  const [items, setItems] = useState<ShowreelItem[]>(SHOWREEL_DATA);
  const [selectedItem, setSelectedItem] = useState<ShowreelItem | null>(null);
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);
  const [isAiEnabled, setIsAiEnabled] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore - aistudio is globally available in this environment
      if (typeof window.aistudio !== 'undefined') {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsAiEnabled(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleGenerateAiShowreel = async () => {
    // @ts-ignore
    if (typeof window.aistudio === 'undefined') return;

    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setIsAiEnabled(true);
      generateAllVideos();
    } catch (error) {
      console.error("Key selection failed", error);
    }
  };

  const generateAllVideos = async () => {
    for (const itemData of SHOWREEL_DATA) {
      setGeneratingIds(prev => [...prev, itemData.id]);

      try {
        const videoUrl = await generateVeoVideo(itemData.prompt);
        setItems(prev => prev.map(item =>
          item.id === itemData.id ? { ...item, videoUrl } : item
        ));
      } catch (error: any) {
        console.error(`Failed to generate video for ${itemData.id}`, error);

        if (error?.message?.includes("Requested entity was not found.")) {
          setIsAiEnabled(false);
          // @ts-ignore
          if (typeof window.aistudio !== 'undefined') {
            // @ts-ignore
            await window.aistudio.openSelectKey();
          }
          break;
        }
      } finally {
        setGeneratingIds(prev => prev.filter(id => id !== itemData.id));
      }
    }
  };

  return (
    <div id="top" className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MidnightRender",
            "url": "https://midnightrender.com",
            "description": "Cinema quality AI video production. We craft viral content for brands, artists, and studios.",
            "sameAs": []
          })
        }}
      />
      <Navbar />

      <main>
        <Hero />

        {/* Combined Social Proof Section */}
        <section className="bg-black py-16 md:py-24 px-6 md:px-16 overflow-hidden border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
              <About />
              <TestimonialCarousel />
            </div>
            <LogoMarquee />
          </div>
        </section>

        <ShowreelGrid
          items={items}
          generatingIds={generatingIds}
          onSelectItem={(item) => setSelectedItem(item)}
        />

        {/* View Full Portfolio Button */}
        <div className="bg-black py-20 px-6 text-center border-b border-white/5">
          <Link
            to="/works"
            className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-white border border-white/40 px-10 py-4 hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            View our Full Portfolio
          </Link>
        </div>

        <BookingSection />
      </main>

      <Footer />

      <VideoModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<AllWorks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

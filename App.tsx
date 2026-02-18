
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ShowreelGrid } from './components/ShowreelGrid';
import { VideoModal } from './components/VideoModal';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { ShowreelItem } from './types';
import { SHOWREEL_DATA } from './constants';
import { generateVeoVideo } from './services/videoService';

// The environment provides window.aistudio. We remove the custom declaration 
// to avoid conflicts with the built-in AIStudio type definition.

const App: React.FC = () => {
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
      // Assume success after triggering the dialog as per instructions to avoid race condition
      setIsAiEnabled(true);

      // Start generating videos for placeholders
      generateAllVideos();
    } catch (error) {
      console.error("Key selection failed", error);
    }
  };

  const generateAllVideos = async () => {
    // Sequential generation to avoid rate limits and provide clear feedback
    for (const itemData of SHOWREEL_DATA) {
      setGeneratingIds(prev => [...prev, itemData.id]);

      try {
        const videoUrl = await generateVeoVideo(itemData.prompt);
        setItems(prev => prev.map(item =>
          item.id === itemData.id ? { ...item, videoUrl } : item
        ));
      } catch (error: any) {
        console.error(`Failed to generate video for ${itemData.id}`, error);

        // If the request fails with "Requested entity was not found.", 
        // reset the key selection state and prompt the user to select a key again via openSelectKey().
        if (error?.message?.includes("Requested entity was not found.")) {
          setIsAiEnabled(false);
          // @ts-ignore
          if (typeof window.aistudio !== 'undefined') {
            // @ts-ignore
            await window.aistudio.openSelectKey();
          }
          // Break the loop as the user needs to select a valid key first
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
        <About />



        <ShowreelGrid
          items={items}
          generatingIds={generatingIds}
          onSelectItem={(item) => setSelectedItem(item)}
        />

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

export default App;

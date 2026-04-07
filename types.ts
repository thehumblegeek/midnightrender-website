
export interface ShowreelItem {
  id: string;
  title: string;
  category: string;
  videoId?: string;    // Cloudflare Stream Video ID (preferred)
  videoUrl?: string;   // Legacy local path / Veo AI generation fallback
  thumbnailUrl: string;
  description: string;
  year: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}

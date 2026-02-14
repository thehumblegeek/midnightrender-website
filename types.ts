
export interface ShowreelItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  year: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}

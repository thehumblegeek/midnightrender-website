
import { ShowreelItem } from './types';

export interface ExtendedShowreelItem extends ShowreelItem {
  prompt: string;
}

export const SHOWREEL_DATA: ExtendedShowreelItem[] = [
  {
    id: 'bad-driving',
    title: 'DENNY\'S — CHROMA AWARDS',
    category: '',
    videoUrl: '/videos/We\'ve Had It In Us All Along - Chroma Awards - Official Denny\'s Music Video.mp4',
    thumbnailUrl: '',
    description: 'A comedic commercial that turns terrible driving into unforgettable entertainment.',
    year: '20M VIEWS',
    prompt: 'A comedic, over-the-top driving sequence with a panicked passenger, filmed in a retro 80s style with neon lighting and dramatic angles.'
  },
  {
    id: 'atombit',
    title: 'SHADES OF BLUE',
    category: '',
    videoUrl: '/videos/Atombit Minisite v2 (with dialogue).mp4',
    thumbnailUrl: '/thumbnails/shades-of-blue.webp',
    description: 'A moody, atmospheric brand film that captures the essence of Atombit\'s sonic identity.',
    year: '10M VIEWS',
    prompt: 'A cinematic surreal video of a sloth wearing a hoodie participating in a rap battle in a dimly lit urban club, neon lights, highly detailed, slow motion.'
  },
  {
    id: 'hero-music',
    title: 'NEW HERO',
    category: '',
    videoUrl: '/videos/3. New hero music.mp4',
    thumbnailUrl: '/thumbnails/new-hero.webp',
    description: 'An epic music-driven visual experience that redefines what a hero looks like.',
    year: '5M VIEWS',
    prompt: 'A massive, sleek futuristic black spaceship flying over a misty, alien desert landscape with glowing floating orbs, epic scale, sci-fi cinematography, 4k.'
  },
  {
    id: 'football-law',
    title: 'FOOTBALL LAW',
    category: '',
    videoUrl: '/videos/4. Football Law.mp4',
    thumbnailUrl: '/thumbnails/football-law.webp',
    description: 'A hard-hitting commercial blending the intensity of football with the weight of the law.',
    year: '15M VIEWS',
    prompt: 'An office worker riding a black motorcycle through a modern office hallway, papers flying everywhere, high-speed motion blur, cinematic lighting.'
  },
  {
    id: 'ugc',
    title: 'UGC',
    category: '',
    videoUrl: '/videos/6. UGC.mp4',
    thumbnailUrl: '/thumbnails/ugc.webp',
    description: 'A user-generated content campaign that proves authenticity is the ultimate creative weapon.',
    year: '50M VIEWS',
    prompt: 'A montage of diverse people filming themselves with smartphones in everyday locations, warm natural lighting, documentary style, authentic and raw.'
  }
];

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

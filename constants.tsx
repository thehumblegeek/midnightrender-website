
import { ShowreelItem } from './types';

export interface ExtendedShowreelItem extends ShowreelItem {
  prompt: string;
}

export const SHOWREEL_DATA: ExtendedShowreelItem[] = [
  {
    id: 'bad-driving',
    title: 'DENNY\'S — CHROMA AWARDS',
    category: '',
    videoId: '879f3b1889a6fffe6b64424b87db217d',
    thumbnailUrl: "/thumbnails/commercial/We've Had It In Us All Along - Chroma Awards - Official Denny's Music Video.webp",
    description: 'A comedic commercial that turns terrible driving into unforgettable entertainment.',
    year: '20M VIEWS',
    prompt: 'A comedic, over-the-top driving sequence with a panicked passenger, filmed in a retro 80s style with neon lighting and dramatic angles.'
  },
  {
    id: 'atombit',
    title: 'SHADES OF BLUE',
    category: '',
    videoId: '669327b049cc82804a8d68a6467cfc16',
    thumbnailUrl: '/thumbnails/shades-of-blue.webp',
    description: 'A moody, atmospheric brand film that captures the essence of Atombit\'s sonic identity.',
    year: '10M VIEWS',
    prompt: 'A cinematic surreal video of a sloth wearing a hoodie participating in a rap battle in a dimly lit urban club, neon lights, highly detailed, slow motion.'
  },
  {
    id: 'teleios-hero',
    title: 'TELEIOS WEBSITE HERO',
    category: '',
    videoId: '33856860b6552ed4d7d3935c9ca0c6c7',
    thumbnailUrl: '/thumbnails/commercial/Teleios Website Hero.webp',
    description: 'A cinematic website hero crafted for Teleios — bold, atmospheric, and built to captivate.',
    year: '5M VIEWS',
    prompt: 'A massive, sleek futuristic black spaceship flying over a misty, alien desert landscape with glowing floating orbs, epic scale, sci-fi cinematography, 4k.'
  },
  {
    id: 'alpha-teaser',
    title: 'ALPHA TEASER',
    category: '',
    videoId: 'dffaeb7e76e714d2a5a0fdd81c33ddd0',
    thumbnailUrl: '/thumbnails/commercial/Alpha Teaser.webp',
    description: 'A high-energy teaser that launches a new era of cinematic AI storytelling.',
    year: '',
    prompt: 'A dramatic cinematic teaser with fast cuts, intense lighting, and a powerful musical score building to a climactic reveal.'
  },
  {
    id: 'bionic-awards',
    title: 'BIONIC AWARDS OPENER',
    category: '',
    videoId: 'ee921e6772a9047fda2f4810daea6553',
    thumbnailUrl: '/thumbnails/commercial/BIONIC AWARDS OPENER.webp',
    description: 'A spectacular awards opener blending sci-fi aesthetics with cinematic grandeur.',
    year: '',
    prompt: 'A futuristic awards ceremony opener with sweeping camera moves, glowing particle effects, and a monumental sci-fi stage design.'
  }
];


export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

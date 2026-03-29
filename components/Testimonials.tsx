import React, { useRef, useState, useEffect } from 'react';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Sage was a pleasure to work with and went above and beyond our expectations. Easy to work with. Wanted the video to turn out great. And did everything he could to ensure we were happy. We will be using Sage on our next videos for sure.",
        name: "KATIE",
        role: "Creative Director",
        company: "AlterMe"
    },
    {
        quote: "Yet again Sage just reaffirmed that he is an AI video master. This is our second video with him and the production quality is amazing. He always charges us a fair price, has great communication, and exceeds expectations. Thank you Sage and looking forward to working with you again.",
        name: "JOSHUA",
        role: "Executive Producer",
        company: "Better"
    },
    {
        quote: "Working with Sage was a game-changer for our project. Hired for prompt engineering, their deep understanding of AI, especially Veo 3, was impressive. More than just technical skill, Sage offered brilliant strategic advice that has significantly clarified our path forward. This was an extremely helpful engagement, worth every penny. We are eagerly looking forward to commissioning the full video generations with him in the near future.",
        name: "SANDRA B",
        role: "VP of Marketing",
        company: "Moddy"
    },
    {
        quote: "We had a wonderful experience with Sage. We came to him with an idea for an AI video. He listened, asked great questions and offered pathway's forward. Based on understanding the feeling we were trying to create, he came to us with an out of the box idea that was exactly what we needed. He provided updates, shared content for review regularly, and delivered an award winning video on time that will stand the test of time. He is a visionary and a great collaborative partner. I highly recommend him and would hire him again.",
        name: "FASIKA M",
        role: "",
        company: ""
    },
    {
        quote: "Sage is exceptionally talented. He works quickly and delivers top-tier work. One incredibly rare skill-set that Sage has is his ability to anticipate needs and elevate the outcomes of the project based on that insight. I gave very detailed storyboarding and scripting, which allowed for quick execution. But Sage took the initiative to offer improvements to the storyboard and script that truly made the final product better than anticipated. I highly recommend working with Sage for professional AI-generated video content.",
        name: "BILL P",
        role: "",
        company: ""
    },
    {
        quote: "Sage's expertise in AI video creation is exceptional. I've worked with many freelancers, and his level of knowledge, execution, and creative vision in this space is in a different league. He really understands how to bring ideas to life with AI. Working with Sage was seamless from start to finish. He has a unique ability to take rough or incomplete ideas and turn them into polished, high-quality content that feels fully thought out and intentional. If you're looking for someone who not only executes but enhances your vision, Sage is someone you will not regret working with.",
        name: "JARROD B",
        role: "",
        company: ""
    },
];

interface LogoItem {
    name: string;
    file: string;
}

const LOGOS: LogoItem[] = [
    { name: 'AlterMe', file: '/logos/AlterMe.jpeg' },
    { name: 'Better', file: '/logos/Better.png' },
    { name: "Denny's", file: '/logos/Dennys.png' },
    { name: 'Moddy', file: '/logos/Moddy.png' },
    { name: 'No Scrubs', file: '/logos/NoScrubs.jpeg' },
    { name: 'Padsplit', file: '/logos/Padsplit.png' },
    { name: 'Qodo', file: '/logos/qodo.png' },
];

export const TestimonialCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scroll = (index: number) => {
        if (scrollRef.current) {
            const cardElement = scrollRef.current.children[index] as HTMLElement;
            if (cardElement) {
                scrollRef.current.scrollTo({
                    left: cardElement.offsetLeft,
                    behavior: 'smooth',
                });
                setActiveIndex(index);
            }
        }
    };

    const handleNext = () => {
        const nextIndex = (activeIndex + 1) % TESTIMONIALS.length;
        scroll(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        scroll(prevIndex);
    };

    // Auto-rotation logic
    useEffect(() => {
        const timer = setInterval(handleNext, 8000);
        return () => clearInterval(timer);
    }, [activeIndex]);

    return (
        <div className="w-full">
            {/* Carousel Controls */}
            <div className="flex items-center gap-6 mb-8">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                    CLIENTS
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-white/30"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-hidden scrollbar-hide mb-6"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {TESTIMONIALS.map((testimonial, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 border-l border-white/10 pl-6 pr-4 py-4 flex flex-col justify-between bg-white/[0.02] rounded-r-lg transition-opacity duration-500"
                        style={{
                            opacity: activeIndex === index ? 1 : 0.3,
                        }}
                    >
                        <div>
                            <span
                                className="text-3xl leading-none text-white/10 block mb-2 select-none"
                                aria-hidden="true"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                ❝
                            </span>
                            <p className="text-gray-400 italic text-sm md:text-base leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-white font-bold text-[10px] uppercase tracking-[0.3em] block">
                                {testimonial.name}
                            </span>
                            {/* Role and Company subtext removed per user request */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-start gap-2 px-6">
                {TESTIMONIALS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scroll(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white w-4' : 'bg-white/20'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export const LogoMarquee: React.FC = () => {
    return (
        <div className="w-full">
            <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 text-center">
                    TRUSTED BY INDUSTRY LEADERS
                </p>
            </div>

            <div className="relative overflow-hidden py-6">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
                    {/* First set */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`pill-a-${i}`}
                            className="flex-shrink-0 border border-white/5 px-6 py-3 rounded-xl flex items-center justify-center hover:border-white/10 transition-colors"
                            style={{ minWidth: '150px' }}
                        >
                            <img
                                src={logo.file}
                                alt={logo.name}
                                className="h-8 md:h-10 w-auto object-contain transition-all duration-500 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                                style={{ mixBlendMode: 'lighten' }}
                                loading="lazy"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`pill-b-${i}`}
                            className="flex-shrink-0 border border-white/5 px-6 py-3 rounded-xl flex items-center justify-center hover:border-white/10 transition-colors"
                            style={{ minWidth: '150px' }}
                        >
                            <img
                                src={logo.file}
                                alt={logo.name}
                                className="h-8 md:h-10 w-auto object-contain transition-all duration-500 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                                style={{ mixBlendMode: 'lighten' }}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main Export remains for compatibility or as a composed section
export const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="bg-black py-24 px-6 md:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-24">
                <TestimonialCarousel />
                <LogoMarquee />
            </div>
        </section>
    );
};

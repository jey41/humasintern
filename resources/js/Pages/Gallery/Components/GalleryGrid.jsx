import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

export default function GalleryGrid({ items, onOpenLightbox }) {
    const targetRef = useRef(null);
    const containerRef = useRef(null);
    const [maxScroll, setMaxScroll] = useState(0);
    
    // We use the robust React API from framer-motion that we know works perfectly
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    
    // Dynamically calculate the maximum scroll distance
    useEffect(() => {
        const updateScroll = () => {
            if (containerRef.current) {
                const scrollWidth = containerRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                // Add a little padding to the end so the last item isn't flush against the edge
                setMaxScroll(Math.max(0, scrollWidth - viewportWidth + 100)); 
            }
        };
        
        updateScroll();
        window.addEventListener('resize', updateScroll);
        // Small delay to ensure images/layout are calculated
        setTimeout(updateScroll, 100);
        
        return () => window.removeEventListener('resize', updateScroll);
    }, [items]);
    
    // Translate the track horizontally in pixels
    const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

    if (!items || items.length === 0) return null;

    return (
        <ReactLenis root>
            {/* The tall container that enables scrolling */}
            <section ref={targetRef} className="relative bg-[#050505]" style={{ height: `${items.length * 80}vh` }}>
                {/* The sticky viewport that locks to the screen */}
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    {/* The horizontal moving track */}
                    <motion.ul 
                        ref={containerRef}
                        style={{ x }} 
                        className="flex items-center gap-[6vw] md:gap-[4vw] px-[10vw] m-0 list-none h-full"
                    >
                        {items.map((item, index) => {
                            // Parallax for text: since we are sliding the whole track left based on scrollYProgress,
                            // we can map scrollYProgress to local parallax movement for the text.
                            const start = Math.max(0, (index - 2) / (items.length - 1));
                            const end = Math.min(1, (index + 2) / (items.length - 1));
                            
                            const textX = items.length > 1 
                                ? useTransform(scrollYProgress, [start, end], ["15vw", "-15vw"])
                                : "0vw";
                                
                            // Zig-zag stagger alignment
                            const alignClass = index % 2 === 0 ? "mb-[15vh]" : "mt-[15vh]";
                                
                            return (
                                <li 
                                    key={item.id} 
                                    className={`relative flex-shrink-0 flex flex-col justify-center items-center ${alignClass}`}
                                >
                                    {/* Background Parallax Text */}
                                    <motion.h2 
                                        style={{ x: textX }}
                                        className="text-[14vw] md:text-[8vw] font-display font-bold text-white/5 whitespace-nowrap absolute select-none pointer-events-none uppercase z-0"
                                    >
                                        {item.category || "VISUALS"}
                                    </motion.h2>

                                    {/* Foreground Image Wrapper - Height based so it never crops vertically! */}
                                    <div 
                                        className="relative z-10 w-[75vw] sm:w-[60vw] md:w-auto md:h-[65vh] aspect-[4/5] md:aspect-[3/4] cursor-pointer group"
                                        onClick={() => onOpenLightbox(index)}
                                    >
                                        <div className="w-full h-full overflow-hidden rounded-[4px] transition-transform duration-700 group-hover:scale-[1.02] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]">
                                            <img 
                                                src={item.type === 'video' ? item.thumbnail : item.url} 
                                                alt={item.caption} 
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                                            />
                                            
                                            {/* Video Indicator */}
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                                                        <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Minimal Caption */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 z-10">
                                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                    <span className="font-sans text-xs text-white/70 uppercase tracking-widest mb-1 block">
                                                        {item.type === 'video' ? 'Video' : 'Photo'}
                                                    </span>
                                                    <h4 className="font-display text-xl text-white tracking-tight line-clamp-2">
                                                        {item.caption}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </motion.ul>
                </div>
            </section>
        </ReactLenis>
    );
}

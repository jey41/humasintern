import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ items, activeIndex, onClose }) {
    const activeItem = activeIndex !== null ? items[activeIndex] : null;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (activeItem) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeItem, onClose]);

    // Ensure we only render in the browser (Next.js/Inertia SSR safety)
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {activeItem && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                    style={{ zIndex: 999999 }} // Inline style guarantees it beats any Tailwind utility
                    onClick={onClose}
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer"
                        style={{ zIndex: 9999999 }}
                    >
                        <span className="material-symbols-outlined text-2xl md:text-3xl leading-none">close</span>
                    </button>

                    <div 
                        className="relative flex items-center justify-center w-full max-w-6xl h-full max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {activeItem.type === 'video' ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                {/* Use responsive aspect ratio. Max width controls the size so it fits horizontally, 
                                    max height controls it vertically. */}
                                <div className="w-full max-w-2xl aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden shadow-2xl bg-black border border-white/10">
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${activeItem.url.includes('youtu.be/') ? activeItem.url.split('youtu.be/')[1].split('?')[0] : activeItem.url.split('v=')[1]?.split('&')[0]}?autoplay=1&rel=0`}
                                        title={activeItem.caption}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="text-white/80 font-sans text-sm md:text-base mt-6 text-center max-w-xl">
                                    {activeItem.caption}
                                </p>
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <img 
                                    src={activeItem.url} 
                                    alt={activeItem.caption}
                                    className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                                    loading="lazy"
                                />
                                <p className="text-white/80 font-sans text-sm md:text-base mt-6 text-center max-w-xl">
                                    {activeItem.caption}
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

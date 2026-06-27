import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GalleryItem({ item, onClick, aspectClass = "aspect-[3/4]" }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-pointer w-full"
            onClick={onClick}
        >
            {/* Strict rectangular bounds, pure scale on hover */}
            <div className={`w-full overflow-hidden bg-[#111] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] ${aspectClass}`}>
                {/* Standard lazy loaded image */}
                <img 
                    src={item.type === 'video' ? item.thumbnail : item.url} 
                    alt={item.caption || "Gallery image"} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                />
                
                {/* Video Indicator */}
                {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                            <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                        </div>
                    </div>
                )}
                
                {/* Clean Minimal Caption on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="font-sans text-xs text-white/80 uppercase tracking-widest mb-2 block">{item.category}</span>
                        <h4 className="font-display text-xl md:text-2xl text-white tracking-tight line-clamp-2">{item.caption}</h4>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

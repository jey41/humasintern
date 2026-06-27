import React from 'react';
import { motion } from 'framer-motion';

export default function GalleryHero({ locale }) {
    return (
        <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#050505] to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            
            {/* Hero Content */}
            <div className="relative z-10 max-w-[1280px] w-full mx-auto px-margin-mobile md:px-margin-desktop text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-display text-5xl md:text-7xl lg:text-[100px] text-white font-bold tracking-tight leading-none mb-6"
                >
                    {locale === 'id' ? 'GALERI' : 'GALLERY'}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-sans text-lg md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                >
                    Arsip memori dan dokumentasi kegiatan Humas Intern Unmul
                </motion.p>
            </div>
        </section>
    );
}

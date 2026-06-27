import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

// Cinematic Progressive Image Loader to prevent layout shifts and add elegant fade/blur transitions
function CinematicImage({ src, alt, className, aspectClass = "", ...props }) {
    const [loaded, setLoaded] = useState(false);

    // Fallback if src is missing
    const imageSrc = src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div className={`relative w-full overflow-hidden bg-white/[0.02] ${aspectClass}`}>
            <img
                src={imageSrc}
                alt={alt}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                className={`${className} transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
                    loaded ? 'blur-0 opacity-100 scale-100' : 'blur-xl opacity-30 scale-105'
                }`}
                {...props}
            />
        </div>
    );
}

// Helper to get clean instagram embed url
const getInstagramEmbedUrl = (url) => {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        urlObj.search = ''; // Remove all query params
        let cleanUrl = urlObj.toString();
        if (!cleanUrl.endsWith('/')) {
            cleanUrl += '/';
        }
        return `${cleanUrl}embed/`;
    } catch(e) {
        return url;
    }
};

export default function PublicIndex({ images = [] }) {
    const { locale } = useContext(TranslationContext);
    
    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Escape key listener for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight' && lightboxIndex !== null) handleNext();
            if (e.key === 'ArrowLeft' && lightboxIndex !== null) handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [lightboxIndex]);

    const handleNext = useCallback(() => {
        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const getStatic = (key) => {
        const text = {
            title: { id: 'Galeri Visual', en: 'Visual Gallery' },
            subtitle: { id: 'Sebuah Jurnal Fotografi', en: 'A Photographic Journal' },
            desc: {
                id: 'Arsip digital kegiatan akademik, seremonial, dan dokumentasi visual Universitas Mulawarman. Menampilkan momen-momen bersejarah dalam kualitas resolusi tinggi.',
                en: 'Digital archive of academic, ceremonial activities, and visual documentation of Universitas Mulawarman. Showcasing historical moments in high resolution.'
            },
            empty_state: { id: 'Belum ada aset galeri yang diunggah.', en: 'No gallery assets uploaded yet.' },
            featured: { id: 'Momen Pilihan', en: 'Featured Moments' }
        };
        return text[key] ? text[key][locale] : '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
    };

    // Derived Data
    const heroImage = images.length > 0 ? images[0] : null;
    const featuredImages = images.slice(0, 2);
    const masonryImages = images.slice(2);

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Galeri Visual - Humas Intern Unmul' : 'Visual Gallery - Humas Intern Unmul'} />

            {/* 1. Cinematic Hero Section (0px border radius) */}
            <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#050505]">
                {/* Background Image / Overlay */}
                {heroImage ? (
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-out scale-105 hover:scale-100"
                        style={{ backgroundImage: `url(${heroImage.media_type === 'video' ? heroImage.thumbnail : heroImage.media_url})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#050505]" />
                )}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                
                {/* Hero Content */}
                <div className="relative z-10 max-w-[1280px] w-full mx-auto px-margin-mobile md:px-margin-desktop text-center">

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="font-display text-5xl md:text-7xl lg:text-[88px] text-white font-bold tracking-tight mb-8"
                    >
                        <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="font-sans text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                    </motion.p>
                </div>
            </section>

            <div className="bg-[#050505] w-full">
                {images.length === 0 ? (
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-32 text-center">
                        <p className="text-white/40 font-sans text-lg"><TranslatedText locale={locale}>{getStatic('empty_state')}</TranslatedText></p>
                    </div>
                ) : (
                    <>
                        {/* 2. Featured Photography Section (0px border radius, layout breathes through whitespace) */}
                        {featuredImages.length > 0 && (
                            <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32">
                                <div className="mb-16">
                                    <h2 className="font-display text-3xl md:text-5xl text-white font-bold tracking-tight">
                                        <TranslatedText locale={locale}>{getStatic('featured')}</TranslatedText>
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                                    {featuredImages.map((img, idx) => (
                                        <motion.div 
                                            key={img.id}
                                            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }}
                                            className={`relative group cursor-pointer ${idx === 1 ? 'md:mt-32' : ''}`}
                                            onClick={() => setLightboxIndex(idx)}
                                        >
                                            <CinematicImage 
                                                src={img.media_type === 'video' ? img.thumbnail : img.media_url} 
                                                alt={img.title} 
                                                aspectClass="aspect-[4/5] md:aspect-auto md:min-h-[600px] rounded-none"
                                                className="w-full h-auto object-cover transition-all duration-1000 ease-out group-hover:scale-[1.02] group-hover:brightness-105" 
                                            />
                                            {img.media_type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 group-hover:scale-110">
                                                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl">
                                                        <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mt-8 space-y-3">
                                                <span className="font-sans text-xs text-white/50 uppercase tracking-widest">{formatDate(img.created_at)}</span>
                                                <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight"><TranslatedText locale={locale}>{img.title}</TranslatedText></h3>
                                                {img.caption && (
                                                    <p className="font-sans text-white/60 line-clamp-2 leading-relaxed"><TranslatedText locale={locale}>{img.caption}</TranslatedText></p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Editorial Masonry Gallery (Subtle 2px border radius only, whitespace is hero) */}
                        {masonryImages.length > 0 && (
                            <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                    {masonryImages.map((img, idx) => {
                                        const globalIndex = idx + featuredImages.length;
                                        return (
                                            <motion.div
                                                key={img.id}
                                                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                className="break-inside-avoid relative overflow-hidden group cursor-pointer rounded-[2px] bg-white/5"
                                                onClick={() => setLightboxIndex(globalIndex)}
                                            >
                                                <CinematicImage 
                                                    src={img.media_type === 'video' ? img.thumbnail : img.media_url} 
                                                    alt={img.title} 
                                                    className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                                                />
                                                {img.media_type === 'video' && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 group-hover:scale-110">
                                                        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl">
                                                            <span className="material-symbols-outlined text-2xl ml-0.5">play_arrow</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Soft Hover Overlay (Subtle gradient reveal) */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6">
                                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                        <span className="font-sans text-xs text-white/70 uppercase tracking-widest mb-2 block">{formatDate(img.created_at)}</span>
                                                        <h4 className="font-display text-xl text-white tracking-tight line-clamp-2"><TranslatedText locale={locale}>{img.title}</TranslatedText></h4>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>

            {/* 4. Fullscreen Lightbox Experience (0px border radius, edge-to-edge gallery feel) */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        {/* Header/Controls */}
                        <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-10">
                            <span className="font-mono text-sm text-white/50 tracking-widest">
                                {lightboxIndex + 1} <span className="mx-2">/</span> {images.length}
                            </span>
                            <button 
                                onClick={() => setLightboxIndex(null)}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Navigation Arrows */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 hidden md:flex items-center justify-center text-white transition-colors duration-300 backdrop-blur-md z-10"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 hidden md:flex items-center justify-center text-white transition-colors duration-300 backdrop-blur-md z-10"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>

                        {/* Image & Details */}
                        <div 
                            className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-24 gap-8 md:gap-16"
                            onClick={() => setLightboxIndex(null)} // Click outside to close
                        >
                            <motion.div 
                                key={`img-${lightboxIndex}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="relative max-w-full max-h-[70vh] md:max-h-[85vh] flex-1 flex justify-center items-center rounded-none"
                                onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                            >
                                {images[lightboxIndex].media_type === 'video' && images[lightboxIndex].media_source === 'instagram' ? (
                                    <div className="w-full max-w-[350px] md:max-w-[400px] h-[70vh] md:h-[80vh] bg-black rounded-xl overflow-hidden relative shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
                                        <iframe 
                                            src={getInstagramEmbedUrl(images[lightboxIndex].media_url)}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            scrolling="no"
                                            allowTransparency="true"
                                            allow="encrypted-media"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img 
                                        src={images[lightboxIndex].media_url} 
                                        alt={images[lightboxIndex].title}
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-none"
                                    />
                                )}
                            </motion.div>
                            
                            <motion.div 
                                key={`text-${lightboxIndex}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="w-full md:w-[400px] flex flex-col shrink-0 text-left"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="font-sans text-xs text-white/50 uppercase tracking-widest mb-4 block">
                                    {formatDate(images[lightboxIndex].created_at)}
                                </span>
                                <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-6 leading-tight">
                                    <TranslatedText locale={locale}>{images[lightboxIndex].title}</TranslatedText>
                                </h3>
                                {images[lightboxIndex].caption && (
                                    <p className="font-sans text-base text-white/70 leading-relaxed block">
                                        <TranslatedText locale={locale}>{images[lightboxIndex].caption}</TranslatedText>
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}

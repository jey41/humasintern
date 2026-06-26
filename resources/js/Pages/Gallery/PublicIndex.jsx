import React, { useContext, useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicIndex({ images = [] }) {
    const { locale } = useContext(TranslationContext);
    const [activeImage, setActiveImage] = useState(null);

    const observerRefs = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }
                });
            },
            { threshold: 0.1 }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    const getStatic = (key) => {
        const text = {
            title: { id: 'Galeri Visual', en: 'Visual Gallery' },
            desc: {
                id: 'Arsip digital kegiatan akademik, seremonial, dan dokumentasi visual Universitas Mulawarman. Menampilkan momen-momen bersejarah dalam kualitas resolusi tinggi.',
                en: 'Digital archive of academic, ceremonial activities, and visual documentation of Universitas Mulawarman. Showcasing historical moments in high resolution.'
            },
            filter_all: { id: 'Semua', en: 'All' },
            filter_photos: { id: 'Foto', en: 'Photos' },
            filter_videos: { id: 'Video', en: 'Videos' },
            empty_state: { id: 'Belum ada aset galeri.', en: 'No gallery assets available.' },
            close_btn: { id: 'Tutup', en: 'Close' }
        };
        return text[key] ? text[key][locale] : '';
    };

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Galeri Visual - Humas Intern Unmul' : 'Visual Gallery - Humas Intern Unmul'} />

            {/* Header Section */}
            <section className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop bg-[#050505] overflow-hidden border-b border-white/5">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1280px] mx-auto relative z-10 animate-fade-in-up">
                    <div className="max-w-3xl mb-16">
                        <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Dokumentasi' : 'Documentation'}</TranslatedText></span>
                        <h1 className="editorial-display text-white mb-6">
                            <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                        </h1>
                        <p className="font-sans text-xl text-white/60 leading-relaxed block">
                            <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                        </p>
                    </div>

                    {/* FilterBar */}
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        <button className="shrink-0 px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 bg-white text-[#050505] font-semibold">
                            <TranslatedText locale={locale}>{getStatic('filter_all')}</TranslatedText>
                        </button>
                        <button className="shrink-0 px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40">
                            <TranslatedText locale={locale}>{getStatic('filter_photos')}</TranslatedText>
                        </button>
                        <button className="shrink-0 px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40">
                            <TranslatedText locale={locale}>{getStatic('filter_videos')}</TranslatedText>
                        </button>
                    </div>
                </div>
            </section>

            {/* Dynamic Masonry Grid */}
            <section className="bg-[#050505]">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-24">
                {images.length === 0 ? (
                    <div className="py-20 text-center text-white/60 font-sans">
                        <p className="block"><TranslatedText locale={locale}>{getStatic('empty_state')}</TranslatedText></p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {images.map((image, idx) => (
                            <article 
                                key={image.id}
                                onClick={() => setActiveImage(image)}
                                ref={addToRefs}
                                className={`break-inside-avoid relative cinematic-card overflow-hidden group cursor-pointer flex flex-col opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 3) * 100}`}
                            >
                                <img 
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                                    alt={image.title || 'Gallery image'} 
                                    loading="lazy"
                                    src={image.url}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <h3 className="font-sans text-xl text-white font-light tracking-tight mb-2 line-clamp-1"><TranslatedText locale={locale}>{image.title}</TranslatedText></h3>
                                    <p className="font-sans text-xs text-white/70 line-clamp-2 block"><TranslatedText locale={locale}>{image.caption}</TranslatedText></p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {activeImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-8 animate-fade-in"
                    onClick={() => setActiveImage(null)}
                >
                    <button 
                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#050505] transition-all duration-300"
                        onClick={() => setActiveImage(null)}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div 
                        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl" 
                            src={activeImage.url} 
                            alt={activeImage.title}
                        />
                        <div className="text-center w-full max-w-2xl">
                            <h3 className="font-sans text-3xl font-light text-white mb-4"><TranslatedText locale={locale}>{activeImage.title}</TranslatedText></h3>
                            <p className="font-sans text-base text-white/60 leading-relaxed block"><TranslatedText locale={locale}>{activeImage.caption}</TranslatedText></p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

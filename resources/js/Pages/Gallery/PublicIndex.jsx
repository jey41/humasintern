import React, { useContext, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicIndex({ images = [] }) {
    const { locale } = useContext(TranslationContext);
    const [activeImage, setActiveImage] = useState(null);

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

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Page Header */}
                <header className="bg-neo-navy pt-32 pb-16 border-b-2 border-neo-border">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="max-w-3xl mb-12">
                            <h1 className="editorial-display text-white mb-4">
                                {getStatic('title')}
                            </h1>
                            <p className="font-sans text-body-lg text-white/60">
                                {getStatic('desc')}
                            </p>
                        </div>

                        {/* FilterBar */}
                        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                            <button className="shrink-0 px-6 py-2 text-sm font-bold uppercase tracking-wider border-2 border-secondary bg-secondary text-neo-navy shadow-neo-sm transition-transform hover:translate-x-1 hover:-translate-y-1">
                                {getStatic('filter_all')}
                            </button>
                            <button className="shrink-0 px-6 py-2 text-sm font-bold uppercase tracking-wider border-2 border-neo-border text-white hover:bg-secondary/10 transition-colors">
                                {getStatic('filter_photos')}
                            </button>
                            <button className="shrink-0 px-6 py-2 text-sm font-bold uppercase tracking-wider border-2 border-neo-border text-white hover:bg-secondary/10 transition-colors">
                                {getStatic('filter_videos')}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dynamic Masonry Grid */}
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
                {images.length === 0 ? (
                    <div className="py-20 text-center text-white/60">
                        <p>{getStatic('empty_state')}</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
                        {images.map((image) => (
                            <article 
                                key={image.id}
                                onClick={() => setActiveImage(image)}
                                className="break-inside-avoid relative neo-card rounded-none overflow-hidden group cursor-pointer flex flex-col"
                            >
                                <img 
                                    className="w-full h-auto object-cover border-b-2 border-neo-border transition-transform duration-700 group-hover:scale-105" 
                                    alt={image.title || 'Gallery image'} 
                                    loading="lazy"
                                    src={image.url}
                                />
                                <div className="p-4 bg-neo-navy flex-1">
                                    <h3 className="font-display text-lg text-white font-bold mb-1 line-clamp-1 group-hover:text-secondary transition-colors">{image.title}</h3>
                                    <p className="font-sans text-xs text-white/60 line-clamp-2">{image.caption}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                </div>

                {/* Lightbox Modal */}
                {activeImage && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-neo-navy/95 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setActiveImage(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 neo-card rounded-none p-2 text-white hover:text-secondary bg-neo-navy cursor-pointer transition-colors"
                            onClick={() => setActiveImage(null)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div 
                            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 neo-card rounded-none bg-neo-navy p-4 md:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                className="max-w-full max-h-[60vh] border-2 border-neo-border object-contain" 
                                src={activeImage.url} 
                                alt={activeImage.title}
                            />
                            <div className="text-left w-full mt-4">
                                <h3 className="font-display text-xl font-bold text-white mb-2">{activeImage.title}</h3>
                                <p className="font-sans text-sm text-white/60">{activeImage.caption}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

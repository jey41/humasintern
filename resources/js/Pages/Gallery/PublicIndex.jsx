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

            <main className="w-full flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                {/* Page Header */}
                <header className="mb-lg">
                    <h1 className="font-display text-display-lg text-white font-extrabold mb-xs tracking-tight">
                        {getStatic('title')}
                    </h1>
                    <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
                        {getStatic('desc')}
                    </p>
                </header>

                {/* FilterBar */}
                <div className="flex gap-sm overflow-x-auto pb-4 mb-lg hide-scrollbar snap-x border-b border-white/10">
                    <button className="snap-start shrink-0 px-6 py-2 rounded-full font-label-md text-sm font-semibold bg-secondary text-[#031A38] shadow-md transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer">
                        {getStatic('filter_all')}
                    </button>
                    <button className="snap-start shrink-0 px-6 py-2 rounded-full font-label-md text-sm font-semibold bg-surface-variant/40 text-on-surface-variant border border-white/10 backdrop-blur-sm hover:bg-surface-variant/80 hover:text-white transition-all duration-300 cursor-pointer">
                        {getStatic('filter_photos')}
                    </button>
                    <button className="snap-start shrink-0 px-6 py-2 rounded-full font-label-md text-sm font-semibold bg-surface-variant/40 text-on-surface-variant border border-white/10 backdrop-blur-sm hover:bg-surface-variant/80 hover:text-white transition-all duration-300 cursor-pointer">
                        {getStatic('filter_videos')}
                    </button>
                </div>

                {/* Dynamic Masonry Grid */}
                {images.length === 0 ? (
                    <div className="py-20 text-center text-on-surface-variant">
                        <p>{getStatic('empty_state')}</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
                        {images.map((image) => (
                            <article 
                                key={image.id}
                                onClick={() => setActiveImage(image)}
                                className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-white/10 shadow-lg bg-surface-container-lowest cursor-pointer transition-all duration-300"
                            >
                                <img 
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                                    alt={image.title || 'Gallery image'} 
                                    loading="lazy"
                                    src={image.url}
                                />
                                {/* Subtle hover overlay */}
                                <div className="absolute inset-0 bg-surface-container-lowest/0 group-hover:bg-[#031A38]/50 transition-colors duration-300 pointer-events-none"></div>
                                {/* Label that appears on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#031A38] via-[#031A38]/80 to-transparent">
                                    <h3 className="font-display text-headline-md text-white leading-tight font-bold">{image.title}</h3>
                                    <p className="font-sans text-xs text-on-surface-variant mt-1 line-clamp-1">{image.caption}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Lightbox Modal */}
                {activeImage && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#031A38]/95 backdrop-blur-md p-md"
                        onClick={() => setActiveImage(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 text-white hover:text-secondary p-2 bg-white/5 rounded-full cursor-pointer transition-colors"
                            onClick={() => setActiveImage(null)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div 
                            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center gap-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                className="max-w-full max-h-[70vh] rounded-2xl border border-white/10 object-contain shadow-2xl" 
                                src={activeImage.url} 
                                alt={activeImage.title}
                            />
                            <div className="text-center space-y-xs">
                                <h3 className="text-xl font-bold text-white">{activeImage.title}</h3>
                                <p className="text-sm text-on-surface-variant max-w-lg">{activeImage.caption}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}

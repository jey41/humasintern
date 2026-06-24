import React, { useContext, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicIndex({ articles = [] }) {
    const { locale, t } = useContext(TranslationContext);
    const [searchTerm, setSearchTerm] = useState('');

    const getStatic = (key) => {
        const text = {
            title: { id: 'Publikasi Editorial', en: 'Editorial Publications' },
            desc: {
                id: 'Wawasan, analisis, dan pembaruan berita resmi langsung dari jantung Universitas Mulawarman. Menjelajahi keunggulan akademik dan perkembangan institusi.',
                en: 'Insight, analysis, and official news updates directly from the heart of Universitas Mulawarman. Exploring academic excellence and institutional developments.'
            },
            search_placeholder: { id: 'Cari artikel...', en: 'Search articles...' },
            category_label: { id: 'Kategori', en: 'Category' },
            read_more: { id: 'Baca Selengkapnya', en: 'Read More' },
            empty_state: { id: 'Belum ada artikel publikasi.', en: 'No publications available yet.' }
        };
        return text[key] ? text[key][locale] : '';
    };

    // Helper to determine mock category based on ID to match Stitch design
    const getCategory = (id) => {
        const categories = [
            { id: 'Berita', en: 'News' },
            { id: 'Opini', en: 'Opinion' },
            { id: 'Riset', en: 'Research' },
            { id: 'Profil', en: 'Profile' },
            { id: 'Pengumuman', en: 'Announcement' }
        ];
        return categories[id % categories.length][locale];
    };

    // Helper to get category badge color
    const getCategoryClass = (id) => {
        const idx = id % 5;
        if (idx === 0) return 'bg-secondary/10 text-secondary border border-secondary/20';
        if (idx === 1) return 'bg-tertiary-container text-tertiary-fixed border border-tertiary/20';
        if (idx === 2) return 'bg-primary/20 text-primary-fixed-dim border border-primary/30';
        if (idx === 3) return 'bg-surface-bright text-on-surface border border-outline-variant/30';
        return 'bg-error-container/20 text-error border border-error/20';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredArticles = articles.filter(article => {
        const title = t(article, 'title').toLowerCase();
        const desc = t(article, 'desc').toLowerCase();
        const search = searchTerm.toLowerCase();
        return title.includes(search) || desc.includes(search);
    });

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Publikasi Editorial - Humas Intern Unmul' : 'Editorial Publications - Humas Intern Unmul'} />

            <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col gap-lg">
                {/* Page Header */}
                <header className="flex flex-col gap-sm border-b border-outline-variant/30 pb-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
                        <div className="space-y-xs">
                            <h1 className="font-display text-display-lg text-white font-extrabold tracking-tight">{getStatic('title')}</h1>
                            <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
                                {getStatic('desc')}
                            </p>
                        </div>
                        {/* Search Bar */}
                        <div className="w-full md:w-80 flex rounded-full overflow-hidden border border-white/10 bg-primary-container/40 p-1">
                            <input 
                                className="bg-transparent text-white px-4 py-2 w-full focus:outline-none placeholder:text-on-primary-container/50 border-0 focus:ring-0 text-sm" 
                                placeholder={getStatic('search_placeholder')} 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="text-secondary px-4 flex items-center justify-center">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Article Grid */}
                {filteredArticles.length === 0 ? (
                    <div className="py-20 text-center text-on-surface-variant">
                        <p>{getStatic('empty_state')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                        {filteredArticles.map((article) => (
                            <article 
                                key={article.id}
                                className="bg-primary-container border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300 ambient-shadow cursor-pointer"
                            >
                                <div className="h-56 overflow-hidden bg-surface-container relative">
                                    <div className={`absolute top-4 left-4 z-10 px-3 py-1 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-wider ${getCategoryClass(article.id)}`}>
                                        <span>{getCategory(article.id)}</span>
                                    </div>
                                    <img 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={t(article, 'title')} 
                                        src={article.thumbnail}
                                    />
                                </div>
                                <div className="p-md flex flex-col flex-grow gap-sm">
                                    <div className="flex items-center gap-sm text-[12px] text-on-surface-variant font-semibold">
                                        <span>{article.author}</span>
                                        <span>•</span>
                                        <span>{formatDate(article.created_at)}</span>
                                    </div>
                                    <h2 className="font-display text-headline-md text-white group-hover:text-secondary transition-colors line-clamp-2 font-semibold">
                                        {t(article, 'title')}
                                    </h2>
                                    <p className="font-sans text-body-md text-on-surface-variant line-clamp-3 mt-auto">
                                        {t(article, 'desc')}
                                    </p>
                                    <Link 
                                        href={`/articles/${article.slug}`} 
                                        className="inline-flex items-center gap-2 font-label-md text-sm text-secondary hover:text-secondary/85 mt-sm group font-bold"
                                    >
                                        {getStatic('read_more')}
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}

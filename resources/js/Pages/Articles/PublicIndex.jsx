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

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Header Section */}
                <div className="bg-neo-navy pt-32 pb-16 border-b-2 border-neo-border">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
                            <div className="max-w-2xl">
                                <h1 className="editorial-display text-white mb-4">
                                    {getStatic('page_title')}
                                </h1>
                                <p className="font-sans text-body-lg text-white/60">
                                    {getStatic('page_desc')}
                                </p>
                            </div>
                            
                            {/* Search Box */}
                            <div className="w-full md:w-80 flex items-center bg-primary-container border-2 border-neo-border rounded-none px-4 py-2 focus-within:border-secondary shadow-neo-sm transition-colors">
                                <span className="material-symbols-outlined text-white/50 mr-2">search</span>
                                <input 
                                    type="text" 
                                    placeholder={getStatic('search_placeholder')}
                                    className="bg-transparent border-none focus:ring-0 text-white placeholder-white/40 w-full text-sm font-sans"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-sm mt-xl">
                            {['all', 'news', 'press_release', 'coverage'].map(tag => (
                                <button 
                                    key={tag}
                                    className={`border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                                        tag === 'all' 
                                            ? 'bg-secondary border-secondary text-neo-navy shadow-neo-sm' 
                                            : 'border-neo-border text-white hover:bg-secondary/10'
                                    }`}
                                >
                                    {getStatic(`category_${tag}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
                    {filteredArticles.length === 0 ? (
                        <div className="py-20 text-center text-white/60">
                            <p>{getStatic('empty_state')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                            {filteredArticles.map((article) => (
                            <article 
                                key={article.id}
                                className="neo-card rounded-none overflow-hidden flex flex-col"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-neo-navy border-b-2 border-neo-border">
                                    <div className="neo-tag-amber absolute top-3 left-3 z-10">
                                        {getStatic('category_news')}
                                    </div>
                                    <img 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={t(article, 'title')} 
                                        src={article.thumbnail}
                                    />
                                </div>
                                <div className="p-md flex-1 flex flex-col gap-xs">
                                    <div className="font-mono text-[11px] text-white/40 mb-2">
                                        <span>{article.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{formatDate(article.created_at)}</span>
                                    </div>
                                    <h3 className="font-display text-xl text-white font-bold line-clamp-2">
                                        {t(article, 'title')}
                                    </h3>
                                    <p className="font-sans text-sm text-white/60 line-clamp-3 mb-md flex-grow mt-2">
                                        {t(article, 'desc')}
                                    </p>
                                    <Link 
                                        href={`/articles/${article.slug}`} 
                                        className="inline-flex items-center gap-2 font-label-md text-sm text-secondary hover:text-secondary/80 mt-auto font-bold"
                                    >
                                        {getStatic('read_more')}
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

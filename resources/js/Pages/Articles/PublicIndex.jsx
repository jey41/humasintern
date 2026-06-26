import React, { useContext, useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicIndex({ articles = [] }) {
    const { locale, t } = useContext(TranslationContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

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
    }, [searchTerm, activeCategory]);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    const getStatic = (key) => {
        const text = {
            title: { id: 'Editorial', en: 'Editorial' },
            desc: {
                id: 'Jelajahi cerita mendalam, analisis, dan pembaruan institusi.',
                en: 'Explore in-depth stories, analysis, and institutional updates.'
            },
            search_placeholder: { id: 'Cari cerita...', en: 'Search stories...' },
            category_all: { id: 'Semua', en: 'All' },
            category_news: { id: 'Berita', en: 'News' },
            category_projects: { id: 'Proyek', en: 'Projects' },
            category_editorial: { id: 'Editorial', en: 'Editorial' },
            category_achievements: { id: 'Prestasi', en: 'Achievements' },
            category_events: { id: 'Acara', en: 'Events' },
            read_more: { id: 'Baca Cerita', en: 'Read Story' },
            empty_state: { id: 'Belum ada cerita yang dipublikasikan.', en: 'No stories published yet.' },
            min_read: { id: 'mnt baca', en: 'min read' }
        };
        return text[key] ? text[key][locale] : '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadTime = (article) => {
        const content = t(article, 'content');
        if (!content) return 5;
        // strip html tags
        const text = content.replace(/<[^>]*>?/gm, '');
        const wordCount = text.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 200));
    };

    const getArticleCategory = (article) => {
        // Derive category from title/content keywords if possible, else fallback
        const title = t(article, 'title').toLowerCase();
        if (title.includes('prestasi') || title.includes('achievement')) return 'achievements';
        if (title.includes('proyek') || title.includes('project')) return 'projects';
        if (title.includes('acara') || title.includes('event')) return 'events';
        if (title.includes('opini') || title.includes('editorial')) return 'editorial';
        return 'news';
    };

    const filteredArticles = articles.filter(article => {
        const title = t(article, 'title').toLowerCase();
        const desc = t(article, 'desc').toLowerCase();
        const search = searchTerm.toLowerCase();
        
        const matchesSearch = title.includes(search) || desc.includes(search);
        const matchesCategory = activeCategory === 'all' || getArticleCategory(article) === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
    const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

    const categories = ['all', 'news', 'projects', 'editorial', 'achievements', 'events'];

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Editorial - Humas Intern Unmul' : 'Editorial - Humas Intern Unmul'} />

            {/* Header Section */}
            <section className="relative pt-40 pb-16 px-margin-mobile md:px-margin-desktop bg-[#050505]">
                <div className="max-w-[1280px] mx-auto relative z-10 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
                        <div className="max-w-2xl">
                            <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tight mb-6">
                                <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                            </h1>
                            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-lg">
                                <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                            </p>
                        </div>
                        
                        {/* Search Box */}
                        <div className="w-full md:w-80 flex items-center bg-[#0a0a0a] rounded-full px-6 py-3 border border-white/10 focus-within:border-white/30 transition-colors">
                            <span className="material-symbols-outlined text-white/40 mr-3 text-xl">search</span>
                            <input 
                                type="text" 
                                placeholder={getStatic('search_placeholder')}
                                className="bg-transparent border-none focus:ring-0 text-white placeholder-white/30 w-full text-sm font-sans"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider capitalize transition-all duration-300 ${
                                    activeCategory === cat 
                                        ? 'bg-white text-black font-medium'
                                        : 'bg-[#111] border border-white/5 text-white/60 hover:bg-[#1a1a1a] hover:text-white'
                                }`}
                            >
                                <TranslatedText locale={locale}>{getStatic(`category_${cat}`)}</TranslatedText>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-[#050505] min-h-screen">
                {filteredArticles.length === 0 ? (
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-32 text-center">
                        <p className="text-white/40 font-serif text-2xl italic"><TranslatedText locale={locale}>{getStatic('empty_state')}</TranslatedText></p>
                    </div>
                ) : (
                    <>
                        {/* Featured Story */}
                        {featuredArticle && (
                            <section className="px-margin-mobile md:px-margin-desktop pb-24">
                                <div className="max-w-[1280px] mx-auto">
                                    <Link 
                                        href={`/articles/${featuredArticle.slug}`} 
                                        className="group block relative rounded-3xl overflow-hidden bg-[#0a0a0a] animate-fade-in-up"
                                    >
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Featured Image (60-70%) */}
                                            <div className="w-full lg:w-[65%] relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden">
                                                <img 
                                                    src={featuredArticle.thumbnail} 
                                                    alt={t(featuredArticle, 'title')} 
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-90 group-hover:opacity-100"
                                                />
                                            </div>
                                            
                                            {/* Featured Content */}
                                            <div className="w-full lg:w-[35%] p-10 md:p-16 flex flex-col justify-center bg-[#0a0a0a] relative z-10 border-l border-white/5">
                                                <div className="mb-6">
                                                    <span className="inline-block px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/60 mb-6">
                                                        <TranslatedText locale={locale}>{getStatic(`category_${getArticleCategory(featuredArticle)}`)}</TranslatedText>
                                                    </span>
                                                </div>
                                                
                                                <h2 className="text-4xl md:text-[2.75rem] leading-[1.1] font-serif text-white mb-6 group-hover:text-white/90 transition-colors">
                                                    <TranslatedText locale={locale}>{t(featuredArticle, 'title')}</TranslatedText>
                                                </h2>
                                                
                                                <p className="font-sans text-base text-white/50 leading-relaxed mb-10 line-clamp-3">
                                                    <TranslatedText locale={locale}>{t(featuredArticle, 'desc')}</TranslatedText>
                                                </p>
                                                
                                                <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-widest text-white/40 mt-auto">
                                                    <span className="text-white/80">{featuredArticle.author}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span>{formatDate(featuredArticle.created_at)}</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                        <span>{getReadTime(featuredArticle)} <TranslatedText locale={locale}>{getStatic('min_read')}</TranslatedText></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </section>
                        )}

                        {/* Latest Articles Grid */}
                        {gridArticles.length > 0 && (
                            <section className="px-margin-mobile md:px-margin-desktop py-12 pb-32">
                                <div className="max-w-[1280px] mx-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                                        {gridArticles.map((article, idx) => (
                                            <Link 
                                                href={`/articles/${article.slug}`} 
                                                key={article.id}
                                                ref={addToRefs}
                                                className={`group flex flex-col opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 3) * 100}`}
                                            >
                                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a]">
                                                    <img 
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-80 group-hover:opacity-100" 
                                                        alt={t(article, 'title')} 
                                                        src={article.thumbnail}
                                                    />
                                                </div>
                                                
                                                <div className="flex flex-col flex-1">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/40">
                                                            <TranslatedText locale={locale}>{getStatic(`category_${getArticleCategory(article)}`)}</TranslatedText>
                                                        </span>
                                                        <span className="text-[10px] font-sans uppercase tracking-widest text-white/30">
                                                            {getReadTime(article)} <TranslatedText locale={locale}>{getStatic('min_read')}</TranslatedText>
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-2xl font-serif text-white leading-tight mb-4 group-hover:underline decoration-white/30 underline-offset-4 transition-all">
                                                        <TranslatedText locale={locale}>{t(article, 'title')}</TranslatedText>
                                                    </h3>
                                                    
                                                    <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-2 mb-6">
                                                        <TranslatedText locale={locale}>{t(article, 'desc')}</TranslatedText>
                                                    </p>
                                                    
                                                    <div className="mt-auto font-sans text-xs uppercase tracking-widest text-white/40 pt-4 border-t border-white/5">
                                                        {formatDate(article.created_at)}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </PublicLayout>
    );
}

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicIndex({ articles = [] }) {
    const { locale, t } = useContext(TranslationContext);
    const [searchTerm, setSearchTerm] = useState('');

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
    }, [searchTerm]);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    const getStatic = (key) => {
        const text = {
            title: { id: 'Publikasi Editorial', en: 'Editorial Publications' },
            desc: {
                id: 'Wawasan, analisis, dan pembaruan berita resmi langsung dari jantung Universitas Mulawarman. Menjelajahi keunggulan akademik dan perkembangan institusi.',
                en: 'Insight, analysis, and official news updates directly from the heart of Universitas Mulawarman. Exploring academic excellence and institutional developments.'
            },
            search_placeholder: { id: 'Cari artikel...', en: 'Search articles...' },
            category_all: { id: 'Semua', en: 'All' },
            category_news: { id: 'Berita', en: 'News' },
            category_press_release: { id: 'Pers', en: 'Press' },
            category_coverage: { id: 'Liputan', en: 'Coverage' },
            read_more: { id: 'Baca Selengkapnya', en: 'Read More' },
            empty_state: { id: 'Belum ada artikel publikasi.', en: 'No publications available yet.' }
        };
        return text[key] ? text[key][locale] : '';
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

            {/* Header Section */}
            <section className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop bg-[#050505] overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1280px] mx-auto relative z-10 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-2xl">
                            <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Jurnal Institusi' : 'Institutional Journal'}</TranslatedText></span>
                            <h1 className="editorial-display text-white mb-6">
                                <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                            </h1>
                            <p className="font-sans text-xl text-white/60 leading-relaxed block">
                                <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                            </p>
                        </div>
                        
                        {/* Search Box */}
                        <div className="w-full md:w-80 flex items-center bg-[#080808] border border-white/10 rounded-full px-6 py-4 focus-within:border-white/40 transition-colors">
                            <span className="material-symbols-outlined text-white/50 mr-3">search</span>
                            <input 
                                type="text" 
                                placeholder={getStatic('search_placeholder')}
                                className="bg-transparent border-none focus:ring-0 text-white placeholder-white/30 w-full text-sm font-sans"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-4 mt-16">
                        {['all', 'news', 'press_release', 'coverage'].map(tag => (
                            <button 
                                key={tag}
                                className={`px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                                    tag === 'all' 
                                        ? 'bg-white text-[#050505] font-semibold'
                                        : 'bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40'
                                }`}
                            >
                                <TranslatedText locale={locale}>{getStatic(`category_${tag}`)}</TranslatedText>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="bg-[#050505]">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-24">
                    {filteredArticles.length === 0 ? (
                        <div className="py-20 text-center text-white/60 font-sans">
                            <p className="block"><TranslatedText locale={locale}>{getStatic('empty_state')}</TranslatedText></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredArticles.map((article, idx) => (
                                <Link 
                                    href={`/articles/${article.slug}`} 
                                    key={article.id}
                                    ref={addToRefs}
                                    className={`cinematic-card flex flex-col group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 3) * 100}`}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#080808] rounded-t-3xl">
                                        <div className="absolute top-4 left-4 z-10 cinematic-tag bg-black/40 backdrop-blur-md text-white border-transparent">
                                            <TranslatedText locale={locale}>{getStatic('category_news')}</TranslatedText>
                                        </div>
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                                            alt={t(article, 'title')} 
                                            src={article.thumbnail}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col gap-4 bg-[#050505] rounded-b-3xl">
                                        <div className="font-sans text-xs uppercase tracking-widest text-white/40 mb-2 flex items-center gap-3">
                                            <span>{article.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span>{formatDate(article.created_at)}</span>
                                        </div>
                                        <h3 className="font-sans text-2xl font-light text-white tracking-tight line-clamp-2">
                                            <TranslatedText locale={locale}>{t(article, 'title')}</TranslatedText>
                                        </h3>
                                        <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 flex-grow block">
                                            <TranslatedText locale={locale}>{t(article, 'desc')}</TranslatedText>
                                        </p>
                                        <div className="inline-flex items-center gap-2 font-sans text-sm text-white/80 group-hover:text-white transition-colors mt-auto">
                                            <TranslatedText locale={locale}>{getStatic('read_more')}</TranslatedText>
                                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

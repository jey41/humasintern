import React, { useContext, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicShow({ article, recentArticles = [] }) {
    const { locale, t } = useContext(TranslationContext);

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
            back_btn: { id: 'Kembali ke Publikasi', en: 'Back to Publications' },
            author_label: { id: 'Penulis', en: 'Author' },
            date_label: { id: 'Tanggal', en: 'Published Date' },
            recent_title: { id: 'Artikel Terkait', en: 'Related Publications' },
            read_more: { id: 'Baca Selengkapnya', en: 'Read More' },
            category_label: { id: 'Berita', en: 'News' }
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

    return (
        <PublicLayout>
            <Head title={`${t(article, 'title')} - Humas Intern Unmul`} />

            <div className="bg-[#050505]">
                {/* Article Header */}
                <header className="relative pt-32 pb-24 border-b border-white/5">
                    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop text-center animate-fade-in-up">
                        <Link 
                            href="/articles" 
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all mb-12"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Kembali ke Artikel' : 'Back to Articles'}</TranslatedText>
                        </Link>
                        
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="cinematic-tag">
                                <TranslatedText locale={locale}>{locale === 'id' ? 'Berita' : 'News'}</TranslatedText>
                            </span>
                            <span className="font-sans text-xs uppercase tracking-widest text-white/40">
                                {formatDate(article.created_at)}
                            </span>
                        </div>
                        
                        <h1 className="editorial-display text-white mb-8 leading-tight">
                            <TranslatedText locale={locale}>{t(article, 'title')}</TranslatedText>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6 text-sm font-sans uppercase tracking-widest text-white/50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">person</span>
                                <span>{article.author}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 py-16">
                    {/* Featured Image */}
                    <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden bg-[#080808] mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <img 
                            src={article.thumbnail} 
                            alt={t(article, 'title')} 
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                        />
                    </div>
                    
                    {/* Article Body */}
                    <article className="prose prose-invert prose-lg max-w-3xl mx-auto font-sans text-white/70 leading-relaxed 
                                      prose-headings:font-sans prose-headings:font-light prose-headings:text-white 
                                      prose-a:text-white prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white
                                      prose-img:rounded-2xl
                                      animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="border-l border-white/20 pl-6 mb-12 text-2xl font-light text-white/90 leading-snug">
                            <TranslatedText locale={locale}>{t(article, 'desc')}</TranslatedText>
                        </div>
                        <TranslatedText locale={locale} as="div" className="article-content" dangerouslySetInnerHTML={{ __html: t(article, 'content') }} />
                    </article>
                </div>

                {/* Other Articles Section */}
                {recentArticles.length > 0 && (
                    <div className="bg-[#080808] border-t border-white/5 mt-16 py-24">
                        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                            <h2 ref={addToRefs} className="editorial-headline text-white mb-16 text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                                <TranslatedText locale={locale}>{locale === 'id' ? 'Artikel Lainnya' : 'Other Articles'}</TranslatedText>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {recentArticles.filter(a => a.id !== article.id).slice(0, 3).map((a, idx) => (
                                    <Link 
                                        href={`/articles/${a.slug}`}
                                        key={a.id}
                                        ref={addToRefs}
                                        className={`cinematic-card flex flex-col group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${idx * 100}`}
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-[#050505] rounded-t-3xl">
                                            <div className="absolute top-4 left-4 z-10 cinematic-tag bg-black/40 backdrop-blur-md text-white border-transparent">
                                                <TranslatedText locale={locale}>{getStatic('category_label')}</TranslatedText>
                                            </div>
                                            <img 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                                                alt={t(a, 'title')} 
                                                src={a.thumbnail}
                                            />
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col gap-4 bg-[#050505] rounded-b-3xl">
                                            <div className="font-sans text-xs uppercase tracking-widest text-white/40 mb-2 flex items-center gap-3">
                                                <span>{a.author}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                <span>{formatDate(a.created_at)}</span>
                                            </div>
                                            <h3 className="font-sans text-xl text-white font-light tracking-tight line-clamp-2">
                                                <TranslatedText locale={locale}>{t(a, 'title')}</TranslatedText>
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

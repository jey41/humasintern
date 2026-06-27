import React, { useContext, useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

// Cinematic Progressive Image Loader
function CinematicImage({ src, alt, className, aspectClass = "", ...props }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`relative w-full overflow-hidden bg-white/[0.02] ${aspectClass}`}>
            <img
                src={src}
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
            back_btn: { id: 'Kembali', en: 'Back' },
            author_label: { id: 'Oleh', en: 'By' },
            recent_title: { id: 'Bacaan Lebih Lanjut', en: 'Further Reading' },
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

    const getReadTime = (content) => {
        if (!content) return 5;
        const text = content.replace(/<[^>]*>?/gm, '');
        const wordCount = text.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 200));
    };

    const getArticleCategory = (item) => {
        const title = t(item, 'title').toLowerCase();
        if (title.includes('prestasi') || title.includes('achievement')) return { id: 'Prestasi', en: 'Achievements' };
        if (title.includes('proyek') || title.includes('project')) return { id: 'Proyek', en: 'Projects' };
        if (title.includes('acara') || title.includes('event')) return { id: 'Acara', en: 'Events' };
        if (title.includes('opini') || title.includes('editorial')) return { id: 'Editorial', en: 'Editorial' };
        return { id: 'Berita', en: 'News' };
    };

    const category = getArticleCategory(article);

    return (
        <PublicLayout>
            <Head title={`${t(article, 'title')} - Humas Intern Unmul`} />

            <div className="bg-[#050505] min-h-screen pb-32">
                {/* Hero Image Section (0px border radius) */}
                <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#0a0a0a] overflow-hidden rounded-none">
                    <CinematicImage 
                        src={article.thumbnail} 
                        alt={t(article, 'title')} 
                        className="w-full h-full object-cover animate-image-reveal"
                        aspectClass="h-full w-full rounded-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] z-10"></div>
                    
                    {/* Back Button Floating on Image */}
                    <div className="absolute top-32 left-margin-mobile md:left-margin-desktop z-20">
                        <Link 
                            href="/articles" 
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-sans uppercase tracking-widest text-white/80 hover:text-white hover:bg-black/60 transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <TranslatedText locale={locale}>{getStatic('back_btn')}</TranslatedText>
                        </Link>
                    </div>
                </div>

                {/* Article Header (Flat, transparent, whitespace-focused - no box card container) */}
                <header className="relative -mt-32 z-20 max-w-4xl mx-auto px-6 md:px-12 animate-fade-in-up">
                    <div className="bg-transparent p-8 md:p-12 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-[2px] border border-white/10 text-xs font-sans uppercase tracking-widest text-white/60 mb-8 bg-white/5 backdrop-blur-sm">
                            <TranslatedText locale={locale}>{category[locale]}</TranslatedText>
                        </span>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] font-serif text-white mb-8 tracking-tight font-normal">
                            <TranslatedText locale={locale}>{t(article, 'title')}</TranslatedText>
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-sans text-xs md:text-sm text-white/50 uppercase tracking-widest pt-4 border-t border-white/5 max-w-xl mx-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-white/40"><TranslatedText locale={locale}>{getStatic('author_label')}</TranslatedText></span>
                                <span className="text-white/90 font-medium">{article.author}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
                            <div className="flex items-center gap-2">
                                <span>{formatDate(article.created_at)}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
                            <div className="flex items-center gap-2">
                                <span>{getReadTime(t(article, 'content'))} <TranslatedText locale={locale}>{getStatic('min_read')}</TranslatedText></span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-3xl mx-auto px-6 md:px-0 py-16 md:py-24 relative z-10">
                    <article className="prose prose-invert prose-lg md:prose-xl max-w-none font-sans text-white/70 leading-relaxed 
                                      prose-headings:font-serif prose-headings:font-normal prose-headings:text-white prose-headings:tracking-tight
                                      prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                                      prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
                                      prose-p:mb-8 prose-p:leading-[1.8]
                                      prose-a:text-white prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white transition-colors
                                      prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:pl-8 prose-blockquote:text-white/90 prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:leading-snug
                                      prose-img:rounded-none prose-img:w-full prose-img:my-16
                                      animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        
                        <div className="text-2xl md:text-3xl font-serif text-white/95 leading-snug mb-16 pb-16 border-b border-white/5 font-light">
                            <TranslatedText locale={locale}>{t(article, 'desc')}</TranslatedText>
                        </div>
                        
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: t(article, 'content') }} />
                    </article>
                </div>

                {/* Related Articles Section (subtle 2px corners, whitespace driven) */}
                {recentArticles.length > 0 && (
                    <div className="border-t border-white/5 pt-24 mt-8">
                        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                            <h2 ref={addToRefs} className="text-4xl font-serif text-white mb-16 text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                                <TranslatedText locale={locale}>{getStatic('recent_title')}</TranslatedText>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
                                {recentArticles.filter(a => a.id !== article.id).slice(0, 3).map((a, idx) => (
                                    <Link 
                                        href={`/articles/${a.slug}`}
                                        key={a.id}
                                        ref={addToRefs}
                                        className={`group flex flex-col opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${idx * 100}`}
                                    >
                                        <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden mb-6 bg-white/[0.01]">
                                            <CinematicImage 
                                                className="w-full h-full object-cover transform group-hover:scale-[1.02] group-hover:brightness-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                                                alt={t(a, 'title')} 
                                                src={a.thumbnail}
                                                aspectClass="h-full w-full rounded-[2px]"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-sans uppercase tracking-widest text-white/40">
                                                    <TranslatedText locale={locale}>{getArticleCategory(a)[locale]}</TranslatedText>
                                                </span>
                                                <span className="text-[10px] font-sans uppercase tracking-widest text-white/30">
                                                    {getReadTime(t(a, 'content'))} <TranslatedText locale={locale}>{getStatic('min_read')}</TranslatedText>
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-2xl font-serif text-white leading-tight mb-4 group-hover:text-white/80 transition-colors">
                                                <TranslatedText locale={locale}>{t(a, 'title')}</TranslatedText>
                                            </h3>
                                            
                                            <div className="mt-auto font-sans text-xs uppercase tracking-widest text-white/40 pt-4 border-t border-white/5">
                                                {formatDate(a.created_at)}
                                            </div>
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

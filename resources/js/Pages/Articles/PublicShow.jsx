import React, { useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicShow({ article, recentArticles = [] }) {
    const { locale, t } = useContext(TranslationContext);

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

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Article Header */}
                <header className="bg-neo-navy pt-32 pb-32 border-b-2 border-neo-border">
                    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
                        <Link 
                            href="/articles" 
                            className="inline-flex items-center gap-2 border-2 border-neo-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-secondary/10 transition-colors mb-8"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            {locale === 'id' ? 'Kembali ke Artikel' : 'Back to Articles'}
                        </Link>
                        
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="neo-tag-amber">
                                {locale === 'id' ? 'Berita' : 'News'}
                            </span>
                            <span className="font-mono text-[11px] text-white/40">
                                {formatDate(article.created_at)}
                            </span>
                        </div>
                        
                        <h1 className="editorial-display text-white mb-6">
                            {t(article, 'title')}
                        </h1>
                        
                        <div className="flex items-center justify-center gap-4 text-sm font-mono text-white/60 mt-8">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">person</span>
                                <span>{article.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop -mt-16 relative z-10">
                    {/* Featured Image */}
                    <div className="w-full aspect-video border-2 border-neo-border shadow-neo-lg rounded-none bg-neo-navy mb-12">
                        <img 
                            src={article.thumbnail} 
                            alt={t(article, 'title')} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Article Body */}
                    <article className="neo-card rounded-none p-8 md:p-12 prose prose-invert prose-lg max-w-none">
                        <div className="border-l-4 border-secondary pl-4 italic text-white/60 font-sans text-body-lg my-md">
                            {t(article, 'desc')}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: t(article, 'content') }} />
                    </article>
                </div>

                {/* Other Articles Section */}
                {recentArticles.length > 0 && (
                    <div className="bg-neo-navy border-t-2 border-neo-border mt-20 py-xl">
                        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                            <h2 className="editorial-headline text-white mb-8">
                                {locale === 'id' ? 'Artikel Lainnya' : 'Other Articles'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                                {recentArticles.filter(a => a.id !== article.id).slice(0, 3).map((a) => (
                                    <Link 
                                        href={`/articles/${a.slug}`}
                                        key={a.id}
                                        className="neo-card rounded-none overflow-hidden flex flex-col group"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-neo-navy border-b-2 border-neo-border">
                                            <div className="neo-tag-amber absolute top-3 left-3 z-10">
                                                {getStatic('category_news')}
                                            </div>
                                            <img 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                alt={t(a, 'title')} 
                                                src={a.thumbnail}
                                            />
                                        </div>
                                        <div className="p-md flex-1 flex flex-col gap-xs">
                                            <div className="font-mono text-[11px] text-white/40 mb-2">
                                                <span>{a.author}</span>
                                                <span className="mx-2">•</span>
                                                <span>{formatDate(a.created_at)}</span>
                                            </div>
                                            <h3 className="font-display text-xl text-white font-bold line-clamp-2 group-hover:text-secondary transition-colors">
                                                {t(a, 'title')}
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

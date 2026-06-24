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

            <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-[960px] mx-auto w-full flex flex-col gap-lg">
                {/* Back Link */}
                <Link 
                    href="/articles" 
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-bold text-sm w-fit group"
                >
                    <span className="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                    {getStatic('back_btn')}
                </Link>

                {/* Article Header */}
                <header className="space-y-sm">
                    <div className="inline-flex items-center gap-xs">
                        <span className="bg-secondary/15 text-secondary border border-secondary/20 font-label-md text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                            {getStatic('category_label')}
                        </span>
                    </div>
                    <h1 className="font-display text-display-lg text-white font-extrabold leading-tight">
                        {t(article, 'title')}
                    </h1>
                    <div className="flex flex-wrap items-center gap-md text-sm text-on-surface-variant pt-2 border-t border-white/10">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">person</span> {article.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">calendar_month</span> {formatDate(article.created_at)}</span>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] bg-surface-container">
                    <img 
                        className="w-full h-full object-cover" 
                        alt={t(article, 'title')} 
                        src={article.thumbnail}
                    />
                </div>

                {/* Article Description Summary */}
                <div className="border-l-4 border-secondary pl-4 italic text-on-surface-variant font-sans text-body-lg my-md">
                    {t(article, 'desc')}
                </div>

                {/* Article Body Content */}
                <article className="prose prose-invert max-w-none font-sans text-body-md text-on-surface-variant leading-relaxed space-y-md my-md">
                    {t(article, 'content').split('\n').map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
                </article>

                {/* Recent Articles at bottom */}
                {recentArticles.length > 0 && (
                    <section className="border-t border-white/10 pt-xl mt-xl space-y-lg">
                        <h2 className="font-display text-headline-lg text-white font-bold">{getStatic('recent_title')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                            {recentArticles.filter(a => a.id !== article.id).slice(0, 2).map((a) => (
                                <Link 
                                    key={a.id}
                                    href={`/articles/${a.slug}`}
                                    className="bg-primary-container border border-white/10 rounded-2xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 flex flex-col p-md gap-sm"
                                >
                                    <div className="flex items-center gap-sm text-[12px] text-on-surface-variant font-semibold">
                                        <span>{a.author}</span>
                                        <span>•</span>
                                        <span>{formatDate(a.created_at)}</span>
                                    </div>
                                    <h3 className="font-display text-headline-md text-white group-hover:text-secondary transition-colors line-clamp-2 font-semibold">
                                        {t(a, 'title')}
                                    </h3>
                                    <p className="font-sans text-body-md text-on-surface-variant line-clamp-2">
                                        {t(a, 'desc')}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-label-md text-sm text-secondary group-hover:text-secondary/80 mt-auto font-bold">
                                        {getStatic('read_more')}
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </PublicLayout>
    );
}

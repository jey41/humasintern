import React, { useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function Welcome({ recentArticles = [] }) {
    const { locale, t } = useContext(TranslationContext);

    const getStatic = (key) => {
        const text = {
            hero_title: {
                id: 'Pusat Publikasi & Informasi Humas Universitas Mulawarman',
                en: 'Center for Publication & Information of Universitas Mulawarman Public Relations'
            },
            hero_desc: {
                id: 'Membangun koneksi, menyebarkan inspirasi, dan memperkuat identitas akademik Universitas Mulawarman ke kancah global.',
                en: 'Building connections, spreading inspiration, and strengthening the academic identity of Universitas Mulawarman globally.'
            },
            hero_btn: { id: 'Jelajahi Program', en: 'Explore Programs' },
            about_badge: { id: 'Tentang Kami', en: 'About Us' },
            about_title: { id: 'Siapa Kami', en: 'Who We Are' },
            about_desc: {
                id: 'Kami adalah tim Humas Intern (Public Relations Intern) yang berdedikasi untuk membangun dan menjaga citra positif Universitas Mulawarman. Melalui strategi komunikasi digital yang inovatif, manajemen informasi yang akurat, dan publikasi yang berdampak, kami berperan sebagai jembatan antara institusi dan publik.',
                en: 'We are a dedicated team of Public Relations Interns committed to building and maintaining a positive image of Universitas Mulawarman. Through innovative digital communication strategies, accurate information management, and impactful publications, we act as a bridge between the institution and the public.'
            },
            about_link: {
                id: 'Pelajari lebih lanjut tentang peran kami',
                en: 'Learn more about our roles and contributions'
            },
            articles_title: { id: 'Publikasi Terkini', en: 'Recent Publications' },
            articles_desc: {
                id: 'Berita dan informasi terbaru dari lingkungan kampus.',
                en: 'The latest news and updates from the campus community.'
            },
            articles_more: { id: 'Lihat Semua Publikasi', en: 'View All Publications' },
            read_more: { id: 'Baca Selengkapnya', en: 'Read More' },
            category_news: { id: 'Berita', en: 'News' }
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

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Beranda - Humas Intern Unmul' : 'Home - Humas Intern Unmul'} />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 border-b-2 border-neo-border">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        className="w-full h-full object-cover" 
                        alt="Hero Background" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdOC_GshqVgYZLTXfO-qZ8CcHWMkf-Syhs8Lx5jTenJ5L0vLtTYbQW19qAzfZu7esB-7uYb-AfHTFWJZSzG9V8AGV0x-eN7p4ckNSttS4dGb_ygr8lVmtImxWNnPw5EwBxgz_ACZPgalVlgZKGF7zFbIAljOncUnfTUqKCFwE4x_8w180oCxGMIzLqQTIi5XkgSgSEV6pUe-JCckf09sdtkSVFmyL5hHQUwP7HhDu0gvIaXUKtCz1AMK7_Gxh9elc5mlzY3AWTBEg"
                    />
                    <div className="absolute inset-0 bg-neo-navy/80"></div>
                </div>
                
                {/* Overlay Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #DCA100 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full text-center flex flex-col items-center">
                    <div className="w-16 h-1.5 bg-secondary mb-8"></div>
                    <h1 className="editorial-display text-white max-w-4xl mb-6 text-5xl md:text-7xl leading-tight">
                        {getStatic('hero_title')}
                    </h1>
                    <p className="font-sans text-body-lg text-white/80 max-w-2xl leading-relaxed mb-10 text-lg md:text-xl">
                        {getStatic('hero_desc')}
                    </p>
                    <Link 
                        href="/projects" 
                        className="neo-btn-primary rounded-none text-base tracking-wide px-8 py-4"
                    >
                        {getStatic('hero_btn')}
                    </Link>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-xl bg-surface-container-lowest">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-xl items-center">
                        <div className="md:col-span-6 space-y-md">
                            <div className="neo-tag-amber">
                                {getStatic('about_badge')}
                            </div>
                            <h2 className="editorial-headline text-white">{getStatic('about_title')}</h2>
                            <div className="neo-divider-accent mt-4 mb-6"></div>
                            <p className="font-sans text-body-lg text-white/60 leading-relaxed">
                                {getStatic('about_desc')}
                            </p>
                            <Link 
                                href="/about" 
                                className="neo-btn-outline rounded-none text-xs mt-sm"
                            >
                                {getStatic('about_link')}
                            </Link>
                        </div>
                        <div className="md:col-span-6 relative">
                            <div className="border-2 border-neo-border shadow-neo-lg overflow-hidden aspect-[4/3] bg-neo-navy">
                                <img 
                                    className="w-full h-full object-cover" 
                                    alt="Student collaboration" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU9zhai1JAleY5cnyPQQz4LmWd85S1hl6UOxOKbYVx7iOyP62F_rdnn4cOaHnIw1VEcu4f1QPx19-TlIwuB6JekJVFiR3afiezgdalReZB4niCxu1qalniWOBVEZ8B9QL-nAn3XaMhyxoq2Ci7IlPMT-vbR84HOr204RBwrhS3rN4tGcXm8ff3pQTSEYHJO5WAiieWXATuQs8pc4PJt5ZJD5K5e15OjFUr7ike6vv2xTt7J7kS14RUrDU13anoLry2vMcITtsPtPA"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Articles Section */}
            <section className="py-xl bg-neo-navy">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop space-y-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-sm">
                        <div className="space-y-xs">
                            <h2 className="editorial-headline text-white">{getStatic('articles_title')}</h2>
                            <p className="editorial-overline text-white/60">{getStatic('articles_desc')}</p>
                        </div>
                        <Link 
                            href="/articles" 
                            className="neo-btn-outline rounded-none text-xs"
                        >
                            {getStatic('articles_more')}
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-8">
                        {recentArticles.map((article) => (
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
                                    <h3 className="font-display text-lg text-white font-bold line-clamp-2">
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
                </div>
            </section>
        </PublicLayout>
    );
}

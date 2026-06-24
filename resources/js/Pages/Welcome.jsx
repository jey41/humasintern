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
            <section className="relative h-screen min-h-[600px] flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#031A38]/80 mix-blend-multiply z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A38] via-transparent to-[#031A38]/50 z-10"></div>
                    <div 
                        className="bg-cover bg-center w-full h-full" 
                        style={{ 
                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdOC_GshqVgYZLTXfO-qZ8CcHWMkf-Syhs8Lx5jTenJ5L0vLtTYbQW19qAzfZu7esB-7uYb-AfHTFWJZSzG9V8AGV0x-eN7p4ckNSttS4dGb_ygr8lVmtImxWNnPw5EwBxgz_ACZPgalVlgZKGF7zFbIAljOncUnfTUqKCFwE4x_8w180oCxGMIzLqQTIi5XkgSgSEV6pUe-JCckf09sdtkSVFmyL5hHQUwP7HhDu0gvIaXUKtCz1AMK7_Gxh9elc5mlzY3AWTBEg')" 
                        }}
                    ></div>
                </div>
                <div className="relative z-20 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col items-start gap-lg">
                    <div className="max-w-3xl space-y-md">
                        <h1 className="font-display text-display-lg text-white font-extrabold leading-tight">
                            {getStatic('hero_title')}
                        </h1>
                        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
                            {getStatic('hero_desc')}
                        </p>
                    </div>
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-[#031A38] font-bold rounded-full hover:brightness-90 transition-all duration-300 shadow-[0_4px_20px_rgba(229,169,15,0.3)] hover:shadow-[0_6px_25px_rgba(229,169,15,0.4)] active:scale-95 text-sm"
                    >
                        {getStatic('hero_btn')}
                    </Link>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-xl relative overflow-hidden bg-[#031A38]">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/20 to-transparent pointer-events-none"></div>
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
                        <div className="space-y-md">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                                <span className="material-symbols-outlined text-secondary text-sm icon-filled">info</span>
                                <span className="font-label-md text-[12px] text-secondary font-bold uppercase tracking-wider">{getStatic('about_badge')}</span>
                            </div>
                            <h2 className="font-display text-headline-lg text-white font-bold">{getStatic('about_title')}</h2>
                            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
                                {getStatic('about_desc')}
                            </p>
                            <Link 
                                href="/about" 
                                className="inline-flex items-center gap-2 font-label-md text-sm text-secondary hover:text-secondary/80 transition-colors mt-sm group font-bold"
                            >
                                {getStatic('about_link')}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary-container/30 blur-2xl rounded-full z-0"></div>
                            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] aspect-[4/3] bg-surface-container">
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
            <section className="py-xl bg-surface-container-lowest">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop space-y-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-sm">
                        <div className="space-y-xs">
                            <h2 className="font-display text-headline-lg text-white font-bold">{getStatic('articles_title')}</h2>
                            <p className="font-sans text-body-md text-on-surface-variant">{getStatic('articles_desc')}</p>
                        </div>
                        <Link 
                            href="/articles" 
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary-container text-white hover:bg-primary-container transition-all font-label-md text-xs font-bold"
                        >
                            {getStatic('articles_more')}
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        {recentArticles.map((article) => (
                            <article 
                                key={article.id}
                                className="bg-[#062D5F] rounded-2xl border border-white/10 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-secondary/15 backdrop-blur-md border border-secondary/20 rounded-full">
                                        <span className="font-label-md text-[10px] text-secondary font-bold uppercase tracking-wider">{getStatic('category_news')}</span>
                                    </div>
                                    <img 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={t(article, 'title')} 
                                        src={article.thumbnail}
                                    />
                                </div>
                                <div className="p-md flex-1 flex flex-col gap-xs">
                                    <div className="flex items-center gap-sm text-[12px] text-on-surface-variant font-semibold">
                                        <span>{article.author}</span>
                                        <span>•</span>
                                        <span>{formatDate(article.created_at)}</span>
                                    </div>
                                    <h3 className="font-display text-headline-md text-white font-semibold line-clamp-2">
                                        {t(article, 'title')}
                                    </h3>
                                    <p className="font-sans text-body-md text-on-surface-variant line-clamp-3 mb-md flex-grow">
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

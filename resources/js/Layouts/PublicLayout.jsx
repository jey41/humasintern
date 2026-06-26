import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import CinematicNavigation from '@/Components/CinematicNavigation';
import TranslatedText from '@/Components/Transitions/TranslatedText';

// Create a simple custom Context for translation
export const TranslationContext = React.createContext({
    locale: 'id',
    setLocale: () => {},
    t: (obj, field) => ''
});

export default function PublicLayout({ children }) {
    const [locale, setLocale] = useState(() => {
        return localStorage.getItem('locale') || 'id';
    });
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Helper to translate database objects (e.g. title_id / title_en)
    const t = (obj, field) => {
        if (!obj) return '';
        const fieldName = `${field}_${locale}`;
        return obj[fieldName] || obj[`${field}_id`] || obj[field] || '';
    };

    // Helper for static text translations
    const getStaticText = (key) => {
        const text = {
            nav_home: { id: 'Beranda', en: 'Home' },
            nav_projects: { id: 'Proyek', en: 'Projects' },
            nav_articles: { id: 'Editorial', en: 'Editorial' },
            nav_gallery: { id: 'Galeri', en: 'Gallery' },
            nav_members: { id: 'Batch', en: 'Batch' },
            nav_about: { id: 'Tentang Kami', en: 'About Us' },
            nav_login: { id: 'Masuk Portal', en: 'Portal Login' },
            footer_desc: {
                id: 'Membangun koneksi, menyebarkan inspirasi, dan memperkuat identitas akademik Universitas Mulawarman ke kancah global.',
                en: 'Building connections, spreading inspiration, and strengthening the academic identity of Universitas Mulawarman globally.'
            },
            footer_explore: { id: 'Taut Pintar', en: 'Explore' },
            footer_connect: { id: 'Hubungi Kami', en: 'Connect' },
            newsletter_title: { id: 'Langganan Buletin', en: 'Stay Updated' },
            newsletter_placeholder: { id: 'email@unmul.ac.id', en: 'email@unmul.ac.id' },
            newsletter_btn: { id: 'GABUNG', en: 'JOIN' },
            affiliated: { id: 'Afiliasi Resmi', en: 'Affiliated With' },
            campus: { id: 'UNIVERSITAS MULAWARMAN', en: 'UNMUL UNIVERSITY' }
        };
        return text[key] ? text[key][locale] : '';
    };

    const isRouteActive = (routePath) => {
        return window.location.pathname === routePath;
    };

    const navItems = [
        { path: '/', label: getStaticText('nav_home') },
        { path: '/projects', label: getStaticText('nav_projects') },
        { path: '/articles', label: getStaticText('nav_articles') },
        { path: '/gallery', label: getStaticText('nav_gallery') },
        { path: '/batch', label: getStaticText('nav_members') },
        { path: '/about', label: getStaticText('nav_about') },
    ];

    return (
        <TranslationContext.Provider value={{ locale, setLocale, t }}>
            <div className="bg-[#050505] text-white min-h-screen flex flex-col font-sans selection:bg-white/20 selection:text-white">
                
                {/* Cinematic Hybrid Navigation */}
                <CinematicNavigation 
                    navItems={navItems} 
                    loginText={getStaticText('nav_login')} 
                    locale={locale} 
                    setLocale={setLocale} 
                />

                {/* Main Content */}
                <div className="flex-grow animate-fade-in-up">
                    {children}
                </div>


                {/* Footer */}
                <footer className="w-full bg-black border-t border-white/5 mt-32 relative z-10">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-cinematic-padding grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="flex flex-col gap-6">
                            <span className="font-sans text-xl font-medium tracking-wide">Humas Intern Unmul</span>
                            <p className="font-sans text-white/50 leading-relaxed max-w-sm text-sm block">
                                <TranslatedText locale={locale}>{getStaticText('footer_desc')}</TranslatedText>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-sans text-[11px] uppercase tracking-widest text-white/30 mb-2"><TranslatedText locale={locale}>{getStaticText('footer_explore')}</TranslatedText></h4>
                                <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_home')}</TranslatedText></Link>
                                <Link href="/projects" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_projects')}</TranslatedText></Link>
                                <Link href="/articles" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_articles')}</TranslatedText></Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-sans text-[11px] uppercase tracking-widest text-white/30 mb-2"><TranslatedText locale={locale}>{getStaticText('footer_connect')}</TranslatedText></h4>
                                <Link href="/batch" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_members')}</TranslatedText></Link>
                                <Link href="/gallery" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_gallery')}</TranslatedText></Link>
                                <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors block"><TranslatedText locale={locale}>{getStaticText('nav_about')}</TranslatedText></Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="font-sans text-[11px] uppercase tracking-widest text-white/30"><TranslatedText locale={locale}>{getStaticText('newsletter_title')}</TranslatedText></h4>
                            <div className="flex bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                                <input 
                                    className="bg-transparent text-white px-6 w-full focus:outline-none placeholder:text-white/30 border-0 focus:ring-0 text-sm" 
                                    placeholder={getStaticText('newsletter_placeholder')} 
                                    type="email"
                                />
                                <button className="cinematic-btn-primary py-2 px-6">
                                    <TranslatedText locale={locale}>{getStaticText('newsletter_btn')}</TranslatedText>
                                </button>
                            </div>
                            <p className="text-white/30 text-[11px] tracking-widest uppercase mt-4 block">
                                <TranslatedText locale={locale}>{locale === 'id' ? '© 2026 Humas Universitas Mulawarman.' : '© 2026 Public Relations Universitas Mulawarman.'}</TranslatedText>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </TranslationContext.Provider>
    );
}

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

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

    return (
        <TranslationContext.Provider value={{ locale, setLocale, t }}>
            <div className="bg-[#031A38] text-on-surface min-h-screen flex flex-col font-sans selection:bg-secondary selection:text-on-secondary-container">
                {/* TopNavBar */}
                <header className="fixed top-0 w-full z-50 bg-primary-container/70 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-300">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center gap-xs cursor-pointer hover:opacity-85 transition-opacity">
                            <span className="material-symbols-outlined text-[32px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                            <span className="font-headline-md text-headline-md font-bold text-secondary tracking-tight">Humas Intern Unmul</span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex gap-md">
                            <Link 
                                href="/" 
                                className={`${
                                    isRouteActive('/') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_home')}
                            </Link>
                            <Link 
                                href="/projects" 
                                className={`${
                                    isRouteActive('/projects') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_projects')}
                            </Link>
                            <Link 
                                href="/articles" 
                                className={`${
                                    isRouteActive('/articles') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_articles')}
                            </Link>
                            <Link 
                                href="/gallery" 
                                className={`${
                                    isRouteActive('/gallery') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_gallery')}
                            </Link>
                            <Link 
                                href="/batch" 
                                className={`${
                                    isRouteActive('/batch') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_members')}
                            </Link>
                            <Link 
                                href="/about" 
                                className={`${
                                    isRouteActive('/about') 
                                        ? 'text-secondary font-bold border-b-2 border-secondary pb-1' 
                                        : 'text-on-primary-container opacity-80 hover:opacity-100 hover:text-secondary'
                                } transition-all duration-200 font-body-md text-body-md`}
                            >
                                {getStaticText('nav_about')}
                            </Link>
                        </nav>

                        {/* Trailing Actions */}
                        <div className="flex items-center gap-sm text-primary">
                            {/* Bilingual Switch */}
                            <button 
                                onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95 flex items-center justify-center font-bold text-sm tracking-widest text-secondary cursor-pointer"
                                title="Change Language"
                            >
                                {locale.toUpperCase()}
                            </button>

                            {/* Theme Switch */}
                            <button 
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
                                title="Toggle Theme"
                            >
                                <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                            </button>

                            {/* Admin Portal Login Link */}
                            <Link 
                                href="/login" 
                                className="hidden sm:inline-flex items-center justify-center px-6 py-2 bg-secondary text-[#031A38] hover:bg-secondary/90 transition-all font-label-md text-label-md rounded-full font-bold active:scale-95 shadow-md shadow-secondary/15"
                            >
                                {getStaticText('nav_login')}
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-grow pt-20">
                    {children}
                </div>

                {/* Floating Campus Identity Badge */}
                <div className="fixed bottom-gutter right-gutter z-40">
                    <div className="bg-[#1D6B3A] text-white p-sm rounded shadow-lg flex items-center gap-sm border border-white/10">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                        <div className="leading-tight">
                            <p className="font-label-md text-[10px] uppercase opacity-80">{getStaticText('affiliated')}</p>
                            <p className="font-label-md text-label-md font-bold tracking-tight">{getStaticText('campus')}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="w-full bg-primary-container text-on-primary-container border-t border-white/10 mt-auto">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        <div className="flex flex-col gap-sm">
                            <span className="font-headline-md text-headline-md font-bold text-secondary">Humas Intern Unmul</span>
                            <p className="font-body-md text-body-md opacity-80 mt-2 max-w-sm">
                                {getStaticText('footer_desc')}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-sm">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-white font-label-md text-label-md uppercase tracking-wider mb-xs">{getStaticText('footer_explore')}</h4>
                                <Link href="/" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_home')}</Link>
                                <Link href="/projects" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_projects')}</Link>
                                <Link href="/articles" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_articles')}</Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-white font-label-md text-label-md uppercase tracking-wider mb-xs">{getStaticText('footer_connect')}</h4>
                                <Link href="/batch" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_members')}</Link>
                                <Link href="/gallery" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_gallery')}</Link>
                                <Link href="/about" className="text-on-primary-container/80 hover:text-secondary text-sm">{getStaticText('nav_about')}</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-sm">
                            <h4 className="text-white font-label-md text-label-md uppercase tracking-wider mb-xs">{getStaticText('newsletter_title')}</h4>
                            <div className="flex rounded-full overflow-hidden border-2 border-secondary max-w-md bg-[#031A38]">
                                <input 
                                    className="bg-transparent text-white px-md py-xs w-full focus:outline-none placeholder:text-on-primary-container/50 border-0 focus:ring-0 text-sm" 
                                    placeholder={getStaticText('newsletter_placeholder')} 
                                    type="email"
                                />
                                <button className="bg-secondary text-[#031A38] px-md font-label-md font-bold text-xs uppercase cursor-pointer hover:bg-secondary/90 transition-colors">
                                    {getStaticText('newsletter_btn')}
                                </button>
                            </div>
                            <p className="text-[12px] opacity-75 mt-sm">
                                © 2026 Humas Universitas Mulawarman. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </TranslationContext.Provider>
    );
}

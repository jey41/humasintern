import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import CinematicNavigation from '@/Components/CinematicNavigation';
import CinematicFooter from '@/Components/CinematicFooter';
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
    const [footerHeight, setFooterHeight] = useState(0);
    const footerRef = useRef(null);

    useEffect(() => {
        if (!footerRef.current) return;
        
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setFooterHeight(entry.contentRect.height);
            }
        });
        
        resizeObserver.observe(footerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

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
            <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white/20 selection:text-white relative">
                
                {/* Top Layer: Nav & Main Content */}
                <div 
                    className="relative z-10 bg-[#050505] flex flex-col min-h-screen transition-all duration-300 shadow-[0_30px_60px_rgba(0,0,0,1)]"
                    style={{ marginBottom: `${footerHeight}px` }}
                >
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
                </div>

                {/* Bottom Layer: Fixed Parallax Footer */}
                <div className="fixed bottom-0 left-0 w-full z-0">
                    <CinematicFooter 
                        ref={footerRef}
                        getStaticText={getStaticText} 
                        navItems={navItems} 
                    />
                </div>

            </div>
        </TranslationContext.Provider>
    );
}

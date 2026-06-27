import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import TranslatedText from '@/Components/Transitions/TranslatedText';
import MagneticButton from '@/Components/Transitions/MagneticButton';
import { playUITick } from '@/utils/sound';

const LanguageSwitcher = ({ locale, setLocale, layoutIdPrefix }) => (
    <div className="relative flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-sm pointer-events-auto">
        <button
            onClick={() => setLocale('id')}
            className={`relative z-10 px-3 py-1.5 font-sans text-[10px] tracking-widest uppercase transition-colors duration-300 ${locale === 'id' ? 'text-black font-medium' : 'text-white/50 hover:text-white'}`}
        >
            ID
            {locale === 'id' && (
                <motion.div
                    layoutId={`${layoutIdPrefix}-lang-indicator`}
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            )}
        </button>
        <button
            onClick={() => setLocale('en')}
            className={`relative z-10 px-3 py-1.5 font-sans text-[10px] tracking-widest uppercase transition-colors duration-300 ${locale === 'en' ? 'text-black font-medium' : 'text-white/50 hover:text-white'}`}
        >
            EN
            {locale === 'en' && (
                <motion.div
                    layoutId={`${layoutIdPrefix}-lang-indicator`}
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            )}
        </button>
    </div>
);

export default function CinematicNavigation({ navItems, loginText, locale, setLocale, logoText = "Humas Intern" }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 120) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case of page reload
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMobileMenuOpen]);

    const isRouteActive = (routePath) => {
        return typeof window !== 'undefined' && window.location.pathname === routePath;
    };

    return (
        <>
            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <AnimatePresence>
                    {!isScrolled ? (
                        <motion.div
                            key="initial-nav"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="fixed inset-0 pointer-events-none z-50"
                        >
                            {/* Top Bar (Logo & CTA) */}
                            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start pointer-events-none">
                                <Link href="/" className="pointer-events-auto flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                                    <img src="/images/logo/logo_unmul.png" alt="Unmul" className="h-10 w-auto object-contain" />
                                    <div className="w-px h-6 bg-white/20"></div>
                                    <img src="/images/logo/logo_humas.png" alt="Humas" className="h-8 w-auto object-contain" />
                                </Link>

                                <div className="pointer-events-auto flex items-center gap-6">
                                    <MagneticButton intensity={0.15}>
                                        <LanguageSwitcher locale={locale} setLocale={setLocale} layoutIdPrefix="initial" />
                                    </MagneticButton>
                                    <MagneticButton intensity={0.15}>
                                        <Link 
                                            href="/login" 
                                            onMouseEnter={playUITick}
                                            className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-2.5 px-6 text-sm font-sans transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                                        >
                                            <TranslatedText locale={locale}>{loginText}</TranslatedText>
                                        </Link>
                                    </MagneticButton>
                                </div>
                            </div>

                            {/* Vertical Navigation (Right Side) */}
                            <nav className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-end pointer-events-auto mix-blend-difference text-white">
                                {navItems.map((item, idx) => (
                                    <Link 
                                        key={item.path}
                                        href={item.path} 
                                        onMouseEnter={playUITick}
                                        className="group flex items-center gap-4 py-1"
                                    >
                                        <span className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 ${isRouteActive(item.path) ? 'opacity-100 text-white' : 'opacity-40'}`}>
                                            {String(idx + 1).padStart(2, '0')} <TranslatedText locale={locale}>{item.label}</TranslatedText>
                                        </span>
                                        <span className={`h-px transition-all duration-300 ease-out bg-white ${isRouteActive(item.path) ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50'}`}></span>
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="scrolled-nav"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="fixed top-6 left-0 w-full z-50 flex justify-center px-10 pointer-events-none"
                        >
                            <div className="flex items-center gap-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-3 px-8 shadow-2xl pointer-events-auto max-w-full">
                                <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                                    <img src="/images/logo/logo_unmul.png" alt="Unmul" className="h-8 w-auto object-contain" />
                                    <div className="w-px h-5 bg-white/20"></div>
                                    <img src="/images/logo/logo_humas.png" alt="Humas" className="h-6 w-auto object-contain" />
                                </Link>

                                <nav className="flex items-center gap-8 shrink-0">
                                    {navItems.map((item) => (
                                        <Link 
                                            key={item.path}
                                            href={item.path}
                                            onMouseEnter={playUITick}
                                            className="relative group py-2"
                                        >
                                            <span className={`font-sans text-sm tracking-wide transition-colors duration-300 whitespace-nowrap ${isRouteActive(item.path) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                                <TranslatedText locale={locale}>{item.label}</TranslatedText>
                                            </span>
                                            <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] bg-white transition-all duration-300 ease-out ${isRouteActive(item.path) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`}></span>
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex items-center gap-6 shrink-0">
                                    <MagneticButton intensity={0.15}>
                                        <LanguageSwitcher locale={locale} setLocale={setLocale} layoutIdPrefix="scrolled" />
                                    </MagneticButton>
                                    <MagneticButton intensity={0.15}>
                                        <Link 
                                            href="/login" 
                                            onMouseEnter={playUITick}
                                            className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-2 px-5 text-sm font-sans transition-all duration-300 hover:bg-white/20 hover:scale-105"
                                        >
                                            <TranslatedText locale={locale}>{loginText}</TranslatedText>
                                        </Link>
                                    </MagneticButton>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <div className="fixed top-0 left-0 w-full p-6 z-[60] flex justify-between items-center pointer-events-none">
                    <Link href="/" className="pointer-events-auto flex items-center gap-3 relative z-[60] cursor-pointer hover:opacity-80 transition-opacity">
                        <img src="/images/logo/logo_unmul.png" alt="Unmul" className="h-8 w-auto object-contain" />
                        <div className="w-px h-5 bg-white/20"></div>
                        <img src="/images/logo/logo_humas.png" alt="Humas" className="h-6 w-auto object-contain" />
                    </Link>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="pointer-events-auto relative z-[60] text-white p-2 flex items-center justify-center"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 z-[55] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
                        >
                            <nav className="flex flex-col items-center gap-8">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Link 
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            onMouseEnter={playUITick}
                                            className={`editorial-display text-5xl md:text-6xl tracking-tight transition-colors duration-300 ${isRouteActive(item.path) ? 'text-white' : 'text-white/40 hover:text-white'}`}
                                        >
                                            <TranslatedText locale={locale}>{item.label}</TranslatedText>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                                className="mt-16 flex flex-col items-center gap-8"
                            >
                                <LanguageSwitcher locale={locale} setLocale={setLocale} layoutIdPrefix="mobile" />
                                <Link 
                                    href="/login" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-8 text-base font-sans transition-all duration-300 hover:bg-white/20 hover:scale-105"
                                >
                                    <TranslatedText locale={locale}>{loginText}</TranslatedText>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

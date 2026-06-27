import React, { useContext, forwardRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

const CinematicFooter = forwardRef(({ getStaticText, navItems }, ref) => {
    const { locale } = useContext(TranslationContext);

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.15,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <footer 
            ref={ref}
            className="w-full bg-[#050505] border-t border-white/5 pt-16 md:pt-20 pb-8 relative z-10 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12 md:gap-16">
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
                    {/* Part 1: Huge Typography */}
                    <div className="w-full lg:w-5/12">
                        <h2 className="text-[18vw] md:text-[10vw] lg:text-[8vw] font-sans font-bold leading-[0.85] tracking-tighter text-white">
                            HUMAS<br/>
                            <span className="text-white/40">INTERN</span>
                        </h2>
                    </div>

                    {/* Part 2: Footer Information Grid */}
                    <div className="w-full lg:w-7/12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                        
                        {/* Navigation */}
                        <div className="flex flex-col gap-6">
                            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                                <TranslatedText locale={locale}>{getStaticText('footer_explore') || 'Explore'}</TranslatedText>
                            </h4>
                            <div className="flex flex-col gap-3">
                                {navItems.map((item, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={item.path} 
                                        className="font-sans text-base text-white/70 hover:text-white transition-all duration-300 relative group inline-flex w-fit"
                                    >
                                        <span>{item.label}</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-6">
                            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Socials</h4>
                            <div className="flex flex-col gap-3">
                                {['Instagram', 'LinkedIn', 'YouTube', 'Spotify'].map((social) => (
                                    <a 
                                        key={social} 
                                        href="#" 
                                        className="font-sans text-base text-white/70 hover:text-white hover:scale-105 origin-left transition-all duration-300 block w-fit"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col gap-6 col-span-2 md:col-span-2">
                            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                                <TranslatedText locale={locale}>{getStaticText('footer_connect') || 'Connect'}</TranslatedText>
                            </h4>
                            <div className="flex flex-col gap-1.5 font-sans text-base text-white/70">
                                <p>Gedung Rektorat Universitas Mulawarman</p>
                                <p>Jl. Kuaro Kotak Pos 1068</p>
                                <p>Samarinda, Kalimantan Timur 75119</p>
                                <a href="mailto:humas@unmul.ac.id" className="text-white hover:underline mt-4 block w-fit">humas@unmul.ac.id</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10">
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-white/30">
                        <TranslatedText locale={locale}>
                            {locale === 'id' ? '© 2026 Humas Intern Universitas Mulawarman.' : '© 2026 Public Relations Universitas Mulawarman.'}
                        </TranslatedText>
                    </p>
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-white/30">
                        <TranslatedText locale={locale}>
                            {locale === 'id' ? 'Dirancang untuk dampak.' : 'Designed for impact.'}
                        </TranslatedText>
                    </p>
                </div>
            </div>
        </footer>
    );
});

export default CinematicFooter;

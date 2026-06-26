import React, { useContext } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function CinematicFooter({ getStaticText, navItems }) {
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
        <motion.footer 
            className="w-full bg-[#050505] border-t border-white/5 pt-32 pb-16 relative z-10 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-24">
                
                {/* Part 1: Huge Typography */}
                <motion.div variants={itemVariants} className="w-full">
                    <h2 className="text-[15vw] md:text-[11vw] font-sans font-bold leading-[0.8] tracking-tighter text-white">
                        HUMAS<br/>
                        <span className="text-white/40">INTERN</span>
                    </h2>
                </motion.div>

                {/* Part 2: Footer Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 pt-16 border-t border-white/10">
                    
                    {/* Navigation */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-8">
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                            <TranslatedText locale={locale}>{getStaticText('footer_explore') || 'Explore'}</TranslatedText>
                        </h4>
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, idx) => (
                                <Link 
                                    key={idx} 
                                    href={item.path} 
                                    className="font-sans text-lg text-white/70 hover:text-white transition-all duration-300 relative group inline-flex w-fit"
                                >
                                    <span>{item.label}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-8">
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Socials</h4>
                        <div className="flex flex-col gap-4">
                            {['Instagram', 'LinkedIn', 'YouTube', 'Spotify'].map((social) => (
                                <a 
                                    key={social} 
                                    href="#" 
                                    className="font-sans text-lg text-white/70 hover:text-white hover:scale-105 origin-left transition-all duration-300 block w-fit"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-8 md:col-span-2">
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                            <TranslatedText locale={locale}>{getStaticText('footer_connect') || 'Connect'}</TranslatedText>
                        </h4>
                        <div className="flex flex-col gap-2 font-sans text-lg text-white/70">
                            <p>Gedung Rektorat Universitas Mulawarman</p>
                            <p>Jl. Kuaro Kotak Pos 1068</p>
                            <p>Samarinda, Kalimantan Timur 75119</p>
                            <a href="mailto:humas@unmul.ac.id" className="text-white hover:underline mt-6 block w-fit">humas@unmul.ac.id</a>
                        </div>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-12 border-t border-white/5">
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
                </motion.div>
            </div>
        </motion.footer>
    );
}

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicIndex({ projects = [] }) {
    const { locale, t } = useContext(TranslationContext);
    const [activeFilter, setActiveFilter] = useState('all');

    const observerRefs = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }
                });
            },
            { threshold: 0.1 }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [activeFilter]);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    const getStatic = (key) => {
        const text = {
            title: { id: 'Kolaborasi Berdampak', en: 'Impactful Collaborations' },
            desc: {
                id: 'Mengeksplorasi sinergi antara penelitian akademis dan hubungan masyarakat yang kreatif. Proyek-proyek kami menjembatani kesenjangan antara modal intelektual Universitas Mulawarman dan lanskap digital yang terus berkembang.',
                en: "Exploring the synergy between academic research and creative public relations. Our projects bridge the gap between Universitas Mulawarman's intellectual capital and the evolving digital landscape."
            },
            filter_all: { id: 'Semua Karya', en: 'All Works' },
            read_more: { id: 'Lihat Detail', en: 'View Details' },
            empty_state: { id: 'Belum ada data proyek.', en: 'No projects available yet.' }
        };
        return text[key] ? text[key][locale] : '';
    };

    const getCategory = (id) => {
        const categories = ['Green Unmul', 'Publication', 'Campus', 'Outreach'];
        return categories[id % categories.length];
    };

    const getFilteredProjects = () => {
        if (activeFilter === 'all') return projects;
        return projects.filter(p => {
            const cat = getCategory(p.id).toLowerCase();
            return cat.includes(activeFilter.split(' ')[0].toLowerCase());
        });
    };

    const filteredProjects = getFilteredProjects();

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Koleksi Proyek - Humas Intern Unmul' : 'Projects Portfolio - Humas Intern Unmul'} />

            {/* Header Section */}
            <section className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop bg-[#050505] overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1280px] mx-auto relative z-10 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-2xl">
                            <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Portofolio' : 'Portfolio'}</TranslatedText></span>
                            <h1 className="editorial-display text-white mb-6">
                                <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                            </h1>
                            <p className="font-sans text-xl text-white/60 leading-relaxed block">
                                <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                            </p>
                        </div>
                        
                        {/* Search Box */}
                        <div className="w-full md:w-80 flex items-center bg-[#080808] border border-white/10 rounded-full px-6 py-4 focus-within:border-white/40 transition-colors">
                            <span className="material-symbols-outlined text-white/50 mr-3">search</span>
                            <input 
                                type="text" 
                                placeholder={locale === 'id' ? 'Cari proyek...' : 'Search projects...'}
                                className="bg-transparent border-none focus:ring-0 text-white placeholder-white/30 w-full text-sm font-sans"
                            />
                        </div>
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-4 mt-16">
                        {['all', 'web', 'mobile', 'design'].map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                                    activeFilter === tag 
                                        ? 'bg-white text-[#050505] font-semibold'
                                        : 'bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40'
                                }`}
                            >
                                <TranslatedText locale={locale}>{tag === 'all' ? getStatic('filter_all') : tag}</TranslatedText>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="bg-[#050505]">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-24">
                    {filteredProjects.length === 0 ? (
                        <div className="py-20 text-center text-white/60 font-sans">
                            <p className="block"><TranslatedText locale={locale}>{getStatic('empty_state')}</TranslatedText></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProjects.map((project, idx) => (
                                <Link 
                                    key={project.id}
                                    href={`/projects/${project.slug}`}
                                    ref={addToRefs}
                                    className={`cinematic-card flex flex-col group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 3) * 100}`}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#080808] rounded-t-3xl">
                                        <div className="absolute top-4 left-4 z-10 cinematic-tag bg-black/40 backdrop-blur-md text-white border-transparent">
                                            {getCategory(project.id)}
                                        </div>
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                                            alt={t(project, 'title')} 
                                            src={project.thumbnail}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col gap-4 bg-[#050505] rounded-b-3xl">
                                        <h3 className="font-sans text-2xl font-light text-white tracking-tight line-clamp-1">
                                            <TranslatedText locale={locale}>{t(project, 'title')}</TranslatedText>
                                        </h3>
                                        <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-2 mt-2 flex-grow block">
                                            <TranslatedText locale={locale}>{t(project, 'desc')}</TranslatedText>
                                        </p>
                                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center font-sans text-xs tracking-widest uppercase text-white/40">
                                            <span>{project.location}</span>
                                            <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                                                <TranslatedText locale={locale}>{getStatic('read_more')}</TranslatedText> <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

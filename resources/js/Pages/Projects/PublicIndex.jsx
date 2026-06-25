import React, { useContext, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicIndex({ projects = [] }) {
    const { locale, t } = useContext(TranslationContext);
    const [activeFilter, setActiveFilter] = useState('all');

    const getStatic = (key) => {
        const text = {
            title: { id: 'Kolaborasi Berdampak', en: 'Impactful Collaborations' },
            desc: {
                id: 'Mengeksplorasi sinergi antara penelitian akademis dan hubungan masyarakat yang kreatif. Proyek-proyek kami menjembatani kesenjangan antara modal intelektual Universitas Mulawarman dan lanskap digital yang terus berkembang.',
                en: "Exploring the synergy between academic research and creative public relations. Our projects bridge the gap between Universitas Mulawarman's intellectual capital and the evolving digital landscape."
            },
            count_label: { id: 'JUMLAH PROYEK:', en: 'PROJECTS COUNT:' },
            filter_all: { id: 'Semua Karya', en: 'All Works' },
            partner_label: { id: 'Mitra', en: 'Partner' },
            location_label: { id: 'Lokasi', en: 'Location' },
            read_more: { id: 'Lihat Detail', en: 'View Details' },
            empty_state: { id: 'Belum ada data proyek.', en: 'No projects available yet.' }
        };
        return text[key] ? text[key][locale] : '';
    };

    // Helper to determine mock category based on ID to match Stitch design
    const getCategory = (id) => {
        const categories = ['Green Unmul', 'Publication', 'Campus', 'Outreach'];
        return categories[id % categories.length];
    };

    const getCategoryBadgeClass = (id) => {
        const idx = id % 4;
        if (idx === 0) return 'bg-[#1D6B3A]/20 text-[#abc7ff] border border-[#1D6B3A]/30';
        if (idx === 1) return 'bg-secondary/15 text-secondary border border-secondary/20';
        if (idx === 2) return 'bg-tertiary-container text-tertiary-fixed border border-tertiary/20';
        return 'bg-error-container/20 text-error border border-error/20';
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

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Header Section */}
                <div className="bg-neo-navy pt-32 pb-16 border-b-2 border-neo-border">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
                            <div className="max-w-2xl">
                                <h1 className="editorial-display text-white mb-4">
                                    {getStatic('title')}
                                </h1>
                                <p className="font-sans text-body-lg text-white/60">
                                    {getStatic('desc')}
                                </p>
                            </div>
                            
                            {/* Search Box */}
                            <div className="w-full md:w-80 flex items-center bg-primary-container border-2 border-neo-border rounded-none px-4 py-2 focus-within:border-secondary shadow-neo-sm transition-colors">
                                <span className="material-symbols-outlined text-white/50 mr-2">search</span>
                                <input 
                                    type="text" 
                                    placeholder={locale === 'id' ? 'Cari proyek...' : 'Search projects...'}
                                    className="bg-transparent border-none focus:ring-0 text-white placeholder-white/40 w-full text-sm font-sans"
                                />
                            </div>
                        </div>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-sm mt-xl">
                            {['all', 'web', 'mobile', 'design'].map(tag => (
                                <button 
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    className={`border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                                        activeFilter === tag 
                                            ? 'bg-secondary border-secondary text-neo-navy shadow-neo-sm' 
                                            : 'border-neo-border text-white hover:bg-secondary/10'
                                    }`}
                                >
                                    {tag === 'all' ? getStatic('filter_all') : tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
                    {filteredProjects.length === 0 ? (
                        <div className="py-20 text-center text-white/60">
                            <p>{getStatic('empty_state')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                            {filteredProjects.map((project) => (
                                <Link 
                                    key={project.id}
                                    href={`/projects/${project.slug}`}
                                    className="neo-card rounded-none overflow-hidden flex flex-col group"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-neo-navy border-b-2 border-neo-border">
                                        <div className="neo-tag-amber absolute top-3 left-3 z-10">
                                            {getCategory(project.id)}
                                        </div>
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            alt={t(project, 'title')} 
                                            src={project.thumbnail}
                                        />
                                    </div>
                                    <div className="p-md flex-1 flex flex-col gap-xs">
                                        <h3 className="font-display text-xl text-white font-bold group-hover:text-secondary transition-colors line-clamp-1">
                                            {t(project, 'title')}
                                        </h3>
                                        <p className="font-sans text-sm text-white/60 line-clamp-2 mt-2">
                                            {t(project, 'desc')}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-neo-border flex justify-between items-center font-mono text-[11px] text-white/40">
                                            <span>{project.location}</span>
                                            <span className="flex items-center gap-1 hover:text-secondary transition-colors">
                                                {getStatic('read_more')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

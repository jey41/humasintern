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

            <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
                {/* Hero Section */}
                <section className="mb-xl grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
                    <div className="md:col-span-8 space-y-md">
                        <h1 className="font-display text-display-lg text-white font-extrabold uppercase leading-tight">
                            {getStatic('title')}
                        </h1>
                        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                            {getStatic('desc')}
                        </p>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                        <div className="bg-secondary-container p-sm border-2 border-white/10 rounded-lg shadow-lg">
                            <span className="font-label-md text-label-md text-[#031A38] font-bold">
                                {getStatic('count_label')} {projects.length}+
                            </span>
                        </div>
                    </div>
                </section>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-sm mb-lg">
                    <button 
                        onClick={() => setActiveFilter('all')}
                        className={`px-6 py-2 rounded-full font-label-md text-label-md font-bold transition-all duration-200 cursor-pointer ${
                            activeFilter === 'all' 
                                ? 'bg-secondary text-[#031A38] shadow-md shadow-secondary/15' 
                                : 'bg-transparent border-2 border-primary-container text-white hover:bg-primary-container'
                        }`}
                    >
                        {getStatic('filter_all')}
                    </button>
                    <button 
                        onClick={() => setActiveFilter('green')}
                        className={`px-6 py-2 rounded-full font-label-md text-label-md font-bold transition-all duration-200 cursor-pointer ${
                            activeFilter === 'green' 
                                ? 'bg-secondary text-[#031A38] shadow-md shadow-secondary/15' 
                                : 'bg-transparent border-2 border-primary-container text-white hover:bg-primary-container'
                        }`}
                    >
                        Green Unmul
                    </button>
                    <button 
                        onClick={() => setActiveFilter('publication')}
                        className={`px-6 py-2 rounded-full font-label-md text-label-md font-bold transition-all duration-200 cursor-pointer ${
                            activeFilter === 'publication' 
                                ? 'bg-secondary text-[#031A38] shadow-md shadow-secondary/15' 
                                : 'bg-transparent border-2 border-primary-container text-white hover:bg-primary-container'
                        }`}
                    >
                        Publication
                    </button>
                    <button 
                        onClick={() => setActiveFilter('campus')}
                        className={`px-6 py-2 rounded-full font-label-md text-label-md font-bold transition-all duration-200 cursor-pointer ${
                            activeFilter === 'campus' 
                                ? 'bg-secondary text-[#031A38] shadow-md shadow-secondary/15' 
                                : 'bg-transparent border-2 border-primary-container text-white hover:bg-primary-container'
                        }`}
                    >
                        Campus
                    </button>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="py-20 text-center text-on-surface-variant">
                        <p>{getStatic('empty_state')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                        {filteredProjects.map((project) => (
                            <div 
                                key={project.id}
                                className="group flex flex-col border border-white/10 rounded-2xl bg-primary-container overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden bg-surface-container">
                                    <img 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={t(project, 'title')} 
                                        src={project.thumbnail}
                                    />
                                    <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(project.id)}`}>
                                        {getCategory(project.id)}
                                    </div>
                                </div>
                                <div className="p-md flex-grow flex flex-col justify-between gap-md">
                                    <div className="space-y-sm">
                                        <div className="flex items-center gap-xs text-secondary text-xs font-semibold">
                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                            <span>{project.location}</span>
                                        </div>
                                        <h3 className="font-display text-headline-md text-white font-bold leading-snug">
                                            {t(project, 'title')}
                                        </h3>
                                        <p className="font-sans text-body-md text-on-surface-variant line-clamp-3">
                                            {t(project, 'desc')}
                                        </p>
                                    </div>
                                    <div className="pt-md border-t border-white/5 flex justify-between items-center mt-auto">
                                        <span className="text-xs font-semibold text-on-primary-container">{getStatic('partner_label')}: {project.partner}</span>
                                        <Link 
                                            href={`/projects/${project.slug}`} 
                                            className="inline-flex items-center gap-1 font-label-md text-xs font-bold text-secondary hover:text-secondary/85 group/btn"
                                        >
                                            {getStatic('read_more')}
                                            <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}

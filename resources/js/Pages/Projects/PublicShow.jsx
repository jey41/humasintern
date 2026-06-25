import React, { useContext } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicShow({ project }) {
    const { locale, t } = useContext(TranslationContext);

    const getStatic = (key) => {
        const text = {
            back_btn: { id: 'Kembali ke Proyek', en: 'Back to Projects' },
            badge_label: { id: 'Studi Kasus', en: 'Case Study' },
            details_title: { id: 'Detail Proyek', en: 'Project Details' },
            partner_label: { id: 'Mitra', en: 'Partner' },
            location_label: { id: 'Lokasi', en: 'Location' },
            date_label: { id: 'Waktu', en: 'Timeline' },
            division_label: { id: 'Divisi Terlibat', en: 'Divisions Involved' },
            div_creative: { id: 'Kreatif', en: 'Creative' },
            div_journal: { id: 'Jurnalis', en: 'Journalist' },
            challenge_title: { id: 'Tantangan & Objektif', en: 'Challenge & Objective' },
            results_title: { id: 'Hasil & Dampak', en: 'Results & Impact' },
            impact1: {
                id: 'Peningkatan 45% engagement rate pada platform media sosial universitas selama periode pelaksanaan.',
                en: '45% increase in engagement rate on university social media platforms during execution.'
            },
            impact2: {
                id: 'Distribusi press release sukses menjangkau media cetak dan online regional maupun nasional.',
                en: 'Successful press release distribution reaching both regional and national print/online media.'
            },
            impact3: {
                id: 'Produksi aset foto dan video beresolusi tinggi yang diarsipkan untuk rekam jejak institusi.',
                en: 'Production of high-resolution photo and video assets archived for institutional records.'
            }
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
            <Head title={`${t(project, 'title')} - Humas Intern Unmul`} />

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Project Header */}
                <header className="bg-neo-navy pt-32 pb-32 border-b-2 border-neo-border">
                    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center gap-2 border-2 border-neo-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-secondary/10 transition-colors mb-8"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            {locale === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
                        </Link>
                        
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="neo-tag-amber">
                                {locale === 'id' ? 'Web Development' : 'Web Development'}
                            </span>
                        </div>
                        
                        <h1 className="editorial-display text-white mb-6">
                            {t(project, 'title')}
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-white/60 mt-8">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-wider mb-1 opacity-50">Client</span>
                                <span className="font-bold text-white">{project.partner}</span>
                            </div>
                            <span className="text-secondary/30">|</span>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-wider mb-1 opacity-50">Location</span>
                                <span className="font-bold text-white">{project.location}</span>
                            </div>
                            <span className="text-secondary/30">|</span>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-wider mb-1 opacity-50">Year</span>
                                <span className="font-bold text-white">2024</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop -mt-16 relative z-10">
                    {/* Featured Image */}
                    <div className="w-full aspect-video border-2 border-neo-border shadow-neo-lg rounded-none bg-neo-navy mb-12">
                        <img 
                            src={project.thumbnail} 
                            alt={t(project, 'title')} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Project Body */}
                    <article className="neo-card rounded-none p-8 md:p-12 prose prose-invert prose-lg max-w-none mb-20">
                        <div className="border-l-4 border-secondary pl-4 italic text-white/60 font-sans text-body-lg my-md">
                            {t(project, 'desc')}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: t(project, 'content') }} />
                    </article>
                </div>
            </div>
        </PublicLayout>
    );
}

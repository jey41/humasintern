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

            <main className="flex-grow w-full relative pt-12">
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_right,_#062d5f_0%,_transparent_40%)]"></div>
                <article className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-xl pb-xl relative z-10 space-y-lg">
                    {/* Back Link */}
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-bold text-sm w-fit group"
                    >
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                        {getStatic('back_btn')}
                    </Link>

                    {/* Header */}
                    <header className="max-w-4xl space-y-md">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            <span className="font-label-md text-xs text-secondary uppercase tracking-wider font-semibold">
                                {getStatic('badge_label')}
                            </span>
                        </div>
                        <h1 className="font-display text-display-lg text-white font-extrabold leading-tight">
                            {t(project, 'title')}
                        </h1>
                        <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
                            {t(project, 'desc')}
                        </p>
                    </header>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pt-md">
                        {/* Sidebar Details */}
                        <aside className="lg:col-span-3 lg:sticky lg:top-[120px] order-2 lg:order-1 bg-navy-glass rounded-2xl p-md">
                            <h3 className="font-display text-headline-md text-white mb-lg pb-sm border-b border-white/10 font-bold">
                                {getStatic('details_title')}
                            </h3>
                            <dl className="space-y-md">
                                <div>
                                    <dt className="font-label-md text-xs text-on-surface-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">handshake</span> {getStatic('partner_label')}
                                    </dt>
                                    <dd className="font-sans text-body-md text-white">{project.partner}</dd>
                                </div>
                                <div>
                                    <dt className="font-label-md text-xs text-on-surface-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span> {getStatic('location_label')}
                                    </dt>
                                    <dd className="font-sans text-body-md text-white">{project.location}</dd>
                                </div>
                                <div>
                                    <dt className="font-label-md text-xs text-on-surface-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">calendar_month</span> {getStatic('date_label')}
                                    </dt>
                                    <dd className="font-sans text-body-md text-white">
                                        {formatDate(project.start_date)} - {formatDate(project.end_date)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-label-md text-xs text-on-surface-variant mb-1 flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[18px]">groups</span> {getStatic('division_label')}
                                    </dt>
                                    <dd className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-3 py-1 bg-surface-container-high text-white text-xs font-semibold rounded-full">{getStatic('div_creative')}</span>
                                        <span className="px-3 py-1 bg-surface-container-high text-white text-xs font-semibold rounded-full">{getStatic('div_journal')}</span>
                                    </dd>
                                </div>
                            </dl>
                        </aside>

                        {/* Case Study Body */}
                        <section className="lg:col-span-9 order-1 lg:order-2 space-y-lg">
                            <figure className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-surface-container aspect-video">
                                <img 
                                    className="w-full h-full object-cover" 
                                    alt={t(project, 'title')} 
                                    src={project.thumbnail}
                                />
                            </figure>

                            <div className="space-y-md">
                                <h2 className="font-display text-headline-lg text-white font-bold">{getStatic('challenge_title')}</h2>
                                <div className="font-sans text-body-md text-on-surface-variant leading-relaxed space-y-md">
                                    {t(project, 'content').split('\n').map((para, index) => (
                                        <p key={index}>{para}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Impact Block */}
                            <div className="bg-surface-container-low rounded-2xl p-lg border border-white/10 mt-xl">
                                <h2 className="font-display text-headline-md text-white mb-md font-bold">{getStatic('results_title')}</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                        <span className="font-sans text-body-md text-on-surface-variant">{getStatic('impact1')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                        <span className="font-sans text-body-md text-on-surface-variant">{getStatic('impact2')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                        <span className="font-sans text-body-md text-on-surface-variant">{getStatic('impact3')}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        </PublicLayout>
    );
}

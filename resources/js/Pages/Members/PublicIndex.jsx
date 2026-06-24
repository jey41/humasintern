import React, { useContext, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function PublicIndex({ members = [], batches = [] }) {
    const { locale } = useContext(TranslationContext);
    
    // Default to the first batch's ID if available
    const [selectedBatchId, setSelectedBatchId] = useState(() => {
        if (batches.length > 0) {
            return batches[0].id;
        }
        return null;
    });

    const getStatic = (key) => {
        const text = {
            title: { id: 'Direktori Batch Magang', en: 'Internship Batches Directory' },
            desc: {
                id: 'Humas Internal Universitas Mulawarman. Temukan tim berbakat di balik inisiatif hubungan masyarakat universitas kami berdasarkan angkatan magang.',
                en: "Humas Internal Universitas Mulawarman. Discover the talented teams behind our university's public relations initiatives grouped by internship batch."
            },
            empty_batches: { id: 'Belum ada batch magang yang terdaftar.', en: 'No internship batches found.' },
            empty_members: { id: 'Belum ada anggota yang terdaftar di batch ini.', en: 'No registered members found in this batch.' }
        };
        return text[key] ? text[key][locale] : '';
    };

    // Find the currently selected batch details
    const activeBatch = batches.find(b => b.id === selectedBatchId);

    // Filter members that belong to the active batch
    const activeMembers = members.filter(member => member.chapter_id === selectedBatchId);

    // Group members by their division
    const groupedMembers = {};
    activeMembers.forEach((member) => {
        const division = member.division || 'Other';
        if (!groupedMembers[division]) {
            groupedMembers[division] = [];
        }
        groupedMembers[division].push(member);
    });

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Batch Magang - Humas Intern Unmul' : 'Internship Batches - Humas Intern Unmul'} />

            <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
                {/* Header & Description */}
                <div className="mb-lg space-y-md">
                    <div>
                        <h1 className="font-display text-display-lg text-white font-extrabold tracking-tight mb-xs">
                            {getStatic('title')}
                        </h1>
                        <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl">
                            {getStatic('desc')}
                        </p>
                    </div>

                    {/* Batch Selection Tabs */}
                    {batches.length === 0 ? (
                        <div className="py-8 text-center text-on-surface-variant">
                            <p>{getStatic('empty_batches')}</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-sm pt-sm border-b border-white/10 pb-md" id="batch-tabs-container">
                            {batches.map((batch) => (
                                <button
                                    key={batch.id}
                                    onClick={() => setSelectedBatchId(batch.id)}
                                    className={`px-6 py-2.5 rounded-full font-label-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                        selectedBatchId === batch.id
                                            ? 'bg-secondary text-[#031A38] shadow-lg shadow-secondary/15'
                                            : 'bg-transparent border-2 border-primary-container text-white hover:bg-primary-container/30'
                                    }`}
                                >
                                    {batch.name_id}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Batch Members Grid grouped by Division */}
                {selectedBatchId && activeMembers.length === 0 ? (
                    <div className="py-20 text-center text-on-surface-variant border border-dashed border-white/10 rounded-2xl bg-primary-container/20">
                        <p className="text-body-lg">{getStatic('empty_members')}</p>
                    </div>
                ) : (
                    <div className="space-y-xl" id="batch-groups">
                        {activeBatch && (
                            <div className="mb-lg p-md rounded-2xl bg-primary-container/30 border border-white/5 flex flex-col md:flex-row items-center gap-md">
                                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container">
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={activeBatch.photo} 
                                        alt={activeBatch.name_id} 
                                    />
                                </div>
                                <div className="flex-1 space-y-xs">
                                    <span className="text-secondary text-xs uppercase font-bold tracking-widest">Active Batch</span>
                                    <h2 className="font-display text-display-md text-white font-extrabold">{activeBatch.name_id}</h2>
                                    <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                                        {locale === 'id' ? activeBatch.desc_id : activeBatch.desc_en}
                                    </p>
                                    <div className="pt-sm flex flex-wrap gap-md text-xs font-semibold text-on-primary-container">
                                        <span>📍 Lokasi: {activeBatch.location}</span>
                                        <span>⚙️ Fokus Utama: {activeBatch.division}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {Object.keys(groupedMembers).map((division) => {
                            const divisionMembers = groupedMembers[division];
                            return (
                                <div key={division} className="space-y-md">
                                    {/* Division Header */}
                                    <div className="flex items-center gap-sm border-b border-white/10 pb-xs">
                                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                                        <h2 className="font-display text-headline-lg text-white font-bold tracking-tight capitalize">
                                            {division}
                                        </h2>
                                    </div>

                                    {/* Division Members Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                                        {divisionMembers.map((member) => (
                                            <div
                                                key={member.id}
                                                className="group relative bg-primary-container/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-lg"
                                            >
                                                <div className="aspect-[4/5] w-full relative overflow-hidden bg-surface-container-highest">
                                                    <img
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        alt={member.name}
                                                        src={member.photo}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A38]/90 via-[#031A38]/20 to-transparent opacity-90"></div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 w-full p-md">
                                                    <div className="inline-flex items-center gap-xs px-3 py-1 bg-[#1D6B3A]/20 backdrop-blur-sm rounded-full mb-xs border border-[#1D6B3A]/30">
                                                        <span className="w-2 h-2 rounded-full bg-[#1D6B3A]"></span>
                                                        <span className="font-label-md text-xs text-[#abc7ff] font-semibold">{member.division}</span>
                                                    </div>
                                                    <h3 className="font-display text-headline-md text-white font-bold">{member.name}</h3>
                                                    <p className="font-sans text-body-md text-on-surface-variant text-sm mt-1">{member.role}</p>

                                                    {/* Social Details / Contact */}
                                                    <div className="mt-2.5 flex items-center gap-sm text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-secondary">
                                                        {member.email && (
                                                            <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:text-white transition-colors" title={member.email}>
                                                                <span className="material-symbols-outlined text-[16px]">mail</span>
                                                            </a>
                                                        )}
                                                        {member.instagram && (
                                                            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors" title={`@${member.instagram}`}>
                                                                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                                                <span>@{member.instagram}</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}

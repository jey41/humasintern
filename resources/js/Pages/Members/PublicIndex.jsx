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

            <div className="min-h-screen bg-surface-container-lowest">
                {/* Header Section */}
                <div className="bg-neo-navy pt-32 pb-16 border-b-2 border-neo-border">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="max-w-3xl mb-12">
                            <h1 className="editorial-display text-white mb-4">
                                {getStatic('title')}
                            </h1>
                            <p className="font-sans text-body-lg text-white/60">
                                {getStatic('desc')}
                            </p>
                        </div>

                        {/* Batch Selection Tabs */}
                        {batches.length === 0 ? (
                            <div className="py-8 text-white/60">
                                <p>{getStatic('empty_batches')}</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-sm">
                                {batches.map((batch) => (
                                    <button
                                        key={batch.id}
                                        onClick={() => setSelectedBatchId(batch.id)}
                                        className={`border-2 px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                                            selectedBatchId === batch.id
                                                ? 'bg-secondary border-secondary text-neo-navy shadow-neo-sm'
                                                : 'border-neo-border text-white hover:bg-secondary/10'
                                        }`}
                                    >
                                        {batch.name_id}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Batch Members Grid grouped by Division */}
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
                {selectedBatchId && activeMembers.length === 0 ? (
                    <div className="py-20 text-center text-white/60">
                        <p>{getStatic('empty_members')}</p>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {activeBatch && activeBatch.photo && (
                            <div className="neo-card rounded-none flex flex-col md:flex-row items-stretch border-2 border-neo-border">
                                <div className="w-full md:w-2/5 border-b-2 md:border-b-0 md:border-r-2 border-neo-border bg-neo-navy">
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={activeBatch.photo} 
                                        alt={activeBatch.name_id} 
                                    />
                                </div>
                                <div className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-center">
                                    <span className="neo-tag-amber self-start mb-4">Active Batch</span>
                                    <h2 className="editorial-headline text-neo-navy mb-4">{activeBatch.name_id}</h2>
                                    <p className="font-sans text-neo-navy/70 leading-relaxed mb-6 max-w-2xl">
                                        {locale === 'id' ? activeBatch.desc_id : activeBatch.desc_en}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-neo-navy/60 font-mono">
                                        <span>LOC: {activeBatch.location}</span>
                                        <span>|</span>
                                        <span>FOCUS: {activeBatch.division}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {Object.keys(groupedMembers).map((division) => {
                            const divisionMembers = groupedMembers[division];
                            return (
                                <div key={division} className="space-y-8">
                                    {/* Division Header */}
                                    <div className="border-b-2 border-neo-border pb-4">
                                        <h2 className="editorial-headline text-white capitalize">
                                            {division}
                                        </h2>
                                    </div>

                                    {/* Division Members Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                                        {divisionMembers.map((member) => (
                                            <div
                                                key={member.id}
                                                className="neo-card rounded-none flex flex-col bg-white overflow-hidden"
                                            >
                                                <div className="aspect-[4/5] w-full relative bg-neo-navy border-b-2 border-neo-border p-4 flex flex-col justify-end">
                                                    {member.photo ? (
                                                        <img
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                            alt={member.name}
                                                            src={member.photo}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                            <span className="material-symbols-outlined text-6xl">person</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-neo-navy/90 via-transparent to-transparent"></div>
                                                    <div className="relative z-10">
                                                        <span className="neo-tag-amber inline-block">
                                                            {member.division}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-4 flex-1 flex flex-col">
                                                    <h3 className="font-display text-lg text-neo-navy font-bold leading-tight mb-1">{member.name}</h3>
                                                    <p className="font-sans text-sm text-neo-navy/60">{member.role}</p>

                                                    {/* Social Details / Contact */}
                                                    <div className="mt-4 pt-4 border-t-2 border-neo-border/10 flex items-center gap-3 text-neo-navy">
                                                        {member.email && (
                                                            <a href={`mailto:${member.email}`} className="hover:text-secondary transition-colors" title={member.email}>
                                                                <span className="material-symbols-outlined text-lg">mail</span>
                                                            </a>
                                                        )}
                                                        {member.instagram && (
                                                            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title={`@${member.instagram}`}>
                                                                <span className="material-symbols-outlined text-lg">photo_camera</span>
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
                </div>
            </div>
        </PublicLayout>
    );
}

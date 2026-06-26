import React, { useContext, useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicIndex({ members = [], batches = [] }) {
    const { locale } = useContext(TranslationContext);
    
    const [selectedBatchId, setSelectedBatchId] = useState(() => {
        if (batches.length > 0) return batches[0].id;
        return null;
    });

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
    }, [selectedBatchId]); // re-run observer when batch changes because DOM updates

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

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

    const activeBatch = batches.find(b => b.id === selectedBatchId);
    const activeMembers = members.filter(member => member.chapter_id === selectedBatchId);

    const groupedMembers = {};
    activeMembers.forEach((member) => {
        const division = member.division || 'Other';
        if (!groupedMembers[division]) groupedMembers[division] = [];
        groupedMembers[division].push(member);
    });

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Batch Magang - Humas Intern Unmul' : 'Internship Batches - Humas Intern Unmul'} />

            {/* Header Section */}
            <section className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop bg-[#050505] overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1280px] mx-auto relative z-10 animate-fade-in-up">
                    <div className="max-w-4xl mb-16">
                        <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Arsip Talenta' : 'Talent Archive'}</TranslatedText></span>
                        <h1 className="editorial-display text-white mb-6">
                            <TranslatedText locale={locale}>{getStatic('title')}</TranslatedText>
                        </h1>
                        <p className="font-sans text-xl text-white/60 leading-relaxed max-w-2xl block">
                            <TranslatedText locale={locale}>{getStatic('desc')}</TranslatedText>
                        </p>
                    </div>

                    {/* Batch Selection Tabs */}
                    {batches.length === 0 ? (
                        <div className="py-8 text-white/60 font-sans">
                            <p className="block"><TranslatedText locale={locale}>{getStatic('empty_batches')}</TranslatedText></p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {batches.map((batch) => (
                                <button
                                    key={batch.id}
                                    onClick={() => setSelectedBatchId(batch.id)}
                                    className={`px-8 py-3 rounded-full font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                                        selectedBatchId === batch.id
                                            ? 'bg-white text-[#050505] font-semibold'
                                            : 'bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40'
                                    }`}
                                >
                                    {batch.name_id}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Active Batch Overview */}
            <section className="bg-[#050505]">
                <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-24">
                    {selectedBatchId && activeMembers.length === 0 ? (
                        <div className="py-20 text-center text-white/60 font-sans">
                            <p className="block"><TranslatedText locale={locale}>{getStatic('empty_members')}</TranslatedText></p>
                        </div>
                    ) : (
                        <div className="space-y-32">
                            {activeBatch && activeBatch.photo && (
                                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                                    <div className="md:col-span-5 space-y-6">
                                        <span className="cinematic-tag border-transparent bg-white/10 text-white/80"><TranslatedText locale={locale}>{locale === 'id' ? 'Batch Aktif' : 'Active Batch'}</TranslatedText></span>
                                        <h2 className="editorial-headline text-white">{activeBatch.name_id}</h2>
                                        <div className="w-12 h-px bg-white/30"></div>
                                        <p className="font-sans text-lg text-white/60 leading-relaxed block">
                                            <TranslatedText locale={locale}>{locale === 'id' ? activeBatch.desc_id : activeBatch.desc_en}</TranslatedText>
                                        </p>
                                        <div className="flex flex-wrap gap-6 text-sm font-sans tracking-widest uppercase text-white/40 pt-4 border-t border-white/10">
                                            <span>Loc: {activeBatch.location}</span>
                                            <span>Focus: {activeBatch.division}</span>
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden relative">
                                            <img 
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                                                src={activeBatch.photo} 
                                                alt={activeBatch.name_id} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Grouped Members */}
                            {Object.keys(groupedMembers).map((division, divIdx) => {
                                const divisionMembers = groupedMembers[division];
                                return (
                                    <div key={division} className="space-y-12">
                                        <div ref={addToRefs} className="border-b border-white/10 pb-6 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                                            <h2 className="editorial-headline text-white capitalize text-3xl md:text-5xl">
                                                {division}
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                            {divisionMembers.map((member, idx) => (
                                                <div
                                                    key={member.id}
                                                    ref={addToRefs}
                                                    className={`cinematic-card flex flex-col group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 4) * 100}`}
                                                >
                                                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#080808]">
                                                        {member.photo ? (
                                                            <img
                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                                                alt={member.name}
                                                                src={member.photo}
                                                            />
                                                        ) : (
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                                <span className="material-symbols-outlined text-6xl">person</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                                                        <div className="absolute top-4 left-4 z-10">
                                                            <span className="cinematic-tag">
                                                                {member.division}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-6 flex-1 flex flex-col bg-[#050505] relative z-20 -mt-6 rounded-t-2xl">
                                                        <h3 className="font-sans text-xl text-white font-light tracking-tight mb-2">{member.name}</h3>
                                                        <p className="font-sans text-sm text-white/50">{member.role}</p>

                                                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4 text-white/40">
                                                            {member.email && (
                                                                <a href={`mailto:${member.email}`} className="hover:text-white transition-colors" title={member.email}>
                                                                    <span className="material-symbols-outlined text-xl">mail</span>
                                                                </a>
                                                            )}
                                                            {member.instagram && (
                                                                <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title={`@${member.instagram}`}>
                                                                    <span className="material-symbols-outlined text-xl">photo_camera</span>
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
            </section>
        </PublicLayout>
    );
}

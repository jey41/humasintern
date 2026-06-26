import React, { useContext, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

export default function PublicShow({ project }) {
    const { locale, t } = useContext(TranslationContext);

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
    }, []);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    return (
        <PublicLayout>
            <Head title={`${t(project, 'title')} - Humas Intern Unmul`} />

            <div className="bg-[#050505]">
                {/* Project Header */}
                <header className="relative pt-32 pb-24 border-b border-white/5">
                    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop text-center animate-fade-in-up">
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all mb-12"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}</TranslatedText>
                        </Link>
                        
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="cinematic-tag">
                                <TranslatedText locale={locale}>{locale === 'id' ? 'Studi Kasus' : 'Case Study'}</TranslatedText>
                            </span>
                        </div>
                        
                        <h1 className="editorial-display text-white mb-12 leading-tight">
                            <TranslatedText locale={locale}>{t(project, 'title')}</TranslatedText>
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-12 text-sm font-sans uppercase tracking-widest text-white/50">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] mb-2 opacity-50"><TranslatedText locale={locale}>{locale === 'id' ? 'Klien' : 'Client'}</TranslatedText></span>
                                <span className="text-white">{project.partner}</span>
                            </div>
                            <span className="w-px h-8 bg-white/10"></span>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] mb-2 opacity-50"><TranslatedText locale={locale}>{locale === 'id' ? 'Lokasi' : 'Location'}</TranslatedText></span>
                                <span className="text-white">{project.location}</span>
                            </div>
                            <span className="w-px h-8 bg-white/10"></span>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] mb-2 opacity-50"><TranslatedText locale={locale}>{locale === 'id' ? 'Tahun' : 'Year'}</TranslatedText></span>
                                <span className="text-white">2024</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 py-16">
                    {/* Featured Image */}
                    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-[#080808] mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <img 
                            src={project.thumbnail} 
                            alt={t(project, 'title')} 
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                        />
                    </div>
                    
                    {/* Project Body */}
                    <article className="prose prose-invert prose-lg max-w-3xl mx-auto font-sans text-white/70 leading-relaxed 
                                      prose-headings:font-sans prose-headings:font-light prose-headings:text-white 
                                      prose-a:text-white prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white
                                      prose-img:rounded-2xl
                                      animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="border-l border-white/20 pl-6 mb-12 text-2xl font-light text-white/90 leading-snug">
                            <TranslatedText locale={locale}>{t(project, 'desc')}</TranslatedText>
                        </div>
                        <TranslatedText locale={locale} as="div" className="article-content" dangerouslySetInnerHTML={{ __html: t(project, 'content') }} />
                    </article>
                </div>
            </div>
        </PublicLayout>
    );
}

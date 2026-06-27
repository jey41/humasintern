import React, { useContext, useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

// Cinematic Progressive Image Loader
function CinematicImage({ src, alt, className, aspectClass = "", ...props }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`relative w-full overflow-hidden bg-white/[0.02] ${aspectClass}`}>
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                className={`${className} transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
                    loaded ? 'blur-0 opacity-100 scale-100' : 'blur-xl opacity-30 scale-105'
                }`}
                {...props}
            />
        </div>
    );
}

export default function About({ chapters = [] }) {
    const { locale, t } = useContext(TranslationContext);

    // Fade-in scroll observer logic
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

    const getStatic = (key) => {
        const text = {
            hero_title: {
                id: 'Membentuk Narasi.',
                en: 'Shaping the narrative.'
            },
            hero_sub: {
                id: 'Menghubungkan Kampus.',
                en: 'Connecting the campus.'
            },
            hero_desc: {
                id: 'Kami adalah suara dari institusi, menerjemahkan keunggulan akademik menjadi cerita yang menarik. Di balik setiap pengumuman ada tim yang berdedikasi bekerja untuk menghubungkan universitas kami dengan dunia.',
                en: 'We are the voice of the institution, translating academic excellence into compelling stories. Behind every announcement is a dedicated team working to bridge the gap between our university and the world.'
            },
            who_title: { id: 'Siapa Kami', en: 'Who We Are' },
            who_p1: {
                id: 'Tim Humas Intern adalah kolektif dinamis dari mahasiswa komunikator, desainer, dan strategis. Beroperasi di bawah Kantor Hubungan Masyarakat, kami mewakili beragam perspektif dari komunitas akademik kami.',
                en: 'The Humas Intern team is a dynamic collective of student communicators, designers, and strategists. Operating within the Public Relations Office, we represent the diverse perspectives of our academic community.'
            },
            who_p2: {
                id: 'Kami tidak hanya menyampaikan informasi; kami aktif membangun identitas universitas. Dengan mengintegrasikan wawasan mahasiswa yang segar dengan standar institusional yang ketat, kami menghadirkan komunikasi yang beresonansi.',
                en: "We aren't just conveying information; we are actively cultivating the university's identity. By integrating fresh student insight with rigorous institutional standards, we deliver communication that resonates."
            },
            what_title: { id: 'Apa Yang Kami Lakukan', en: 'What We Do' },
            bento1_title: { id: 'Strategi Digital', en: 'Digital Strategy' },
            bento1_desc: {
                id: 'Mengatur kehadiran daring kami di berbagai platform untuk memastikan pesan yang konsisten dan berdampak.',
                en: 'Orchestrating our online presence across platforms to ensure consistent, impactful messaging.'
            },
            bento2_title: { id: 'Produksi Media', en: 'Media Production' },
            bento2_desc: {
                id: 'Menangkap esensi kehidupan kampus melalui fotografi dan videografi berkualitas tinggi.',
                en: 'Capturing the essence of campus life through high-quality photography and videography.'
            },
            bento3_title: { id: 'Komunikasi Krisis', en: 'Crisis Communication' },
            bento3_desc: {
                id: 'Mengelola aliran informasi penting untuk menjaga kepercayaan dan kejelasan selama momen-momen penting.',
                en: 'Managing critical information flow to maintain trust and clarity during pivotal moments.'
            },
            culture_title: { id: 'Budaya Kami', en: 'Our Culture' },
            culture_p1: {
                id: 'Kami beroperasi atas dasar kepercayaan, kreativitas, dan pencarian kualitas tanpa henti. Kantor Humas adalah tempat perlindungan bagi para pemikir inovatif yang tidak takut menantang paradigma komunikasi standar.',
                en: 'We operate on trust, creativity, and the relentless pursuit of quality. The PR office is a sanctuary for innovative thinkers who aren\'t afraid to challenge standard communication paradigms.'
            },
            culture_p2: {
                id: 'Kolaborasi bukan sekadar kata kunci; ini adalah garis dasar fungsional kami. Kami belajar satu sama lain, melakukan iterasi dengan cepat, dan mendukung pertumbuhan profesional setiap pemagang yang berjalan melalui pintu kami.',
                en: 'Collaboration isn\'t just a buzzword; it\'s our functional baseline. We learn from each other, iterate rapidly, and support the professional growth of every intern who walks through our doors.'
            },
            culture_tag1: { id: 'Kolaboratif', en: 'Collaborative' },
            culture_tag2: { id: 'Inovatif', en: 'Innovative' },
            culture_tag3: { id: 'Presisi', en: 'Precision' },
            chapters_title: { id: 'Rekam Jejak Chapter', en: 'Chapter Milestones' },
            chapters_desc: {
                id: 'Sejarah perkembangan tim Humas Intern dari masa ke masa.',
                en: 'The developmental history of the Humas Intern team over time.'
            }
        };
        return text[key] ? text[key][locale] : '';
    };

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Tentang Kami - Humas Intern Unmul' : 'About Us - Humas Intern Unmul'} />

            {/* Hero Section */}
            <section className="relative w-full py-40 px-margin-mobile md:px-margin-desktop bg-[#050505] overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-[1280px] mx-auto relative z-10">
                    <div className="max-w-4xl animate-fade-in-up">
                        <h1 className="editorial-display text-white mb-8">
                            <TranslatedText locale={locale}>{getStatic('hero_title')}</TranslatedText><br/>
                            <span className="text-white/40"><TranslatedText locale={locale}>{getStatic('hero_sub')}</TranslatedText></span>
                        </h1>
                        <div className="cinematic-divider-accent mb-12"></div>
                        <p className="font-sans text-xl text-white/60 max-w-2xl leading-relaxed block">
                            <TranslatedText locale={locale}>{getStatic('hero_desc')}</TranslatedText>
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Are Section (0px border radius, flat integration) */}
            <section className="w-full cinematic-section bg-[#050505]">
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="md:col-span-5 order-2 md:order-1 relative z-10 space-y-8">
                        <h2 className="editorial-headline text-white"><TranslatedText locale={locale}>{getStatic('who_title')}</TranslatedText></h2>
                        <div className="w-12 h-px bg-white/30"></div>
                        <p className="font-sans text-lg text-white/60 leading-relaxed block">
                            <TranslatedText locale={locale}>{getStatic('who_p1')}</TranslatedText>
                        </p>
                        <p className="font-sans text-lg text-white/60 leading-relaxed block">
                            <TranslatedText locale={locale}>{getStatic('who_p2')}</TranslatedText>
                        </p>
                    </div>
                    <div className="md:col-span-7 order-1 md:order-2">
                        <div className="aspect-[4/3] w-full overflow-hidden relative group rounded-none">
                            <CinematicImage 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" 
                                alt="Collaborating students" 
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2968&auto=format&fit=crop"
                                aspectClass="h-full w-full rounded-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid (subtle 2px corners, whitespace driven) */}
            <section className="w-full cinematic-section bg-[#080808] border-y border-white/5">
                <div ref={addToRefs} className="opacity-0 translate-y-12 transition-all duration-1000 ease-out mb-16 text-center">
                    <h2 className="editorial-headline text-white mb-4"><TranslatedText locale={locale}>{getStatic('what_title')}</TranslatedText></h2>
                    <p className="text-white/50 font-sans block"><TranslatedText locale={locale}>{locale === 'id' ? 'Keahlian dan dedikasi kami dalam tiga pilar utama.' : 'Our expertise and dedication across three main pillars.'}</TranslatedText></p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div ref={addToRefs} className="relative h-96 flex flex-col justify-end p-8 group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100 rounded-[2px] bg-white/[0.01]">
                        <div className="absolute inset-0 z-0 rounded-[2px] overflow-hidden">
                            <CinematicImage 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-700" 
                                alt="Digital Strategy" 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2830&auto=format&fit=crop"
                                aspectClass="h-full w-full rounded-[2px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
                        </div>
                        <div className="relative z-20">
                            <div className="text-white/30 font-sans tracking-widest text-sm mb-4">01</div>
                            <h3 className="font-sans text-2xl text-white mb-3 font-light tracking-tight"><TranslatedText locale={locale}>{getStatic('bento1_title')}</TranslatedText></h3>
                            <p className="font-sans text-sm text-white/60 leading-relaxed block"><TranslatedText locale={locale}>{getStatic('bento1_desc')}</TranslatedText></p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div ref={addToRefs} className="relative h-96 flex flex-col justify-end p-8 group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 rounded-[2px] bg-white/[0.01]">
                        <div className="absolute inset-0 z-0 rounded-[2px] overflow-hidden">
                            <CinematicImage 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-700" 
                                alt="Media Production" 
                                src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2942&auto=format&fit=crop"
                                aspectClass="h-full w-full rounded-[2px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
                        </div>
                        <div className="relative z-20">
                            <div className="text-white/30 font-sans tracking-widest text-sm mb-4">02</div>
                            <h3 className="font-sans text-2xl text-white mb-3 font-light tracking-tight"><TranslatedText locale={locale}>{getStatic('bento2_title')}</TranslatedText></h3>
                            <p className="font-sans text-sm text-white/60 leading-relaxed block"><TranslatedText locale={locale}>{getStatic('bento2_desc')}</TranslatedText></p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div ref={addToRefs} className="relative h-96 flex flex-col justify-end p-8 group opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-300 rounded-[2px] bg-white/[0.01]">
                        <div className="absolute inset-0 z-0 rounded-[2px] overflow-hidden">
                            <CinematicImage 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-700" 
                                alt="Crisis Communication" 
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop"
                                aspectClass="h-full w-full rounded-[2px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
                        </div>
                        <div className="relative z-20">
                            <div className="text-white/30 font-sans tracking-widest text-sm mb-4">03</div>
                            <h3 className="font-sans text-2xl text-white mb-3 font-light tracking-tight"><TranslatedText locale={locale}>{getStatic('bento3_title')}</TranslatedText></h3>
                            <p className="font-sans text-sm text-white/60 leading-relaxed block"><TranslatedText locale={locale}>{getStatic('bento3_desc')}</TranslatedText></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Culture Section (flat, transparent integration) */}
            <section className="w-full cinematic-section bg-[#050505]">
                <div ref={addToRefs} className="bg-transparent py-12 md:py-16 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="space-y-8">
                            <h2 className="editorial-headline text-white"><TranslatedText locale={locale}>{getStatic('culture_title')}</TranslatedText></h2>
                            <p className="font-sans text-lg text-white/60 leading-relaxed block">
                                <TranslatedText locale={locale}>{getStatic('culture_p1')}</TranslatedText>
                            </p>
                            <p className="font-sans text-lg text-white/60 leading-relaxed block">
                                <TranslatedText locale={locale}>{getStatic('culture_p2')}</TranslatedText>
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <span className="cinematic-tag"><TranslatedText locale={locale}>{getStatic('culture_tag1')}</TranslatedText></span>
                                <span className="cinematic-tag"><TranslatedText locale={locale}>{getStatic('culture_tag2')}</TranslatedText></span>
                                <span className="cinematic-tag"><TranslatedText locale={locale}>{getStatic('culture_tag3')}</TranslatedText></span>
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden group rounded-none bg-white/[0.01]">
                            <CinematicImage 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" 
                                alt="Culture details" 
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
                                aspectClass="h-full w-full rounded-none"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapters Database Integration (flat design, subtle 2px corners) */}
            {chapters.length > 0 && (
                <section className="w-full cinematic-section bg-[#080808] border-t border-white/5">
                    <div ref={addToRefs} className="space-y-16 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                        <div className="text-center max-w-2xl mx-auto space-y-4">
                            <h2 className="editorial-headline text-white"><TranslatedText locale={locale}>{getStatic('chapters_title')}</TranslatedText></h2>
                            <p className="font-sans text-lg text-white/50 block"><TranslatedText locale={locale}>{getStatic('chapters_desc')}</TranslatedText></p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {chapters.map((chapter, idx) => (
                                <div 
                                    key={chapter.id}
                                    className={`flex flex-col bg-transparent opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${(idx % 3) * 100}`}
                                    ref={addToRefs}
                                >
                                    <div className="h-64 overflow-hidden relative bg-white/[0.01] rounded-[2px]">
                                        <CinematicImage 
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" 
                                            alt={t(chapter, 'name')} 
                                            src={chapter.photo || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"}
                                            aspectClass="h-full w-full rounded-[2px]"
                                        />
                                        <div className="absolute top-4 right-4 z-10 cinematic-tag bg-black/40 backdrop-blur-md text-white border-transparent">
                                            {chapter.location}
                                        </div>
                                    </div>
                                    <div className="pt-6 flex flex-col flex-grow gap-4 bg-transparent">
                                        <h3 className="font-sans text-2xl font-light text-white tracking-tight"><TranslatedText locale={locale}>{t(chapter, 'name')}</TranslatedText></h3>
                                        <p className="font-sans text-sm text-white/50 leading-relaxed line-clamp-3 block">
                                            <TranslatedText locale={locale}>{t(chapter, 'desc')}</TranslatedText>
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-xs font-sans tracking-widest uppercase text-white/40">
                                            <span><TranslatedText locale={locale}>{locale === 'id' ? 'Divisi:' : 'Division:'}</TranslatedText> {chapter.division}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}

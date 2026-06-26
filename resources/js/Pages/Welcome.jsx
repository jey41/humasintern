import React, { useContext, useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import TranslatedText from '@/Components/Transitions/TranslatedText';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startTime;
                    const animateCount = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        setCount(Math.floor(easeOut * end));
                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(animateCount);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

export default function Welcome({ recentArticles = [] }) {
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
                id: 'Membentuk Narasi Masa Depan.',
                en: 'Shaping the Future Narrative.'
            },
            hero_desc: {
                id: 'Universitas Mulawarman. Suara dari institusi, mengukir jejak digital, dan menghubungkan kampus dengan dunia.',
                en: 'Universitas Mulawarman. The voice of the institution, carving digital footprints, and connecting the campus with the world.'
            },
            hero_btn: { id: 'Jelajahi Cerita', en: 'Explore Stories' },
            impact_num1: { id: 'Alumni Magang Mahasiswa', en: 'Student Internship Alumni' },
            impact_num2: { id: 'Proyek Selesai', en: 'Projects Delivered' },
            impact_num3: { id: 'Artikel Publikasi', en: 'Published Articles' },
            timeline_title: { id: 'Perjalanan Kami', en: 'Our Journey' },
            quote: { 
                id: '"Komunikasi bukan hanya sekedar menyampaikan pesan, tetapi tentang menciptakan ruang bagi pemahaman dan kolaborasi tanpa batas."',
                en: '"Communication is not just about delivering a message, but about creating space for infinite understanding and collaboration."'
            },
            cta_title: { id: 'Siap Menjadi Bagian?', en: 'Ready to Join Us?' },
            cta_btn: { id: 'Lihat Direktori', en: 'View Directory' },
        };
        return text[key] ? text[key][locale] : '';
    };

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Beranda - Humas Intern Unmul' : 'Home - Humas Intern Unmul'} />

            {/* SECTION 1: HERO (100vh) */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        className="w-full h-full object-cover animate-image-zoom" 
                        alt="Hero Background" 
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center mt-20">
                    <h1 className="editorial-display text-white max-w-5xl animate-fade-in-up">
                        <TranslatedText locale={locale}>{getStatic('hero_title')}</TranslatedText>
                    </h1>
                </div>
            </section>

            {/* SECTION 2: EDITORIAL SPLIT */}
            <section className="cinematic-section bg-[#050505]">
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="md:col-span-5 space-y-8">
                        <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Identitas' : 'Identity'}</TranslatedText></span>
                        <h2 className="editorial-headline text-white">
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Membangun Jembatan Informasi' : 'Building Bridges of Information'}</TranslatedText>
                        </h2>
                        <div className="w-12 h-px bg-white/30"></div>
                        <p className="font-sans text-lg text-white/60 leading-relaxed block">
                            <TranslatedText locale={locale}>{locale === 'id' 
                                ? 'Kami bukan sekadar divisi, melainkan kurator yang menenun setiap kisah akademik menjadi sebuah mahakarya. Di era digital, kecepatan adalah kunci, namun akurasi adalah ruh dari setiap publikasi.'
                                : 'We are not just a division, but curators who weave every academic story into a masterpiece. In the digital era, speed is key, but accuracy is the soul of every publication.'}</TranslatedText>
                        </p>
                        <Link href="/about" className="cinematic-btn-outline mt-4 inline-block">
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Pelajari Lebih Lanjut' : 'Learn More'}</TranslatedText>
                        </Link>
                    </div>
                    <div className="md:col-span-7">
                        <div className="relative aspect-[4/5] md:aspect-[3/4] w-full rounded-2xl overflow-hidden group">
                            <img 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                alt="Editorial Split" 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FULL WIDTH VISUAL BREAK */}
            <section ref={addToRefs} className="relative h-[80vh] w-full opacity-0 translate-y-12 transition-all duration-1000 ease-out my-cinematic-spacing">
                <img 
                    className="w-full h-full object-cover fixed-attachment" 
                    alt="Visual Break" 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop"
                    style={{ backgroundAttachment: 'fixed' }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="editorial-headline text-white text-center max-w-4xl px-8 drop-shadow-2xl">
                        <TranslatedText locale={locale}>{locale === 'id' ? 'Inovasi dalam setiap bingkai komunikasi.' : 'Innovation in every frame of communication.'}</TranslatedText>
                    </h2>
                </div>
            </section>

            {/* SECTION 4: ALTERNATING STORY GRID */}
            <section className="cinematic-section bg-[#050505]">
                <div className="space-y-40">
                    {/* Row 1: Image Left, Content Right */}
                    <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                        <div className="aspect-square rounded-3xl overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" alt="Strategy" />
                        </div>
                        <div className="space-y-6">
                            <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Strategi Digital' : 'Digital Strategy'}</TranslatedText></span>
                            <h3 className="text-4xl font-sans font-light tracking-tight text-white mb-6">
                                <TranslatedText locale={locale}>{locale === 'id' ? 'Orkestrasi Presensi Daring' : 'Orchestrating Online Presence'}</TranslatedText>
                            </h3>
                            <p className="text-lg text-white/50 leading-relaxed font-sans block">
                                <TranslatedText locale={locale}>{locale === 'id' 
                                    ? 'Mengkurasi setiap unggahan, memastikan suara institusi terdengar dengan jernih, profesional, dan berwibawa di setiap platform media sosial.'
                                    : 'Curating every post, ensuring the institution\'s voice is heard clearly, professionally, and authoritatively across all social media platforms.'}</TranslatedText>
                            </p>
                        </div>
                    </div>

                    {/* Row 2: Content Left, Image Right */}
                    <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                        <div className="order-2 md:order-1 space-y-6">
                            <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Produksi Media' : 'Media Production'}</TranslatedText></span>
                            <h3 className="text-4xl font-sans font-light tracking-tight text-white mb-6">
                                <TranslatedText locale={locale}>{locale === 'id' ? 'Menangkap Esensi' : 'Capturing the Essence'}</TranslatedText>
                            </h3>
                            <p className="text-lg text-white/50 leading-relaxed font-sans block">
                                <TranslatedText locale={locale}>{locale === 'id' 
                                    ? 'Lewat lensa kamera, kami membekukan momen-momen bersejarah, mengubah acara rutin menjadi dokumentasi sinematik yang memukau.'
                                    : 'Through the camera lens, we freeze historic moments, turning routine events into stunning cinematic documentation.'}</TranslatedText>
                            </p>
                        </div>
                        <div className="order-1 md:order-2 aspect-[4/3] rounded-3xl overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2940&auto=format&fit=crop" alt="Production" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: IMPACT NUMBERS */}
            <section className="border-y border-white/5 bg-[#080808] py-24 my-cinematic-spacing">
                <div ref={addToRefs} className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-16 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="text-center flex flex-col items-center">
                        <span className="text-7xl font-sans font-light text-white mb-4"><CountUp end={42} suffix="+" /></span>
                        <span className="font-sans text-sm tracking-widest uppercase text-white/50"><TranslatedText locale={locale}>{getStatic('impact_num1')}</TranslatedText></span>
                    </div>
                    <div className="text-center flex flex-col items-center md:border-x border-white/10">
                        <span className="text-7xl font-sans font-light text-white mb-4"><CountUp end={120} /></span>
                        <span className="font-sans text-sm tracking-widest uppercase text-white/50"><TranslatedText locale={locale}>{getStatic('impact_num2')}</TranslatedText></span>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <span className="text-7xl font-sans font-light text-white mb-4"><CountUp end={350} /></span>
                        <span className="font-sans text-sm tracking-widest uppercase text-white/50"><TranslatedText locale={locale}>{getStatic('impact_num3')}</TranslatedText></span>
                    </div>
                </div>
            </section>

            {/* SECTION 6: CINEMATIC GALLERY */}
            <section className="cinematic-section">
                <div ref={addToRefs} className="mb-16 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <h2 className="editorial-headline text-white text-center">Visual Diary</h2>
                </div>
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-12 gap-6 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="md:col-span-8 aspect-[16/9] rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2940&auto=format&fit=crop" alt="Gallery 1" />
                    </div>
                    <div className="md:col-span-4 aspect-[4/5] rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2940&auto=format&fit=crop" alt="Gallery 2" />
                    </div>
                    <div className="md:col-span-5 aspect-square rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=2874&auto=format&fit=crop" alt="Gallery 3" />
                    </div>
                    <div className="md:col-span-7 aspect-[21/9] rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" alt="Gallery 4" />
                    </div>
                </div>
            </section>

            {/* SECTION 7: FEATURE SPOTLIGHT */}
            <section className="relative h-screen w-full flex items-center bg-[#050505]">
                <div className="absolute inset-0 z-0 md:w-[70%]">
                    <img 
                        className="w-full h-full object-cover" 
                        alt="Spotlight" 
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/80 to-[#050505]"></div>
                </div>
                
                <div ref={addToRefs} className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full flex justify-end opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="md:w-[40%] space-y-8 pl-8 md:pl-0">
                        <span className="editorial-overline"><TranslatedText locale={locale}>{locale === 'id' ? 'Fokus Proyek' : 'Project Focus'}</TranslatedText></span>
                        <h2 className="editorial-headline text-white">
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Publikasi Majalah Kampus' : 'Campus Magazine Publication'}</TranslatedText>
                        </h2>
                        <p className="font-sans text-lg text-white/60 leading-relaxed block">
                            <TranslatedText locale={locale}>{locale === 'id' 
                                ? 'Mendokumentasikan karya dan opini mahasiswa dalam sebuah majalah fisik dan digital yang dikurasi dengan presisi.'
                                : 'Documenting student work and opinions in a precisely curated physical and digital magazine.'}</TranslatedText>
                        </p>
                        <Link href="/projects" className="cinematic-btn-outline mt-4 inline-block">
                            <TranslatedText locale={locale}>{locale === 'id' ? 'Lihat Proyek' : 'View Project'}</TranslatedText>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 8: TIMELINE */}
            <section className="cinematic-section bg-[#050505]">
                <div className="text-center mb-24">
                    <h2 className="editorial-headline text-white"><TranslatedText locale={locale}>{getStatic('timeline_title')}</TranslatedText></h2>
                </div>
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10"></div>
                    
                    {[
                        { year: '2023', text: 'Pembentukan divisi Humas Intern pertama.' },
                        { year: '2024', text: 'Peluncuran portal digital untuk komunikasi mahasiswa.' },
                        { year: '2025', text: 'Integrasi sistem analitik untuk mengukur dampak publikasi.' },
                        { year: '2026', text: 'Evolusi visual menjadi desain web sinematik premium.' }
                    ].map((item, idx) => (
                        <div ref={addToRefs} key={idx} className={`relative flex items-center justify-between mb-24 opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-${idx * 100}`}>
                            <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-12' : 'order-3 pl-12'}`}>
                                <h4 className="text-3xl font-sans font-light text-white mb-2">{item.year}</h4>
                                <p className="text-white/50 text-sm block"><TranslatedText locale={locale}>{locale === 'id' ? item.text : item.enText || item.text}</TranslatedText></p>
                            </div>
                            <div className="w-2/12 flex justify-center order-2">
                                <div className="w-3 h-3 rounded-full bg-white ring-8 ring-[#050505] shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                            </div>
                            <div className={`w-5/12 ${idx % 2 === 0 ? 'order-3' : 'order-1'}`}></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 9: QUOTE SECTION */}
            <section ref={addToRefs} className="py-40 bg-[#080808] opacity-0 translate-y-12 transition-all duration-1000 ease-out border-y border-white/5">
                <div className="max-w-[1000px] mx-auto px-margin-mobile text-center">
                    <span className="material-symbols-outlined text-4xl text-white/20 mb-8">format_quote</span>
                    <h2 className="text-2xl md:text-5xl font-sans font-light text-white leading-tight mb-8">
                        <TranslatedText locale={locale}>{getStatic('quote')}</TranslatedText>
                    </h2>
                    <p className="font-sans text-sm tracking-widest uppercase text-white/40">
                        — Humas Intern Universitas Mulawarman
                    </p>
                </div>
            </section>

            {/* SECTION 10: FINAL CTA */}
            <section className="h-[70vh] flex items-center justify-center relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
                <div ref={addToRefs} className="text-center space-y-10 opacity-0 translate-y-12 transition-all duration-1000 ease-out z-10 px-6">
                    <h2 className="editorial-display text-white"><TranslatedText locale={locale}>{getStatic('cta_title')}</TranslatedText></h2>
                    <p className="font-sans text-lg text-white/50 max-w-xl mx-auto block">
                        <TranslatedText locale={locale}>{locale === 'id' 
                            ? 'Jelajahi portofolio, anggota, dan inisiatif kami dalam merajut informasi.'
                            : 'Explore our portfolio, members, and initiatives in weaving information.'}</TranslatedText>
                    </p>
                    <Link href="/batch" className="cinematic-btn-primary px-10 py-4 text-base mt-8 inline-block">
                        <TranslatedText locale={locale}>{getStatic('cta_btn')}</TranslatedText>
                    </Link>
                </div>
                
                {/* Subtle background glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
                    <div className="w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]"></div>
                </div>
            </section>

        </PublicLayout>
    );
}

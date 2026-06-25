import React, { useContext } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';

export default function About({ chapters = [] }) {
    const { locale, t } = useContext(TranslationContext);

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
            culture_tag3: { id: 'Berorientasi Presisi', en: 'Precision-Driven' },
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
            <section className="w-full pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <div className="max-w-4xl">
                    <h1 className="editorial-display text-white mb-6">
                        {getStatic('hero_title')}<br/>
                        <span className="text-secondary">{getStatic('hero_sub')}</span>
                    </h1>
                    <div className="neo-divider-accent mb-8"></div>
                    <p className="font-sans text-body-lg text-white/60 max-w-2xl leading-relaxed">
                        {getStatic('hero_desc')}
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                    <div className="md:col-span-5 order-2 md:order-1 relative z-10">
                        <div className="neo-card rounded-none p-8">
                            <h2 className="editorial-headline text-white mb-6">{getStatic('who_title')}</h2>
                            <p className="font-sans text-body-md text-white/60 mb-6">
                                {getStatic('who_p1')}
                            </p>
                            <p className="font-sans text-body-md text-white/60">
                                {getStatic('who_p2')}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-8 md:-ml-xl order-1 md:order-2">
                        <div className="aspect-[16/9] w-full border-2 border-neo-border shadow-neo-lg overflow-hidden relative bg-neo-navy">
                            <img 
                                className="w-full h-full object-cover opacity-80" 
                                alt="Collaborating students" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQwbVJeBRfXNEQIa_r821N8UjP7GfHgZ14NOhkwl_CwlIbsTtYq9IMzWH8fFGI2lqJlEBGHQWBxM32S31ojIqovVi6fxK2BcfGTl3uVfZU8XbE7MaPhbIOnE4zyQGwkqsP0ELP3pAjtnoMVYwmWBeYzLC4u6vVs_pkfsGlj6_lORTbZyp8kzEqstuzT8kKCcXI3vGD5TGMrfnfJuk7HdKSbgfBOso2R74PSbUvRyZno8FRrl4EpMzCTRszKxFLjA0eBS4VUee50wE"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <h2 className="editorial-headline text-white mb-12 text-center">{getStatic('what_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="neo-card rounded-none overflow-hidden h-80 flex flex-col justify-end relative group">
                        <div className="absolute top-4 left-4 z-10 neo-tag-amber">01</div>
                        <div className="absolute inset-0 z-0 bg-neo-navy">
                            <img 
                                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" 
                                alt="Digital Strategy" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6hez9UuW_jitx8jNX6cuf-FqkmVLQHoPCBk9OqddTcorEZylzR5BDRb36FdTVmpOmpoMKzm3Hwfxxw3USIcy589pADbotdrplXt1x1VtCR3wI-Q8hwuyScaj5wm7G034Nv1XsECa3V2YuyqRE6vOb1KnnFXdSrCQN7Qs8uQjRSgLyRUy3dg9ZHnWXjhdvP06bbOdq1FCKDdWd7NV7fMAl6CbedDLyFs0QyyeGVAXr46mdciSjRS11Y262eTfMthLCXIQwWdWVOxE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neo-navy to-transparent"></div>
                        </div>
                        <div className="relative z-10 p-6">
                            <h3 className="font-display text-xl text-white mb-2 font-bold">{getStatic('bento1_title')}</h3>
                            <p className="font-sans text-sm text-white/60">{getStatic('bento1_desc')}</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="neo-card rounded-none overflow-hidden h-80 flex flex-col justify-end relative group">
                        <div className="absolute top-4 left-4 z-10 neo-tag-amber">02</div>
                        <div className="absolute inset-0 z-0 bg-neo-navy">
                            <img 
                                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" 
                                alt="Media Production" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEMIaW_8A9ZmAgSTXGe-LrwEF0IKkcGwxx47m7kzvwJuXRJ15c2ZHDarZqJYzNY0QaK5vqzm8c7mmiLESMTSL8wGt9UBwlEYwz5XOryGMcM1P2y8ZumTI1kpagR-N1TqDsi8zMXE6unBuwvh4n3wAbpf6rXVO9uZgmYS5YXVGTlO30Sfpps5oTcuqWCI0SuxP-l-sFHDIFeNLb6ouCCtgwsdB9WUW5HL4CKoxoSjkZlYg_UtwC_Az72NBGVqsPUodkbTeiIX-O0Ts"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neo-navy to-transparent"></div>
                        </div>
                        <div className="relative z-10 p-6">
                            <h3 className="font-display text-xl text-white mb-2 font-bold">{getStatic('bento2_title')}</h3>
                            <p className="font-sans text-sm text-white/60">{getStatic('bento2_desc')}</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="neo-card rounded-none overflow-hidden h-80 flex flex-col justify-end relative group">
                        <div className="absolute top-4 left-4 z-10 neo-tag-amber">03</div>
                        <div className="absolute inset-0 z-0 bg-neo-navy">
                            <img 
                                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" 
                                alt="Crisis Communication" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6iBfYFfJ4y9JuyyC2-FecJ5r1BAIK0_P203JNbWMQFg5y3wcBYxKc1p-FeHoKHKP1IoY3iVcC5yE6mpuJuyVXCgRC80g2_cpFJWwNormz3L3OGWcUxI7HHL_0boCmrxq9Sb5IrmrFj8LKCqlr63c5uqiTUtP6NXwFjqd7-guWp7-ip1wGk_FJHvf8zIIXptV4RDbik1z-LgBGyP4ezBR497AuQh6Vf--SjuRIPLK874ImohUDVPZY_J1mbNDqvjZVQ4IyqA7EdFE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neo-navy to-transparent"></div>
                        </div>
                        <div className="relative z-10 p-6">
                            <h3 className="font-display text-xl text-white mb-2 font-bold">{getStatic('bento3_title')}</h3>
                            <p className="font-sans text-sm text-white/60">{getStatic('bento3_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Culture Section */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <div className="neo-card rounded-none p-8 md:p-12">
                    <div className="relative z-10 flex flex-col md:flex-row gap-lg items-center">
                        <div className="flex-1">
                            <h2 className="editorial-headline text-white mb-6">{getStatic('culture_title')}</h2>
                            <p className="font-sans text-body-md text-white/60 mb-6 leading-relaxed">
                                {getStatic('culture_p1')}
                            </p>
                            <p className="font-sans text-body-md text-white/60 leading-relaxed">
                                {getStatic('culture_p2')}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <span className="neo-tag-amber">{getStatic('culture_tag1')}</span>
                                <span className="neo-tag-amber">{getStatic('culture_tag2')}</span>
                                <span className="neo-tag-amber">{getStatic('culture_tag3')}</span>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <img 
                                className="w-full h-auto border-2 border-neo-border shadow-neo-lg relative z-10 rounded-none" 
                                alt="Culture details" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7SwQxSNxdDkFCPpVtdsgd3ZNPxQh08RUaNg4W-QwTGBVj3FQzjf0QHBAyB3pylg1gU6Fe7jAVLzJXN3cSpSf11KyeNUZRlMXlvocl_tcWaZDb7kh5r2ddBUCSlEXrf2Col95olLaWsUtQMdY8anumJQSXGflARY4S0BqiLUboDg1Hz8OkMBnfSeSKRLEOumVxlilHyBvzhmhtrV9_3YeQFy9BtZcNn3ZL-JMW0MoH4Qf3s6QvZon-0mUSGLaf72Z5PiedN-lxEu4"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapters Database Integration */}
            {chapters.length > 0 && (
                <section className="w-full py-xl bg-surface-container-lowest">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop space-y-lg">
                        <div className="space-y-xs text-center max-w-2xl mx-auto mb-12">
                            <h2 className="editorial-headline text-white">{getStatic('chapters_title')}</h2>
                            <p className="font-sans text-body-md text-white/60">{getStatic('chapters_desc')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                            {chapters.map((chapter) => (
                                <div 
                                    key={chapter.id}
                                    className="neo-card rounded-none overflow-hidden flex flex-col"
                                >
                                    <div className="h-48 overflow-hidden bg-neo-navy relative border-b-2 border-neo-border">
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            alt={t(chapter, 'name')} 
                                            src={chapter.photo}
                                        />
                                        <div className="absolute top-4 right-4 z-10 neo-tag-filled">
                                            {chapter.location}
                                        </div>
                                    </div>
                                    <div className="p-md flex flex-col flex-grow gap-sm">
                                        <h3 className="font-display text-lg text-white font-bold">{t(chapter, 'name')}</h3>
                                        <p className="font-sans text-sm text-white/60 line-clamp-4">
                                            {t(chapter, 'desc')}
                                        </p>
                                        <div className="mt-auto pt-md flex justify-between items-center text-xs font-semibold text-white/40">
                                            <span>Divisi: {chapter.division}</span>
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

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
                    <h1 className="font-editorial-h1 text-white mb-8">
                        {getStatic('hero_title')}<br/>
                        <span className="text-secondary">{getStatic('hero_sub')}</span>
                    </h1>
                    <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                        {getStatic('hero_desc')}
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                    <div className="md:col-span-5 order-2 md:order-1 relative z-10">
                        <div className="bg-primary-container/40 backdrop-blur-md p-md rounded-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                            <h2 className="font-display text-display-lg text-white mb-6 font-bold">{getStatic('who_title')}</h2>
                            <p className="font-sans text-body-md text-on-surface-variant mb-6">
                                {getStatic('who_p1')}
                            </p>
                            <p className="font-sans text-body-md text-on-surface-variant">
                                {getStatic('who_p2')}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-8 md:-ml-xl order-1 md:order-2">
                        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative bg-surface-container">
                            <img 
                                className="w-full h-full object-cover" 
                                alt="Collaborating students" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQwbVJeBRfXNEQIa_r821N8UjP7GfHgZ14NOhkwl_CwlIbsTtYq9IMzWH8fFGI2lqJlEBGHQWBxM32S31ojIqovVi6fxK2BcfGTl3uVfZU8XbE7MaPhbIOnE4zyQGwkqsP0ELP3pAjtnoMVYwmWBeYzLC4u6vVs_pkfsGlj6_lORTbZyp8kzEqstuzT8kKCcXI3vGD5TGMrfnfJuk7HdKSbgfBOso2R74PSbUvRyZno8FRrl4EpMzCTRszKxFLjA0eBS4VUee50wE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#031A38] via-transparent to-transparent opacity-80 md:opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <h2 className="font-display text-display-lg text-white mb-12 text-center font-bold">{getStatic('what_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-primary-container p-md rounded-lg border border-white/10 hover:border-secondary/50 transition-colors group relative overflow-hidden h-80 flex flex-col justify-end">
                        <div className="absolute inset-0 z-0">
                            <img 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                                alt="Digital Strategy" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6hez9UuW_jitx8jNX6cuf-FqkmVLQHoPCBk9OqddTcorEZylzR5BDRb36FdTVmpOmpoMKzm3Hwfxxw3USIcy589pADbotdrplXt1x1VtCR3wI-Q8hwuyScaj5wm7G034Nv1XsECa3V2YuyqRE6vOb1KnnFXdSrCQN7Qs8uQjRSgLyRUy3dg9ZHnWXjhdvP06bbOdq1FCKDdWd7NV7fMAl6CbedDLyFs0QyyeGVAXr46mdciSjRS11Y262eTfMthLCXIQwWdWVOxE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#062D5F] to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-display text-headline-md text-white mb-2 font-semibold">{getStatic('bento1_title')}</h3>
                            <p className="font-sans text-body-md text-on-primary-container">{getStatic('bento1_desc')}</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-primary-container p-md rounded-lg border border-white/10 hover:border-secondary/50 transition-colors group relative overflow-hidden h-80 flex flex-col justify-end">
                        <div className="absolute inset-0 z-0">
                            <img 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                                alt="Media Production" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEMIaW_8A9ZmAgSTXGe-LrwEF0IKkcGwxx47m7kzvwJuXRJ15c2ZHDarZqJYzNY0QaK5vqzm8c7mmiLESMTSL8wGt9UBwlEYwz5XOryGMcM1P2y8ZumTI1kpagR-N1TqDsi8zMXE6unBuwvh4n3wAbpf6rXVO9uZgmYS5YXVGTlO30Sfpps5oTcuqWCI0SuxP-l-sFHDIFeNLb6ouCCtgwsdB9WUW5HL4CKoxoSjkZlYg_UtwC_Az72NBGVqsPUodkbTeiIX-O0Ts"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#062D5F] to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-display text-headline-md text-white mb-2 font-semibold">{getStatic('bento2_title')}</h3>
                            <p className="font-sans text-body-md text-on-primary-container">{getStatic('bento2_desc')}</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-primary-container p-md rounded-lg border border-white/10 hover:border-secondary/50 transition-colors group relative overflow-hidden h-80 flex flex-col justify-end">
                        <div className="absolute inset-0 z-0">
                            <img 
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                                alt="Crisis Communication" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6iBfYFfJ4y9JuyyC2-FecJ5r1BAIK0_P203JNbWMQFg5y3wcBYxKc1p-FeHoKHKP1IoY3iVcC5yE6mpuJuyVXCgRC80g2_cpFJWwNormz3L3OGWcUxI7HHL_0boCmrxq9Sb5IrmrFj8LKCqlr63c5uqiTUtP6NXwFjqd7-guWp7-ip1wGk_FJHvf8zIIXptV4RDbik1z-LgBGyP4ezBR497AuQh6Vf--SjuRIPLK874ImohUDVPZY_J1mbNDqvjZVQ4IyqA7EdFE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#062D5F] to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-display text-headline-md text-white mb-2 font-semibold">{getStatic('bento3_title')}</h3>
                            <p className="font-sans text-body-md text-on-primary-container">{getStatic('bento3_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Culture Section */}
            <section className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-primary-container/30 border border-white/5">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
                    <div className="relative z-10 p-lg md:p-xl flex flex-col md:flex-row gap-lg items-center">
                        <div className="flex-1">
                            <h2 className="font-display text-display-lg text-white mb-6 font-bold">{getStatic('culture_title')}</h2>
                            <p className="font-sans text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                {getStatic('culture_p1')}
                            </p>
                            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                                {getStatic('culture_p2')}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-label-md text-sm border border-secondary/20 font-semibold">{getStatic('culture_tag1')}</span>
                                <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-label-md text-sm border border-secondary/20 font-semibold">{getStatic('culture_tag2')}</span>
                                <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-label-md text-sm border border-secondary/20 font-semibold">{getStatic('culture_tag3')}</span>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <div className="aspect-square rounded-full bg-gradient-to-tr from-primary-container to-secondary/20 absolute -inset-4 blur-3xl opacity-30 animate-pulse"></div>
                            <img 
                                className="w-full h-auto rounded-xl border border-white/10 shadow-2xl relative z-10" 
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
                            <h2 className="font-display text-display-lg text-white font-bold">{getStatic('chapters_title')}</h2>
                            <p className="font-sans text-body-md text-on-surface-variant">{getStatic('chapters_desc')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                            {chapters.map((chapter) => (
                                <div 
                                    key={chapter.id}
                                    className="bg-primary-container border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="h-48 overflow-hidden bg-surface-container relative">
                                        <img 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            alt={t(chapter, 'name')} 
                                            src={chapter.photo}
                                        />
                                        <div className="absolute top-4 right-4 bg-secondary/20 backdrop-blur-md border border-secondary/30 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                                            {chapter.location}
                                        </div>
                                    </div>
                                    <div className="p-md flex flex-col flex-grow gap-sm">
                                        <h3 className="font-display text-headline-md text-white font-bold">{t(chapter, 'name')}</h3>
                                        <p className="font-sans text-body-md text-on-surface-variant text-sm line-clamp-4">
                                            {t(chapter, 'desc')}
                                        </p>
                                        <div className="mt-auto pt-md border-t border-white/5 flex justify-between items-center text-xs font-semibold text-on-primary-container">
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

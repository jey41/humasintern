<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Chapter;
use App\Models\Project;
use App\Models\Article;
use App\Models\Member;
use App\Models\GalleryImage;
use App\Models\ContactSubmission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed admin user
        if (!User::where('email', 'admin@unmul.ac.id')->exists()) {
            User::factory()->create([
                'name' => 'Humas Intern Admin',
                'email' => 'admin@unmul.ac.id',
                'password' => Hash::make('password'),
            ]);
        }

        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);
        }

        // 2. Seed Chapters
        Chapter::truncate();
        Chapter::insert([
            [
                'name_id' => 'Batch 1',
                'name_en' => 'Batch 1',
                'slug' => 'batch-1',
                'desc_id' => 'Batch awal yang membangun ritme dokumentasi, publikasi, dan produksi konten humasinternunmul.',
                'desc_en' => 'The first batch that shaped the documentation, publication, and content production rhythm of humasinternunmul.',
                'division' => 'All',
                'location' => 'Samarinda',
                'photo' => 'https://picsum.photos/seed/chapter1/800/600',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_id' => 'Batch 2',
                'name_en' => 'Batch 2',
                'slug' => 'batch-2',
                'desc_id' => 'Batch yang memperkuat format visual storytelling dan kolaborasi lintas divisi.',
                'desc_en' => 'A batch that strengthened visual storytelling formats and cross-division collaboration.',
                'division' => 'All',
                'location' => 'Samarinda',
                'photo' => 'https://picsum.photos/seed/chapter2/800/600',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_id' => 'Batch 3',
                'name_en' => 'Batch 3',
                'slug' => 'batch-3',
                'desc_id' => 'Batch kreatif yang fokus pada publikasi digital, gallery, dan dokumentasi project.',
                'desc_en' => 'A creative batch focused on digital publication, gallery, and project documentation.',
                'division' => 'All',
                'location' => 'Samarinda',
                'photo' => 'https://picsum.photos/seed/chapter3/800/600',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 3. Seed Projects
        Project::truncate();
        Project::insert([
            [
                'title_id' => 'PKKMB Unmul 2024',
                'title_en' => 'PKKMB Unmul 2024',
                'slug' => 'pkkmb-unmul-2024',
                'desc_id' => 'Publikasi dan dokumentasi kegiatan orientasi mahasiswa baru Universitas Mulawarman.',
                'desc_en' => "Publication and documentation for Universitas Mulawarman's new student orientation.",
                'content_id' => 'Project ini mencakup dokumentasi visual, pengambilan momen utama, kurasi foto, serta penyusunan materi publikasi yang ringkas dan informatif untuk kanal digital kampus.',
                'content_en' => 'This project covers visual documentation, capturing key moments, photo curation, and preparing concise publication materials for campus digital channels.',
                'thumbnail' => 'https://picsum.photos/seed/project1/800/600',
                'start_date' => '2024-08-01',
                'end_date' => '2024-08-05',
                'location' => 'Samarinda',
                'partner' => 'Universitas Mulawarman',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_id' => 'Publikasi Penelitian Muara Badak',
                'title_en' => 'Muara Badak Research Publication',
                'slug' => 'publikasi-penelitian-muara-badak',
                'desc_id' => 'Dukungan publikasi untuk kegiatan penelitian dan dokumentasi lapangan.',
                'desc_en' => 'Publication support for research activities and field documentation.',
                'content_id' => 'Tim membantu merangkum cerita penelitian melalui dokumentasi lapangan, foto kegiatan, dan narasi publikasi agar hasil kegiatan lebih mudah dipahami oleh publik.',
                'content_en' => 'The team helps summarize research stories through field documentation, activity photos, and publication narratives so the outcomes are easier for the public to understand.',
                'thumbnail' => 'https://picsum.photos/seed/project2/800/600',
                'start_date' => '2024-06-14',
                'end_date' => '2024-06-18',
                'location' => 'Muara Badak',
                'partner' => 'Tim Peneliti Unmul',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_id' => 'Podcast Suara Kampus',
                'title_en' => 'Campus Voice Podcast',
                'slug' => 'podcast-suara-kampus',
                'desc_id' => 'Ruang diskusi dan inspirasi seputar kampus, komunikasi, dan generasi muda.',
                'desc_en' => 'A discussion and inspiration space around campus, communication, and young people.',
                'content_id' => 'Podcast ini menjadi format eksplorasi konten audio visual untuk menghadirkan percakapan ringan, informatif, dan dekat dengan mahasiswa.',
                'content_en' => 'This podcast explores audiovisual content to present conversations that are light, informative, and close to students.',
                'thumbnail' => 'https://picsum.photos/seed/project3/800/600',
                'start_date' => '2024-05-28',
                'end_date' => '2024-05-28',
                'location' => 'Samarinda',
                'partner' => 'Universitas Mulawarman',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_id' => 'Galeri Kreasi Humas Intern',
                'title_en' => 'Humas Intern Creative Gallery',
                'slug' => 'galeri-kreasi-humas-intern',
                'desc_id' => 'Pameran karya fotografi, desain, tulisan, dan videografi pemagang.',
                'desc_en' => "A showcase of interns' photography, design, writing, and videography works.",
                'content_id' => 'Galeri Kreasi mengumpulkan karya pilihan pemagang sebagai portfolio digital yang bisa dilihat publik dan menjadi arsip perkembangan kreatif setiap chapter.',
                'content_en' => "Creative Gallery collects selected intern works as a digital portfolio for public viewing and as an archive of each chapter's creative growth.",
                'thumbnail' => 'https://picsum.photos/seed/project4/800/600',
                'start_date' => '2024-04-20',
                'end_date' => '2024-04-20',
                'location' => 'Universitas Mulawarman',
                'partner' => 'Humas Intern',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 4. Seed Articles
        Article::truncate();
        Article::insert([
            [
                'title_id' => 'Behind The Scene Humas Intern Saat Dokumentasi Kegiatan Kampus',
                'title_en' => 'Behind the Scenes of Humas Intern Campus Documentation',
                'slug' => 'behind-the-scene-humas-intern',
                'desc_id' => 'Cerita singkat dari balik kamera, briefing singkat, sampai proses memilih momen yang paling kuat.',
                'desc_en' => 'A short story from behind the camera, quick briefings, and choosing the strongest moments.',
                'content_id' => 'Di balik setiap unggahan kegiatan kampus, ada proses yang cukup panjang. Tim Humas Intern menyiapkan rundown, membagi peran, mengambil dokumentasi, lalu memilih visual yang paling representatif. Proses ini menjadi ruang belajar untuk peka terhadap momen, cepat mengambil keputusan, dan tetap menjaga kualitas komunikasi publik.',
                'content_en' => 'Behind every campus activity post, there is a thoughtful process. The Humas Intern team prepares rundowns, divides roles, captures documentation, and selects visuals that best represent the story. It becomes a space to learn sensitivity to moments, fast decision-making, and quality public communication.',
                'thumbnail' => 'https://picsum.photos/seed/project5/800/600',
                'author' => 'Humas Intern Team',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_id' => 'Mengenal Lebih Dekat Ruang Kreatif Humas Intern Unmul',
                'title_en' => 'Getting to Know the Creative Space of Humas Intern Unmul',
                'slug' => 'mengenal-humas-intern-unmul',
                'desc_id' => 'Kenalan dengan budaya kerja, ritme produksi, dan cara pemagang ikut membawa cerita Unmul lebih dekat.',
                'desc_en' => 'Meet the work culture, production rhythm, and how interns bring Unmul stories closer.',
                'content_id' => 'humasinternunmul adalah ruang belajar dan berkarya. Pemagang terlibat dalam penulisan, desain, fotografi, video, dokumentasi, dan publikasi. Setiap anggota punya kesempatan untuk memahami cara kerja komunikasi kampus yang rapi, kreatif, dan berdampak.',
                'content_en' => 'humasinternunmul is a creative learning space. Interns contribute to writing, design, photography, video, documentation, and publication. Every member has a chance to understand campus communication that is organized, creative, and impactful.',
                'thumbnail' => 'https://picsum.photos/seed/project6/800/600',
                'author' => 'Humas Intern Team',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 5. Seed Members
        Member::truncate();
        Member::insert([
            // Batch 1 Members
            [
                'name' => 'Aufa',
                'role' => 'Creative Director',
                'division' => 'Creative Team',
                'photo' => 'https://picsum.photos/seed/aufa/800/600',
                'email' => 'aufa@unmul.ac.id',
                'instagram' => 'aufa.creative',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rion',
                'role' => 'Creative Designer',
                'division' => 'Creative Team',
                'photo' => 'https://picsum.photos/seed/rion/800/600',
                'email' => 'rion@unmul.ac.id',
                'instagram' => 'rion.designer',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Else',
                'role' => 'Creative Content Writer',
                'division' => 'Creative Team',
                'photo' => 'https://picsum.photos/seed/else/800/600',
                'email' => 'else@unmul.ac.id',
                'instagram' => 'else.content',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rezky',
                'role' => 'Lead Videographer',
                'division' => 'Videographer',
                'photo' => 'https://picsum.photos/seed/rezky/800/600',
                'email' => 'rezky@unmul.ac.id',
                'instagram' => 'rezky.video',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Andi',
                'role' => 'Journalist Lead',
                'division' => 'Jurnalis',
                'photo' => 'https://picsum.photos/seed/andi/800/600',
                'email' => 'andi@unmul.ac.id',
                'instagram' => 'andi.jurnal',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Muflis',
                'role' => 'Journalist Writer',
                'division' => 'Jurnalis',
                'photo' => 'https://picsum.photos/seed/muflis/800/600',
                'email' => 'muflis@unmul.ac.id',
                'instagram' => 'muflis.writer',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Moi',
                'role' => 'Graphic Designer',
                'division' => 'Graphic Design',
                'photo' => 'https://picsum.photos/seed/moi/800/600',
                'email' => 'moi@unmul.ac.id',
                'instagram' => 'moi.design',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nanda',
                'role' => 'Illustrator Lead',
                'division' => 'Illustrator',
                'photo' => 'https://picsum.photos/seed/nanda/800/600',
                'email' => 'nanda@unmul.ac.id',
                'instagram' => 'nanda.illustrator',
                'chapter_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Batch 2 Members
            [
                'name' => 'Dimas Akbar',
                'role' => 'Senior Designer',
                'division' => 'Graphic Design',
                'photo' => 'https://picsum.photos/seed/chapter7/800/600',
                'email' => 'dimas@unmul.ac.id',
                'instagram' => 'dimasakbar',
                'chapter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fira Azzahra',
                'role' => 'Senior Editor',
                'division' => 'Videographer',
                'photo' => 'https://picsum.photos/seed/chapter8/800/600',
                'email' => 'fira@unmul.ac.id',
                'instagram' => 'firaazzahra',
                'chapter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Yusuf Ramadhan',
                'role' => 'Senior Artist',
                'division' => 'Illustrator',
                'photo' => 'https://picsum.photos/seed/chapter9/800/600',
                'email' => 'yusuf@unmul.ac.id',
                'instagram' => 'yusuframadhan',
                'chapter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 6. Seed Gallery
        GalleryImage::truncate();
        GalleryImage::insert([
            [
                'media_url' => 'https://picsum.photos/seed/gallery1/800/800',
                'media_type' => 'image',
                'media_source' => 'local',
                'thumbnail' => null,
                'title' => 'Behind The Scene PKKMB Unmul',
                'caption' => 'PKKMB Unmul Behind the Scenes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'media_url' => 'https://picsum.photos/seed/gallery2/800/800',
                'media_type' => 'image',
                'media_source' => 'local',
                'thumbnail' => null,
                'title' => 'Rapat Konten Mingguan',
                'caption' => 'Weekly Content Meeting',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'media_url' => 'https://youtu.be/fM2vaRJ1WTc?si=lrnMbFbDSVNirsu0',
                'media_type' => 'video',
                'media_source' => 'youtube',
                'thumbnail' => 'https://img.youtube.com/vi/fM2vaRJ1WTc/maxresdefault.jpg',
                'title' => 'Sisi Lain UKT',
                'caption' => 'Liputan khusus seputar UKT di kampus.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'media_url' => 'https://youtu.be/qElTmsBu2H8?si=n-YH1mvNXh2c8IFN',
                'media_type' => 'video',
                'media_source' => 'youtube',
                'thumbnail' => 'https://img.youtube.com/vi/qElTmsBu2H8/maxresdefault.jpg',
                'title' => 'Reels Seru Kampus',
                'caption' => 'Kesibukan teman-teman di siang hari.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'media_url' => 'https://youtu.be/fM2vaRJ1WTc?si=lrnMbFbDSVNirsu0',
                'media_type' => 'video',
                'media_source' => 'youtube',
                'thumbnail' => 'https://img.youtube.com/vi/fM2vaRJ1WTc/maxresdefault.jpg',
                'title' => 'Vlog Kegiatan Mahasiswa',
                'caption' => 'Satu hari bersama Humas Intern.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Insert 20 dummy images for Parallax Photo Wall
        $dummyImages = [];
        for ($i = 1; $i <= 20; $i++) {
            $dummyImages[] = [
                'media_url' => "https://picsum.photos/seed/paralax{$i}/800/1200",
                'media_type' => 'image',
                'media_source' => 'local',
                'thumbnail' => null,
                'title' => "Moment Ke-{$i}",
                'caption' => "Dokumentasi visual berkualitas tinggi dari sudut pandang editorial yang estetis dan berkelas.",
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now(),
            ];
        }
        GalleryImage::insert($dummyImages);

        // 7. Seed Contact Submissions
        ContactSubmission::truncate();
        ContactSubmission::insert([
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'subject' => 'Pertanyaan Kemitraan Liputan',
                'message' => 'Halo tim Humas Intern, kami dari BEM Unmul ingin menanyakan apakah bisa mengajukan kerja sama untuk liputan dokumentasi acara festival seni kami bulan depan? Terima kasih.',
                'status' => 'pending',
                'created_at' => now()->subHours(5),
                'updated_at' => now()->subHours(5),
            ],
            [
                'name' => 'Siti Aminah',
                'email' => 'siti@example.com',
                'subject' => 'Pendaftaran Magang Batch 4',
                'message' => 'Permisi kak, saya mahasiswa Ilmu Komunikasi angkatan 2023. Mau tanya kapan pendaftaran magang Humas Intern Batch 4 akan dibuka ya? Serta apa saja berkas portofolio yang perlu disiapkan?',
                'status' => 'read',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(1),
            ],
            [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'subject' => 'English Article Contribution',
                'message' => 'Hello Humas Intern team! I am an exchange student at Unmul and I am interested in contributing articles about my cultural experiences here. Who should I contact for this? Cheers.',
                'status' => 'replied',
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(3),
            ],
        ]);
    }
}

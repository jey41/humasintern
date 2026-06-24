import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Layers, 
    Briefcase, 
    FileText, 
    Users, 
    Image as ImageIcon, 
    Mail, 
    ArrowUpRight, 
    MessageSquare,
    Clock,
    Plus
} from 'lucide-react';

export default function Dashboard({ metrics, recentSubmissions, recentProjects, recentArticles }) {
    const stats = [
        { 
            name: 'Chapters', 
            value: metrics.chapters, 
            icon: Layers, 
            color: 'from-blue-500 to-indigo-600', 
            route: 'chapters.index',
            desc: 'Internship batches'
        },
        { 
            name: 'Projects', 
            value: metrics.projects, 
            icon: Briefcase, 
            color: 'from-emerald-400 to-teal-600', 
            route: 'projects.index',
            desc: 'Publications & work'
        },
        { 
            name: 'Articles', 
            value: metrics.articles, 
            icon: FileText, 
            color: 'from-amber-400 to-orange-500', 
            route: 'articles.index',
            desc: 'Published blogs'
        },
        { 
            name: 'Members', 
            value: metrics.members, 
            icon: Users, 
            color: 'from-pink-500 to-rose-600', 
            route: 'members.index',
            desc: 'Registered interns'
        },
        { 
            name: 'Gallery', 
            value: metrics.gallery, 
            icon: ImageIcon, 
            color: 'from-purple-500 to-violet-600', 
            route: 'gallery.index',
            desc: 'Visual assets'
        },
        { 
            name: 'Unread Submissions', 
            value: metrics.unreadSubmissions, 
            icon: Mail, 
            color: metrics.unreadSubmissions > 0 ? 'from-red-500 to-orange-600 animate-pulse' : 'from-gray-500 to-slate-600', 
            route: 'submissions.index',
            desc: 'Pending messages'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Humas Intern CMS Dashboard
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        System Online
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Welcome Banner */}
                    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-8 shadow-lg relative">
                        <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pr-12 pointer-events-none">
                            <Layers size={240} className="text-white" />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-extrabold text-white">Selamat Datang di Portal Admin!</h3>
                            <p className="mt-2 text-md text-slate-300">
                                Kelola data chapter, proyek dokumentasi, artikel publikasi, data pemagang, dan galeri kreatif untuk website Humas Intern Universitas Mulawarman.
                            </p>
                            <div className="mt-5 flex gap-3">
                                <Link
                                    href={route('projects.create')}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
                                >
                                    <Plus size={16} /> Proyek Baru
                                </Link>
                                <Link
                                    href={route('articles.create')}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/80 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition border border-slate-600"
                                >
                                    <Plus size={16} /> Tulis Artikel
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {stats.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link 
                                    key={item.name} 
                                    href={route(item.route)}
                                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800 dark:ring-gray-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.name}</p>
                                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.value}</p>
                                            <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
                                        </div>
                                        <div className={`rounded-xl bg-gradient-to-br ${item.color} p-3.5 text-white shadow-sm`}>
                                            <IconComponent size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                                            Kelola {item.name}
                                        </span>
                                        <ArrowUpRight size={14} className="text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Content Section */}
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        
                        {/* Left: Contact Submissions */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-150 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4 dark:border-gray-700">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MessageSquare size={18} className="text-blue-600" />
                                    Pesan Masuk Terbaru
                                </h4>
                                <Link 
                                    href={route('submissions.index')}
                                    className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Lihat Semua
                                </Link>
                            </div>
                            
                            {recentSubmissions.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">Belum ada pesan masuk.</div>
                            ) : (
                                <div className="space-y-4 flex-1">
                                    {recentSubmissions.map((sub) => (
                                        <div key={sub.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/50 transition dark:bg-gray-900 dark:border-gray-800">
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{sub.name}</h5>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                    sub.status === 'pending' ? 'bg-red-50 text-red-700 border border-red-200' :
                                                    sub.status === 'read' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                    'bg-green-50 text-green-700 border border-green-200'
                                                }`}>
                                                    {sub.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{sub.subject}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{sub.message}</p>
                                            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] text-gray-400">
                                                <span className="flex items-center gap-1"><Clock size={10} /> {new Date(sub.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}</span>
                                                <span>{sub.email}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Recent Projects & Articles */}
                        <div className="space-y-8">
                            
                            {/* Recent Projects */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4 dark:border-gray-700">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Briefcase size={18} className="text-emerald-600" />
                                        Proyek Dokumentasi Terbaru
                                    </h4>
                                    <Link 
                                        href={route('projects.index')}
                                        className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>

                                {recentProjects.length === 0 ? (
                                    <div className="text-center py-6 text-gray-400">Belum ada proyek dibuat.</div>
                                ) : (
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {recentProjects.map((project) => (
                                            <div key={project.id} className="py-3 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-900/50 px-2 rounded-lg transition">
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={project.thumbnail} 
                                                        alt={project.title_id} 
                                                        className="w-12 h-8 object-cover rounded bg-gray-100 border border-gray-200" 
                                                    />
                                                    <div>
                                                        <h5 className="font-semibold text-sm text-gray-850 dark:text-gray-200">{project.title_id}</h5>
                                                        <p className="text-xs text-gray-400">{project.partner} • {project.location}</p>
                                                    </div>
                                                </div>
                                                <Link 
                                                    href={route('projects.edit', project.id)}
                                                    className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recent Articles */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4 dark:border-gray-700">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <FileText size={18} className="text-amber-600" />
                                        Artikel Publikasi Terbaru
                                    </h4>
                                    <Link 
                                        href={route('articles.index')}
                                        className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>

                                {recentArticles.length === 0 ? (
                                    <div className="text-center py-6 text-gray-400">Belum ada artikel dipublikasikan.</div>
                                ) : (
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {recentArticles.map((art) => (
                                            <div key={art.id} className="py-3 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-900/50 px-2 rounded-lg transition">
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={art.thumbnail} 
                                                        alt={art.title_id} 
                                                        className="w-12 h-8 object-cover rounded bg-gray-100 border border-gray-200" 
                                                    />
                                                    <div>
                                                        <h5 className="font-semibold text-sm text-gray-850 dark:text-gray-200 line-clamp-1">{art.title_id}</h5>
                                                        <p className="text-xs text-gray-400">Oleh {art.author}</p>
                                                    </div>
                                                </div>
                                                <Link 
                                                    href={route('articles.edit', art.id)}
                                                    className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

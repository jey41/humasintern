import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, MapPin, Tag } from 'lucide-react';

export default function Index({ chapters }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus chapter ini?')) {
            destroy(route('chapters.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Manajemen Chapters (Batch Magang)
                    </h2>
                    <Link
                        href={route('chapters.create')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
                    >
                        <Plus size={16} /> Tambah Chapter
                    </Link>
                </div>
            }
        >
            <Head title="Chapters" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {chapters.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">Belum ada data chapter. Silakan buat chapter pertama Anda!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {chapters.map((chapter) => (
                                <div 
                                    key={chapter.id}
                                    className="overflow-hidden rounded-2xl bg-white border border-gray-155 shadow-sm hover:shadow-md transition duration-300 dark:bg-gray-800 dark:border-gray-700 flex flex-col"
                                >
                                    <div className="h-48 overflow-hidden relative bg-gray-150">
                                        <img 
                                            src={chapter.photo} 
                                            alt={chapter.name_id} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                                            <Tag size={12} /> {chapter.division}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-450 dark:text-gray-400">
                                            <MapPin size={12} /> {chapter.location}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                            {chapter.name_id} / {chapter.name_en}
                                        </h3>
                                        
                                        <div className="mt-4 space-y-2 flex-1">
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">ID (Indonesian)</span>
                                                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{chapter.desc_id}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-serif">EN (English)</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-2">{chapter.desc_en}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
                                            <Link
                                                href={route('chapters.edit', chapter.id)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-gray-250 px-3 py-1.5 text-xs font-semibold text-gray-750 hover:bg-gray-50 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <Pencil size={12} /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(chapter.id)}
                                                className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-650 hover:bg-red-100 transition border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950/40"
                                            >
                                                <Trash2 size={12} /> Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

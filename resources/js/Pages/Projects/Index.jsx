import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, MapPin, Calendar, Users } from 'lucide-react';

export default function Index({ projects }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
            destroy(route('projects.destroy', id));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Manajemen Proyek Dokumentasi
                    </h2>
                    <Link
                        href={route('projects.create')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
                    >
                        <Plus size={16} /> Tambah Proyek
                    </Link>
                </div>
            }
        >
            <Head title="Proyek" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {projects.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">Belum ada data proyek. Silakan buat proyek baru!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {projects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="overflow-hidden rounded-2xl bg-white border border-gray-155 shadow-sm hover:shadow-md transition duration-300 dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row"
                                >
                                    <div className="md:w-48 h-48 md:h-auto overflow-hidden relative bg-gray-150 shrink-0">
                                        <img 
                                            src={project.thumbnail} 
                                            alt={project.title_id} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-450 dark:text-gray-400">
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                                                <span className="flex items-center gap-1"><Users size={12} /> {project.partner}</span>
                                            </div>
                                            
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 line-clamp-1">
                                                {project.title_id}
                                            </h3>
                                            
                                            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                                <Calendar size={12} />
                                                <span>{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                                            </div>

                                            <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                                {project.desc_id}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
                                            <Link
                                                href={route('projects.edit', project.id)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-gray-250 px-3 py-1.5 text-xs font-semibold text-gray-750 hover:bg-gray-50 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <Pencil size={12} /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
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

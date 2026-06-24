import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Mail, Instagram, User } from 'lucide-react';

export default function Index({ members }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
            destroy(route('members.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Manajemen Anggota (Pemagang)
                    </h2>
                    <Link
                        href={route('members.create')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
                    >
                        <Plus size={16} /> Tambah Anggota
                    </Link>
                </div>
            }
        >
            <Head title="Anggota" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {members.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">Belum ada data anggota. Silakan tambah anggota pertama Anda!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {members.map((member) => (
                                <div 
                                    key={member.id}
                                    className="overflow-hidden rounded-2xl bg-white border border-gray-155 shadow-sm hover:shadow-md transition duration-300 dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center p-6 text-center"
                                >
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 dark:border-gray-700 relative mb-4">
                                        {member.photo ? (
                                            <img 
                                                src={member.photo} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <User size={36} />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        {member.role}
                                    </p>
                                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {member.division}
                                        </span>
                                        {member.chapter && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900">
                                                {member.chapter.name_id}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Social Links */}
                                    <div className="mt-4 flex gap-3 text-gray-400">
                                        {member.email && (
                                            <a href={`mailto:${member.email}`} className="hover:text-blue-650 transition" title={member.email}>
                                                <Mail size={16} />
                                            </a>
                                        )}
                                        {member.instagram && (
                                            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition" title={`@${member.instagram}`}>
                                                <Instagram size={16} />
                                            </a>
                                        )}
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 w-full flex justify-center gap-2">
                                        <Link
                                            href={route('members.edit', member.id)}
                                            className="inline-flex items-center gap-1 rounded-lg border border-gray-250 px-2.5 py-1.5 text-xs font-semibold text-gray-750 hover:bg-gray-50 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <Pencil size={11} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-650 hover:bg-red-100 transition border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950/40"
                                        >
                                            <Trash2 size={11} /> Hapus
                                        </button>
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

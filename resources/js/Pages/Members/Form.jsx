import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

export default function Form({ isEdit, member, chapters = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: member?.name || '',
        role: member?.role || '',
        division: member?.division || '',
        email: member?.email || '',
        instagram: member?.instagram || '',
        chapter_id: member?.chapter_id || '',
        photo: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const [imagePreview, setImagePreview] = useState(member?.photo || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('members.update', member.id));
        } else {
            post(route('members.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('members.index')}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {isEdit ? 'Edit Anggota' : 'Tambah Anggota Baru'}
                    </h2>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Anggota' : 'Tambah Anggota'} />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm dark:bg-gray-800 dark:border-gray-700 space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Alya Putri"
                                className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Role and Division */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Jabatan / Role
                                </label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    placeholder="Contoh: Photographer atau Creative Director"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    required
                                />
                                {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Divisi
                                </label>
                                <input
                                    type="text"
                                    value={data.division}
                                    onChange={(e) => setData('division', e.target.value)}
                                    placeholder="Contoh: Creative, Jurnalis, Videographer"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    required
                                />
                                {errors.division && <p className="mt-1 text-xs text-red-600">{errors.division}</p>}
                            </div>
                        </div>

                        {/* Batch selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Batch Magang (Batch / Chapter)
                            </label>
                            <select
                                value={data.chapter_id}
                                onChange={(e) => setData('chapter_id', e.target.value)}
                                className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                required
                            >
                                <option value="">Pilih Batch Magang</option>
                                {chapters.map((chapter) => (
                                    <option key={chapter.id} value={chapter.id}>
                                        {chapter.name_id} (Lokasi: {chapter.location})
                                    </option>
                                ))}
                            </select>
                            {errors.chapter_id && <p className="mt-1 text-xs text-red-600">{errors.chapter_id}</p>}
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Contoh: alya@unmul.ac.id"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Username Instagram (Tanpa @)
                                </label>
                                <input
                                    type="text"
                                    value={data.instagram}
                                    onChange={(e) => setData('instagram', e.target.value)}
                                    placeholder="Contoh: alya.putri"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.instagram && <p className="mt-1 text-xs text-red-600">{errors.instagram}</p>}
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Foto Anggota
                            </label>
                            
                            <div className="mt-1 flex flex-col md:flex-row items-center gap-6">
                                {/* Preview Box */}
                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-250 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden relative shrink-0">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon size={32} className="text-gray-400 opacity-60" />
                                    )}
                                </div>

                                <div className="flex-1 w-full">
                                    <label className="relative cursor-pointer bg-white rounded-xl border border-gray-250 hover:bg-gray-50 transition px-4 py-3 flex items-center justify-center gap-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 text-sm font-semibold text-gray-750 dark:text-gray-300">
                                        <Upload size={16} />
                                        <span>Pilih Foto</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Format: JPG, PNG, WEBP. Maksimal 2MB. {isEdit && '(Kosongkan jika tidak ingin mengubah foto)'}
                                    </p>
                                    {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                            <Link
                                href={route('members.index')}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-250 px-4 py-2 text-sm font-semibold text-gray-750 hover:bg-gray-50 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Batal
                            </Link>
                            
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition disabled:opacity-50"
                            >
                                <Save size={16} />
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

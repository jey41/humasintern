import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Form({ isEdit, project }) {
    // Helper to format date for input field value (YYYY-MM-DD)
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const { data, setData, post, processing, errors } = useForm({
        title_id: project?.title_id || '',
        title_en: project?.title_en || '',
        desc_id: project?.desc_id || '',
        desc_en: project?.desc_en || '',
        content_id: project?.content_id || '',
        content_en: project?.content_en || '',
        location: project?.location || '',
        partner: project?.partner || '',
        start_date: formatDateForInput(project?.start_date),
        end_date: formatDateForInput(project?.end_date),
        thumbnail: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const [imagePreview, setImagePreview] = useState(project?.thumbnail || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('projects.update', project.id));
        } else {
            post(route('projects.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('projects.index')}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {isEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                    </h2>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Proyek' : 'Tambah Proyek'} />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm dark:bg-gray-800 dark:border-gray-700 space-y-6"
                    >
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900 text-xs text-blue-750 dark:text-blue-300">
                            Masukkan detail dalam **Bahasa Indonesia** dan **Bahasa Inggris** untuk mendukung fitur multi-bahasa di landing page.
                        </div>

                        {/* Title Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Judul Proyek (ID)
                                </label>
                                <input
                                    type="text"
                                    value={data.title_id}
                                    onChange={(e) => setData('title_id', e.target.value)}
                                    placeholder="Contoh: PKKMB Unmul 2024"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.title_id && <p className="mt-1 text-xs text-red-600">{errors.title_id}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Judul Proyek (EN)
                                </label>
                                <input
                                    type="text"
                                    value={data.title_en}
                                    onChange={(e) => setData('title_en', e.target.value)}
                                    placeholder="Contoh: PKKMB Unmul 2024"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.title_en && <p className="mt-1 text-xs text-red-600">{errors.title_en}</p>}
                            </div>
                        </div>

                        {/* Location and Partner */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Mitra / Partner
                                </label>
                                <input
                                    type="text"
                                    value={data.partner}
                                    onChange={(e) => setData('partner', e.target.value)}
                                    placeholder="Contoh: Universitas Mulawarman"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.partner && <p className="mt-1 text-xs text-red-600">{errors.partner}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Samarinda"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.start_date && <p className="mt-1 text-xs text-red-600">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.end_date && <p className="mt-1 text-xs text-red-600">{errors.end_date}</p>}
                            </div>
                        </div>

                        {/* Short Descriptions */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Deskripsi Singkat (ID)
                                </label>
                                <textarea
                                    rows={2}
                                    value={data.desc_id}
                                    onChange={(e) => setData('desc_id', e.target.value)}
                                    placeholder="Tulis deskripsi singkat..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.desc_id && <p className="mt-1 text-xs text-red-600">{errors.desc_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Deskripsi Singkat (EN)
                                </label>
                                <textarea
                                    rows={2}
                                    value={data.desc_en}
                                    onChange={(e) => setData('desc_en', e.target.value)}
                                    placeholder="Write a short description..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.desc_en && <p className="mt-1 text-xs text-red-600">{errors.desc_en}</p>}
                            </div>
                        </div>

                        {/* Full Content */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Konten Lengkap / Studi Kasus (ID)
                                </label>
                                <textarea
                                    rows={6}
                                    value={data.content_id}
                                    onChange={(e) => setData('content_id', e.target.value)}
                                    placeholder="Jelaskan secara lengkap kontribusi pemagang, pencapaian, dan cerita proyek..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.content_id && <p className="mt-1 text-xs text-red-600">{errors.content_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Konten Lengkap / Studi Kasus (EN)
                                </label>
                                <textarea
                                    rows={6}
                                    value={data.content_en}
                                    onChange={(e) => setData('content_en', e.target.value)}
                                    placeholder="Explain project details, internship contributions, and outcomes in English..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.content_en && <p className="mt-1 text-xs text-red-600">{errors.content_en}</p>}
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Thumbnail Proyek
                            </label>
                            
                            <div className="mt-1 flex flex-col md:flex-row items-center gap-6">
                                {/* Preview Box */}
                                <div className="w-56 h-36 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden relative group">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <ImageIcon size={32} className="mx-auto mb-1 opacity-60" />
                                            <span className="text-[10px] block">No Preview</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 w-full">
                                    <label className="relative cursor-pointer bg-white rounded-xl border border-gray-250 hover:bg-gray-50 transition px-4 py-3 flex items-center justify-center gap-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 text-sm font-semibold text-gray-750 dark:text-gray-300">
                                        <Upload size={16} />
                                        <span>Pilih Gambar</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Format: JPG, PNG, WEBP. Maksimal 2MB. {isEdit && '(Kosongkan jika tidak ingin mengubah thumbnail)'}
                                    </p>
                                    {errors.thumbnail && <p className="mt-1 text-xs text-red-600">{errors.thumbnail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                            <Link
                                href={route('projects.index')}
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

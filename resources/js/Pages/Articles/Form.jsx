import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Form({ isEdit, article }) {
    const { data, setData, post, processing, errors } = useForm({
        title_id: article?.title_id || '',
        title_en: article?.title_en || '',
        desc_id: article?.desc_id || '',
        desc_en: article?.desc_en || '',
        content_id: article?.content_id || '',
        content_en: article?.content_en || '',
        author: article?.author || 'Humas Intern Team',
        thumbnail: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const [imagePreview, setImagePreview] = useState(article?.thumbnail || null);

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
            post(route('articles.update', article.id));
        } else {
            post(route('articles.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('articles.index')}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                    </h2>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Artikel' : 'Tulis Artikel'} />

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
                                    Judul Artikel (ID)
                                </label>
                                <input
                                    type="text"
                                    value={data.title_id}
                                    onChange={(e) => setData('title_id', e.target.value)}
                                    placeholder="Contoh: Behind the Scene Magang"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.title_id && <p className="mt-1 text-xs text-red-600">{errors.title_id}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Judul Artikel (EN)
                                </label>
                                <input
                                    type="text"
                                    value={data.title_en}
                                    onChange={(e) => setData('title_en', e.target.value)}
                                    placeholder="Contoh: Behind the Scenes of Interns"
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.title_en && <p className="mt-1 text-xs text-red-600">{errors.title_en}</p>}
                            </div>
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Penulis / Author
                            </label>
                            <input
                                type="text"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                placeholder="Contoh: Humas Intern Team"
                                className="w-full md:w-1/2 rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            />
                            {errors.author && <p className="mt-1 text-xs text-red-600">{errors.author}</p>}
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
                                    placeholder="Tulis ringkasan artikel..."
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
                                    placeholder="Write a brief summary of the article..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.desc_en && <p className="mt-1 text-xs text-red-600">{errors.desc_en}</p>}
                            </div>
                        </div>

                        {/* Full Content */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Isi Artikel Lengkap (ID)
                                </label>
                                <textarea
                                    rows={8}
                                    value={data.content_id}
                                    onChange={(e) => setData('content_id', e.target.value)}
                                    placeholder="Tulis naskah artikel lengkap..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.content_id && <p className="mt-1 text-xs text-red-600">{errors.content_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Isi Artikel Lengkap (EN)
                                </label>
                                <textarea
                                    rows={8}
                                    value={data.content_en}
                                    onChange={(e) => setData('content_en', e.target.value)}
                                    placeholder="Write full article body in English..."
                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                />
                                {errors.content_en && <p className="mt-1 text-xs text-red-600">{errors.content_en}</p>}
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Gambar Cover / Thumbnail
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
                                        Format: JPG, PNG, WEBP. Maksimal 2MB. {isEdit && '(Kosongkan jika tidak ingin mengubah cover)'}
                                    </p>
                                    {errors.thumbnail && <p className="mt-1 text-xs text-red-600">{errors.thumbnail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                            <Link
                                href={route('articles.index')}
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

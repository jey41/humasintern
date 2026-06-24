import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Trash2, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Index({ images }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        files: [],
        title: '',
        caption: '',
    });

    const { delete: destroy } = useForm();
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setData('files', selectedFiles);
        
        const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        post(route('gallery.store'), {
            onSuccess: () => {
                reset();
                setPreviews([]);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus gambar ini dari galeri?')) {
            destroy(route('gallery.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Galeri Karya Kreatif
                </h2>
            }
        >
            <Head title="Galeri" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Upload Card */}
                    <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Upload size={18} className="text-blue-600" />
                            Unggah Gambar Baru ke Galeri
                        </h3>
                        
                        <form onSubmit={handleUploadSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Judul (Opsional)</label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Behind the Scene PKKMB"
                                        className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-650">{errors.title}</p>}
                                </div>
                                
                                {/* Caption */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Keterangan / Caption (Opsional)</label>
                                    <input 
                                        type="text" 
                                        value={data.caption}
                                        onChange={(e) => setData('caption', e.target.value)}
                                        placeholder="Contoh: Tim berfoto bersama rektor"
                                        className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    />
                                    {errors.caption && <p className="mt-1 text-xs text-red-650">{errors.caption}</p>}
                                </div>

                                {/* File Drop Area */}
                                <div className="flex flex-col justify-end">
                                    <label className="relative cursor-pointer bg-white rounded-xl border border-gray-250 hover:bg-gray-50 transition px-4 py-2.5 flex items-center justify-center gap-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 text-sm font-semibold text-gray-750 dark:text-gray-300">
                                        <Plus size={16} />
                                        <span>Pilih File Gambar</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    {errors.files && <p className="mt-1 text-xs text-red-650">{errors.files}</p>}
                                    {errors['files.0'] && <p className="mt-1 text-xs text-red-650">Pastikan semua berkas adalah gambar dan berukuran max 3MB.</p>}
                                </div>
                            </div>

                            {/* Previews Grid */}
                            {previews.length > 0 && (
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pratinjau ({previews.length} file dipilih):</p>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                                        {previews.map((url, i) => (
                                            <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white dark:border-gray-700">
                                                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing || data.files.length === 0}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition disabled:opacity-50"
                                >
                                    <Upload size={16} />
                                    {processing ? 'Mengunggah...' : 'Mulai Unggah'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Gallery Grid */}
                    {images.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center border border-gray-150 dark:bg-gray-800 dark:border-gray-700">
                            <ImageIcon size={48} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">Galeri masih kosong. Silakan unggah beberapa foto!</p>
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                            {images.map((img) => (
                                <div 
                                    key={img.id}
                                    className="break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-155 bg-white shadow-sm group dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <img 
                                        src={img.url} 
                                        alt={img.title || 'Gallery Item'} 
                                        className="w-full object-cover bg-gray-100" 
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5">
                                        <h4 className="text-white font-bold text-sm line-clamp-1">{img.title}</h4>
                                        {img.caption && <p className="text-slate-300 text-xs mt-1 line-clamp-2">{img.caption}</p>}
                                        
                                        <div className="mt-4 flex justify-between items-center pt-3 border-t border-white/10">
                                            <span className="text-[9px] text-slate-400 font-semibold">
                                                {new Date(img.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                                            </span>
                                            
                                            <button
                                                onClick={() => handleDelete(img.id)}
                                                className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition border border-red-500/10 shadow"
                                                title="Hapus Gambar"
                                            >
                                                <Trash2 size={12} />
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

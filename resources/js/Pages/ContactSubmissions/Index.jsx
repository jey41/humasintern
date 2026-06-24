import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Mail, MailOpen, CheckCircle, Trash2, Clock, Send, Search, User } from 'lucide-react';
import { useState } from 'react';

export default function Index({ submissions, currentFilter }) {
    const { patch, delete: destroy, processing } = useForm();
    const [selectedSub, setSelectedSub] = useState(submissions[0] || null);
    const [replyText, setReplyText] = useState('');
    const [isReplied, setIsReplied] = useState(false);

    const handleSelectSub = (sub) => {
        setSelectedSub(sub);
        setIsReplied(false);
        setReplyText('');
        
        // Auto-mark as read if status is pending
        if (sub.status === 'pending') {
            patch(route('submissions.update', sub.id), {
                data: { status: 'read' },
                onSuccess: () => {
                    // Update locally to avoid full refetch delay
                    sub.status = 'read';
                }
            });
        }
    };

    const handleUpdateStatus = (id, newStatus) => {
        patch(route('submissions.update', id), {
            data: { status: newStatus },
            onSuccess: () => {
                if (selectedSub && selectedSub.id === id) {
                    setSelectedSub({ ...selectedSub, status: newStatus });
                }
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            destroy(route('submissions.destroy', id), {
                onSuccess: () => {
                    setSelectedSub(null);
                }
            });
        }
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        // Simulate sending mail
        setIsReplied(true);
        // Mark status as replied in database
        handleUpdateStatus(selectedSub.id, 'replied');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Kotak Masuk Pesan / Submisi Kontak
                    </h2>
                    
                    {/* Status Filters */}
                    <div className="flex bg-gray-100 rounded-lg p-0.5 dark:bg-gray-700">
                        {['all', 'pending', 'read', 'replied'].map((filter) => (
                            <Link
                                key={filter}
                                href={route('submissions.index', filter === 'all' ? {} : { status: filter })}
                                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                                    currentFilter === filter
                                        ? 'bg-white shadow text-gray-950 dark:bg-gray-800 dark:text-white'
                                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                }`}
                            >
                                {filter.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </div>
            }
        >
            <Head title="Kotak Masuk" />

            <div className="bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-140px)] flex gap-6">
                    
                    {/* Left: Message List */}
                    <div className="w-1/3 min-w-[320px] bg-white rounded-2xl border border-gray-150 shadow-sm flex flex-col dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/30">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Semua Pesan ({submissions.length})
                            </span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                            {submissions.length === 0 ? (
                                <div className="p-8 text-center text-gray-400 text-sm">Tidak ada pesan masuk.</div>
                            ) : (
                                submissions.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => handleSelectSub(sub)}
                                        className={`w-full text-left p-4 hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition flex gap-3 items-start ${
                                            selectedSub?.id === sub.id ? 'bg-blue-50/40 border-l-4 border-blue-600 dark:bg-blue-900/15' : ''
                                        }`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {sub.status === 'pending' ? (
                                                <div className="p-1.5 rounded-lg bg-red-50 text-red-650 dark:bg-red-950/20 dark:text-red-400"><Mail size={16} /></div>
                                            ) : sub.status === 'read' ? (
                                                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-650 dark:bg-amber-950/20 dark:text-amber-400"><MailOpen size={16} /></div>
                                            ) : (
                                                <div className="p-1.5 rounded-lg bg-green-50 text-green-650 dark:bg-green-950/20 dark:text-green-400"><CheckCircle size={16} /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{sub.name}</h4>
                                                <span className="text-[9px] text-gray-400 font-medium">
                                                    {new Date(sub.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                                                </span>
                                            </div>
                                            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">{sub.subject}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{sub.message}</p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Detailed Reader View */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-150 shadow-sm flex flex-col dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        {selectedSub ? (
                            <div className="flex-1 flex flex-col h-full overflow-hidden">
                                {/* Header / Sender details */}
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-gray-50/50 dark:bg-gray-900/30">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-650 dark:text-blue-300">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-gray-900 dark:text-white">{selectedSub.name}</h3>
                                            <p className="text-xs text-gray-450 dark:text-gray-400">
                                                Email: <span className="font-semibold text-gray-600 dark:text-gray-300">{selectedSub.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        {/* Status Tag */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            selectedSub.status === 'pending' ? 'bg-red-50 text-red-700 border border-red-200' :
                                            selectedSub.status === 'read' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                            'bg-green-50 text-green-700 border border-green-200'
                                        }`}>
                                            {selectedSub.status.toUpperCase()}
                                        </span>
                                        
                                        {/* Action dropdown for manually shifting status */}
                                        <select
                                            value={selectedSub.status}
                                            onChange={(e) => handleUpdateStatus(selectedSub.id, e.target.value)}
                                            className="rounded-lg border-gray-250 shadow-sm text-xs font-semibold py-1.5 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="read">Mark Read</option>
                                            <option value="replied">Mark Replied</option>
                                        </select>
                                        
                                        <button
                                            onClick={() => handleDelete(selectedSub.id)}
                                            className="p-2 rounded-lg bg-red-50 text-red-650 hover:bg-red-100 border border-red-200 transition dark:bg-red-950/20 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950/40"
                                            title="Hapus Pesan"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Body / Message content */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    <div>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                                            <Clock size={12} /> {formatDate(selectedSub.created_at)}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Subject: {selectedSub.subject}
                                        </h2>
                                    </div>
                                    
                                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 leading-relaxed text-sm text-gray-750 dark:text-gray-300">
                                        {selectedSub.message}
                                    </div>

                                    {/* Reply Form */}
                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Tulis Balasan Email</h4>
                                        {isReplied ? (
                                            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900 dark:text-green-300 text-xs">
                                                ✓ Balasan email Anda disimulasikan berhasil terkirim. Status submisi ini diubah menjadi **REPLIED**.
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSendReply} className="space-y-3">
                                                <textarea
                                                    rows={4}
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder={`Ketik balasan email Anda ke ${selectedSub.name}...`}
                                                    className="w-full rounded-xl border-gray-250 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                                />
                                                <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={!replyText.trim()}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition disabled:opacity-50"
                                                    >
                                                        <Send size={12} /> Kirim Balasan
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <Mail size={48} className="opacity-40 mb-2" />
                                <p className="text-sm">Silakan pilih pesan dari daftar di sebelah kiri untuk membacanya.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

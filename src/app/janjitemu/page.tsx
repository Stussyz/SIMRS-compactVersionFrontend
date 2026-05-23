"use client"

import {useState, useEffect} from 'react';

export default function DaftarJanjiTemu() {
    const [dataJanji, setDataJanji] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data (GET) dari rute .populate() di Backend
    const ambilDataJanji = async () => {
        try {
            const respons = await fetch ('http://localhost:5000/janjitemu');
            const data = await respons.json();
            setDataJanji(data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal mengambil data janji temu", error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        ambilDataJanji();
    }, []);

    // Fungsi Baru: Mengubah (PUT) status antrean janji temu
    const handleUpdateStatus = async (IdleDeadline: string, statusBaru: string) => {
        try {
            const respons = await fetch(`http://localhost:5000/janjitemu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: statusBaru}),
            });

            if (respons.ok) {
                // Jika sukses di database, panggil ulang data terbaru agar isian tabel ter-refresh
                ambilDataJanji();
            } else {
                alert("Gagal mengubah status antrean.");
            }
        } catch (error) {
            console.error("Error saat mengubah status:", error);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Janji Temu Pasien</h1>

            <a href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                &larr; Kembali ke Beranda
            </a>

            <div className="bg-white rounded-lg shadow overflow-hidden-p6">
                {loading ? (
                    <p className="text-center text-gray-500">Sedang memuat data jadwal...</p>
                ) : (
                    <table className="min-w-full text-left text-gray-600 border-collapse">
                        <thead>
                            <tr className="border-b bg-blue-50">
                                <th className="p-3">Tanggal Janji</th>
                                <th className="p-3">Nama Pasien</th>
                                <th className="p-3">Keluhan</th>
                                <th className="p-3">Dokter Tujuan</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataJanji.map((janji: any) => (
                                <tr key={janji._id} className="border-b hover:bg-gray-50">
                                    {/* Mengubah format tanggal agar sesuai format indonesia */}
                                    <td className="p-3 font-medium text-gray-700">
                                        {new Date(janji.tanggalJanji).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year:'numeric'
                                        })}
                                    </td>

                                    {/* Memanggil data hasil .populate() dari pasienId */}
                                    <td className="p-3 font-semibold text-gray-900">
                                        {janji.pasienId?.nama || "Data Pasien Hilang"}
                                    </td>

                                    {/* Memanggil data hasil .populate() dari dokterId */}
                                    <td className="p-3 font-semibold text-blue-600">
                                        {janji.dokterId.nama || "Data Dokter Hilang"}
                                        <span className="block text-xs text-gray-500 font-normal">
                                            Poli {janji.dokterId?.spesialisasi || "-"}
                                        </span>
                                    </td>

                                    {/* Menampilkan status dgn warna */}
                                    <td className="p-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                            {janji.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && dataJanji.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">Belum ada jadwal janji temu.</p>
                )}
            </div>
        </div>
    );
}
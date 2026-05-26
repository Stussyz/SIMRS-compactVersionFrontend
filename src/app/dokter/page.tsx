"use client";

import { useState, useEffect } from 'react';

export default function KelolaDokter() {
    // Memori untuk untuk form input
    const [nama, setNama] = useState('');
    const [spesialisasi, setSpesialisasi] = useState('');
    const [jadwalHari, setJadwalHari] = useState('');
    const [jamPraktik, setJamPraktik] = useState('');

    // Memori untuk tabel daftar dokter
    const [daftarDokter, setDaftarDokter] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mengambil data dokter dari backend
    const ambilDataDokter = async () => {
        try {
            const respons = await fetch('http://localhost:5000/dokter');
            const data = await respons.json();
            setDaftarDokter(data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal memuat data dokter:", error);
            setLoading(false);
        }
    };

    // Eksekusi fungsi ambil data pas halaman pertama kali dibuka
    useEffect(() => {
        ambilDataDokter();
    }, []);

    // Mengirim data dokter baru ke backend
    const handleTambahDokter = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const respons = await fetch('http://localhost:5000/dokter', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({nama, spesialisasi, jadwalHari, jamPraktik}),
            });

            if (respons.ok) {
                alert("Dokter berhasil ditambahkan!");
                // kosongkan input nama
                setNama('');
                // default value poli dropdown
                setSpesialisasi('Umum')
                // refresh tabel otomatis
                ambilDataDokter();
            } else {
                alert("Gagal menambahkan dokter!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Data Dokter</h1>
        
            <a href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                &larr; Kembali ke Beranda
            </a>

            {/* Form tambah dokter */}
            <div className="bg-white p-6 rounded-lg shadow mb-8 text-gray-600">
                <h2 className="text-xl font-bold m-4">Tambah Dokter Baru</h2>
                <form onSubmit={handleTambahDokter} className="flex gap-4 items-end">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input 
                                type="text" 
                                required
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Contoh: drg. Ehsan, Sp.Ort"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi (Poli)</label>
                            <select
                                value={spesialisasi}
                                onChange={(e) => setSpesialisasi(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Umum">Poli Umum</option>
                                <option value="Anak">Poli Anak</option>
                                <option value="Gigi">Poli Gigi</option>
                                <option value="THT">Poli THT</option>
                                <option value="Mata">Poli Mata</option>
                                <option value="Penyakit Dalam">Poli Penyakit Dalam</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Hari</label>
                        <input 
                            type="text"
                            required
                            value={jadwalHari}
                            onChange={(e) => setJadwalHari(e.target.value)}
                            placeholder="Contoh: Senin - Kamis"
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"    
                        />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Praktik</label>
                            <input 
                                type="text"
                                required
                                value={jamPraktik}
                                onChange={(e) => setJamPraktik(e.target.value)}
                                placeholder="Contoh: 09:00 - 12:00"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition"
                    >
                        Simpan Data
                    </button>
                </form>
            </div>

            {/* Tabel Daftar Dokter */}
            <div className="bg-white rounded-lg shadow overflow-hidden p-6 text-gray-600">
                <h2 className="text-xl font-bold mb-4">Daftar Dokter Tersedia</h2>
                {loading ? (
                    <p className="text-gray-500">Memuat data...</p>
                ) : (
                    <table className="min-w-full text-left text-gray-600 border-collapse">
                        <thead>
                            <tr className="border-b bg-blue-50">
                                <th className="p-3">Nama Dokter</th>
                                <th className="p-3">Spesialisasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daftarDokter.map((dok: any) => (
                                <tr key={dok._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold text-gray-900">{dok.nama}</td>
                                    <td className="p-3">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                            {dok.spesialisasi}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
// wajib use client agar bisa pakai useState dan useEffect dari React
"use client"; 

import { useState, useEffect } from 'react';

export default function DataPasien() {
    // Membuat wadah dgn nama dataPasien
    // Fungsi setDataPasien = jembatan untuk naruh data ke dalam wadah
    const [dataPasien, setDataPasien] = useState([]);

    // State untuk men-display tulisan "sedang dimuat" saat data masih proses untuk ditampilkan
    const [loading, setLoading] = useState(true);

    // State untuk formulir pendaftaran
    const [nama, setNama] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [poli, setPoli] = useState('');

    // Memanggil API di global agar bisa dipanggil berkali2
    const ambilDataBackend = async () => {
        try {
            const respons = await fetch('http://localhost:5000/pasien');
            const data = await respons.json();
            setDataPasien(data);
            setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setLoading(false);
            }
    };

    // useEffect berjalan 1x saat masih dalam proses
    useEffect(() => {
        ambilDataBackend();
        // [] untuk menghindari looping, fungsi tsb hanya di running 1x
    }, []);

    // Fungsi mengirim data (POST) saat tombol ditekan
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman web refresh saat tombol submit data ditekan
        
    // Membungkus data dari form ke dalam satu objek
    const pasienBaru = { nama, keluhan, poli };
        
        try {
            // Mengirim paket ke Backend
            const respons = await fetch('http://localhost:5000/pasien', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pasienBaru) // Mengubah objek Javascript menjadi JSON murni
            });
            
            if (respons.ok) {
                // Jika Backend merespons OK, reset form inputnya
                setNama('');
                setKeluhan('');
                setPoli('');
                
                // Panggil ulang fungsi ambil data agar tabel otomatis ke update
                ambilDataBackend();
            }
        } catch (error) {
        console.error("Gagal mengirim data:", error);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Pasien SIMRS</h1>

            <a href="/" className="text-blue-500 underline hover:text-blue-700">
                &larr; Kembali ke Beranda
            </a>

        {/* FORMULIR REGISTRASI DATA PASIEN */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Pendaftaran Pasien Baru</h2>
            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Nama Pasien</label>
                    <input 
                        type="text" 
                        value={nama}
                        // e.target.value = React mengambil setiap huruf yang diketik lalu disimpan ke dalam state "nama"
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full border p-2 rounded text-gray-900 bg-white"
                        placeholder="Ketikkan Nama"
                        required 
                    />
            </div>
            <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Keluhan</label>
                    <input 
                        type="text" 
                        value={keluhan}
                        onChange={(e) => setKeluhan(e.target.value)}
                        className="w-full border p-2 rounded text-gray-900 bg-white"
                        placeholder="Keluhan Anda"
                        required 
                    />
            </div>
            <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Poli Tujuan</label>
                    {/* <input 
                    type="text" 
                    value={poli}
                    onChange={(e) => setPoli(e.target.value)}
                    className="w-full border p-2 rounded text-gray-900 bg-white"
                    required 
                    /> */}

                    <select 
                        value={poli}
                        onChange={(e) => setPoli(e.target.value)}
                        className="w-full border p-2 rounded text-gray-900 bg-white cursor-pointer"
                        required
                    >
                        <option value="" disabled>** Pilih Poli **</option>
                        <option value="Umum">Poli Umum</option>
                        <option value="Anak">Poli Anak</option>
                        <option value="Gigi">Poli Gigi</option>
                        <option value="Mata">Poli Mata</option>
                        <option value="THT">Poli THT</option>
                        <option value="Penyakit Dalam">Poli Penyakit Dalam</option>
                    </select>
            </div>

            {/* Submit formulir */}
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Daftar
            </button>
            </form>
            </div>

            {/* Menampilkan Data */}
            <div className="bg-white rounded-lg shadow overflow-hidden p-6">
                {loading ? (
                    <p className="text-center text-gray-500">Sedang mengambil data dari database...</p>
                ) : (
                    <table className="min-w-full text-left text-gray-600">
                        <thead>
                            <tr className="border-b bg-red-100">
                                <th className="p-3">Jam Daftar</th>
                                <th className="p-3">Nama Pasien</th>
                                <th className="p-3">Keluhan</th>
                                <th className="p-3">Poli Tujuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Me-looping data dari useState ke dalam baris tabel */}
                            {dataPasien.map((pasien: any) => (
                                <tr key={pasien._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-sm font-medium text-gray-500">
                                        {pasien.tanggalDaftar ? (
                                            new Date(pasien.tanggalDaftar).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) + ' WIB'
                                        ) : (
                                            // untuk data lama yg belum punya tanggalDaftar
                                            '-'
                                        )}
                                    </td>
                                    
                                    <td className="p-3 font-semibold">{pasien.nama}</td>
                                    <td className="p-3 text-gray-600">{pasien.keluhan}</td>
                                    <td className="p-3 text-blue-600">{pasien.poli}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {/* pesan jika useState kosong */}
                {!loading && dataPasien.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">Belum ada data pasien yang terdaftar.</p>
                )}
            </div>
        </div>
    );
}
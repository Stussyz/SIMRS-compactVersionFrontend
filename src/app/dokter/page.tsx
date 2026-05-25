"use client";

import { useState, useEffect } from 'react';

export default function KelolaDokter() {
    // Memori untuk untuk form input
    const [nama, setNama] = useState('');
    const [spesialisasi, setSpesialisasi] = useState('');

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
                body: JSON.stringify({nama, spesialisasi}),
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
            <div className=""></div>
        </div>
    )
}
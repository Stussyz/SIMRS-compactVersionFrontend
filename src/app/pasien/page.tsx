"use client";

import { useState, useEffect } from 'react';

export default function PendaftaranPasien() {
  // 1. Memori Data Pasien
  const [nama, setNama] = useState('');
  const [nomorBpjs, setNomorBpjs] = useState('');
  const [keluhan, setKeluhan] = useState('');
  const [poli, setPoli] = useState('Umum');

  // 2. Memori Janji Temu
  const [dokterId, setDokterId] = useState('');
  const [tanggalJanji, setTanggalJanji] = useState('');

  // 3. Memori Data Master Dokter
  const [daftarDokter, setDaftarDokter] = useState<any[]>([]);
  const [dokterSesuaiPoli, setDokterSesuaiPoli] = useState<any[]>([]);

  // Mengambil semua data dokter dari Dapur saat web pertama dibuka
  useEffect(() => {
    const ambilDokter = async () => {
      try {
        const respons = await fetch('http://localhost:5000/dokter');
        const data = await respons.json();
        setDaftarDokter(data);
      } catch (error) {
        console.error("Gagal mengambil data dokter:", error);
      }
    };
    ambilDokter();
  }, []);

  // SIHIR FRONTEND: Mem-filter dropdown dokter setiap kali 'Poli' diganti
  useEffect(() => {
    const filterDokter = daftarDokter.filter((dok) => dok.spesialisasi === poli);
    setDokterSesuaiPoli(filterDokter);
    
    // Otomatis pilih dokter urutan pertama di poli tersebut agar tidak error
    if (filterDokter.length > 0) {
      setDokterId(filterDokter[0]._id);
    } else {
      setDokterId('');
    }
  }, [poli, daftarDokter]);

  // Tombol Submit ditekan
  const handleDaftar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dokterId) {
      alert("Tidak ada dokter di Poli ini! Silakan tambah dokter dulu di menu Kelola Dokter.");
      return;
    }

    try {
      // --- AKSI 1: Mendaftarkan Pasien & Validasi BPJS ---
      const responsPasien = await fetch('http://localhost:5000/pasien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, keluhan, poli, nomorBpjs })
      });

      const dataPasien = await responsPasien.json();

      // Jika BPJS palsu/gagal, HENTIKAN proses di sini!
      if (!responsPasien.ok) {
        alert("Pendaftaran Gagal: " + dataPasien.pesan);
        return; 
      }

      // Ambil ID Pasien yang baru saja sukses dibuat di database
      const idPasienBaru = dataPasien.data._id;

      // --- AKSI 2: Langsung buatkan Janji Temu ---
      const responsJanji = await fetch('http://localhost:5000/janjitemu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pasienId: idPasienBaru,
          dokterId: dokterId,
          tanggalJanji: tanggalJanji
        })
      });

      if (responsJanji.ok) {
        alert("Luar Biasa! Pasien berhasil didaftarkan & Antrean sudah dibuat.");
        // Kosongkan form
        setNama(''); setNomorBpjs(''); setKeluhan(''); setTanggalJanji('');
      } else {
        alert("Pasien terdaftar, tapi gagal membuat antrean.");
      }

    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Server sedang bermasalah.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pendaftaran Terpadu</h1>
        <p className="text-gray-500 mb-6">Daftar pasien dan buat janji temu dalam satu langkah.</p>
        
        <a href="/" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; Kembali ke Beranda
        </a>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleDaftar} className="flex flex-col gap-5">
            
            {/* Bagian 1: Data Identitas */}
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg flex flex-col gap-4">
              <h2 className="font-bold text-blue-800">1. Data Pasien</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sesuai KTP/BPJS</label>
                <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Kartu BPJS</label>
                <input type="number" required value={nomorBpjs} onChange={(e) => setNomorBpjs(e.target.value)} placeholder="Contoh valid: 1234567890" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keluhan Utama</label>
                <textarea required value={keluhan} onChange={(e) => setKeluhan(e.target.value)} className="w-full border p-2 rounded" rows={2}></textarea>
              </div>
            </div>

            {/* Bagian 2: Data Medis & Jadwal */}
            <div className="p-4 border border-green-100 bg-green-50 rounded-lg flex flex-col gap-4">
              <h2 className="font-bold text-green-800">2. Jadwal Pemeriksaan</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Poli</label>
                  <select value={poli} onChange={(e) => setPoli(e.target.value)} className="w-full border p-2 rounded">
                    <option value="Umum">Poli Umum</option>
                    <option value="Gigi">Poli Gigi</option>
                    <option value="Anak">Poli Anak</option>
                    <option value="Kandungan">Poli Kandungan</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Dokter</label>
                  <select value={dokterId} onChange={(e) => setDokterId(e.target.value)} required className="w-full border p-2 rounded font-semibold text-blue-700">
                    {dokterSesuaiPoli.length === 0 ? (
                      <option value="">-- Dokter Tidak Tersedia --</option>
                    ) : (
                      dokterSesuaiPoli.map(dok => (
                        <option key={dok._id} value={dok._id}>{dok.nama}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rencana Berobat</label>
                <input type="date" required value={tanggalJanji} onChange={(e) => setTanggalJanji(e.target.value)} className="w-full border p-2 rounded" />
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-blue-700 transition mt-4 shadow-md">
              Daftarkan Pasien & Buat Antrean
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
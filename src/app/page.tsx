'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  // State untuk memicu animasi saat halaman dimuat
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect akan berjalan otomatis sesaat setelah halaman dirender di browser
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main
      // Menggunakan gambar dari Unsplash sebagai background
      style={{ backgroundImage: "url('/hospital2.jpg')" }}
      className={`min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Efek kotak kaca buram (backdrop-blur) */}
      <div className="bg-white-80 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center transform transition-all duration-700 translate-y-0">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-sm">
          SIMRS Brawijaya Hospital
        </h1>
        
        {/* Judul card */}
        <p className="text-gray-800 text-lg mb-8 font-medium">
          Kasih mendasari pelayanan sepenuh hati, kesehatan pasien adalah prioritas utama kami. 
        </p>
        
        {/* Bagian Grid Menu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          
          {/* Kartu 1: Kelola Dokter */}
          <Link href="/dokter" className="group">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all border-t-4 border-blue-500 h-full flex flex-col items-center text-center transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                <span className="text-2xl group-hover:text-white">👨‍⚕️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Kelola Dokter</h2>
              <p className="text-gray-500 text-sm">Tambah, edit, dan atur jadwal praktik dokter berdasarkan poli.</p>
            </div>
          </Link>

          {/* Kartu 2: Pendaftaran Pasien */}
          <Link href="/pasien" className="group">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all border-t-4 border-green-500 h-full flex flex-col items-center text-center transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                <span className="text-2xl group-hover:text-white">📝</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Pendaftaran Pasien</h2>
              <p className="text-gray-500 text-sm">Registrasi pasien baru, validasi BPJS, dan pembuatan janji temu otomatis.</p>
            </div>
          </Link>

          {/* Kartu 3: Status Antrean */}
          <Link href="/janjitemu" className="group">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all border-t-4 border-yellow-500 h-full flex flex-col items-center text-center transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors">
                <span className="text-2xl group-hover:text-white">🏥</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Monitor Antrean</h2>
              <p className="text-gray-500 text-sm">Pantau jadwal hari ini, ubah status pasien, dan kelola antrean poli.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
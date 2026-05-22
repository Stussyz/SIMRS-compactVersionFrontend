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
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center transform transition-all duration-700 translate-y-0">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-sm">
          SIMRS Brawijaya Hospital
        </h1>
        <p className="text-gray-800 text-lg mb-8 font-medium">
          Sistem Informasi Rumah Sakit Modern & Responsif
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/pasien" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Kelola Pasien
          </Link>
          {/* Janji temu: on going */}
          <button className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition shadow-md hover:shadow-lg opacity-50 cursor-not-allowed">
            Buat Janji Temu
          </button>
        </div>
      </div>
    </main>
  );
}
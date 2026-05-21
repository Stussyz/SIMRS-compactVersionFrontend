export default function Home () {
  return (
    // min-h-screen: tinggi layar jadi penuh
    // bg-gray-100: bg color abu terang
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Selamat datang di SIMRS Malang Medika
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Sistem Informasi Manajemen Rumah Sakit
      </p>

      {/* Button link untuk mengakses ruangan data pasien */}
      <a href="/pasien" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      Kelola Data Pasien
      </a>
    </div>
  )
}
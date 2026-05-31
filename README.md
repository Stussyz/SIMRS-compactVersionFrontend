# 🏥 SIMRS Brawijaya Hospital - Sistem Informasi Manajemen Rumah Sakit

SIMRS Brawijaya Hospital adalah aplikasi *Full-Stack Web* berbasis **MERN Stack (MongoDB, Express, React/Next.js, Node.js)** yang dirancang untuk mendigitalisasi operasional pendaftaran dan antrean berobat di rumah sakit. Aplikasi ini dibangun dengan mengimplementasikan standart arsitektur *RESTful API* dan *Single Page Application (SPA)*.

## A. Fitur Utama
1. **Data Dokter**: CRUD (Create, Read, Update, Delete) jadwal praktik dokter dan spesialisasi.
2. **Pendaftaran Terpadu (Chained Fetching)**: 
   - Pendaftaran pasien baru terintegrasi dengan validasi nomor BPJS (Simulasi 3rd-Party API).
   - *Dynamic Dependent Dropdown* (Filter otomatis dokter berdasarkan Poli yang dipilih).
3. **Mesin Penomoran Otomatis**: Men-generate nomor antrean standar poli pada RS (Contoh: `MATA-001`) berdasarkan tanggal dan dokter yang bertugas.
4. **Monitor Antrean & Cetak Struk**: Manajemen status pasien (Menunggu, Selesai, Dibatalkan) dan pencetakan struk tiket antrean *thermal-ready* menggunakan Browser Print API.

## B. Teknologi yang Digunakan
- **Frontend:** Next.js (React), Tailwind CSS, TypeScript (Client Components).
- **Backend:** Node.js, Express.js, CORS.
- **Database:** MongoDB Atlas (Cloud Database), Mongoose (ODM).
- **Arsitektur:** RESTful API, Stateless Client-Server.

## C. Cara Instalasi & Menjalankan di Local
Proyek ini terbagi menjadi dua direktori: `Frontend` (Port 3000) dan `Backend` (Port 5000).

### 1. Setup Backend (Dapur)
1. Buka terminal, arahkan ke folder backend: `cd simrs-backend`
2. Install dependencies: `npm install`
3. Buat file `.env` di folder root backend dan masukkan URL MongoDB Anda:
   `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/simrs`
4. Jalankan server: `node server.js`
   *(Server akan berjalan di `http://localhost:5000`)*

### 2. Setup Frontend (Ruang Makan)
1. Buka terminal baru, arahkan ke folder frontend (Next.js).
2. Install dependencies: `npm install`
3. Jalankan server development: `npm run dev`
4. Buka browser dan akses: `http://localhost:3000`

## D. Dokumentasi REST API (Endpoints)
| HTTP Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/dokter` | Mengambil seluruh master data dokter |
| `POST` | `/dokter` | Menambahkan dokter baru |
| `POST` | `/pasien` | Mendaftarkan pasien & validasi BPJS |
| `GET` | `/janjitemu` | Mengambil data antrean (dengan Populate Relasi Dokter & Pasien) |
| `POST` | `/janjitemu` | Membuat janji temu & Generate Auto-Numbering |
| `PUT` | `/janjitemu/:id` | Mengubah status antrean (Selesai/Batal) |
| `DELETE`| `/janjitemu/:id` | Menghapus data janji temu |
| `GET` | `/api-luar/bpjs/:nomor`| Mock 3rd-Party API untuk cek status aktif BPJS |

## 👨‍💻 Dikembangkan Oleh
**Mohammad Fadhol**
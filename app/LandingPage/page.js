"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen text-[#2C3E50]">
      {/* Navbar */}
        <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-10 rounded-full flex items-center justify-between shadow-md relative">
        <h1 className="font-bold text-2xl tracking-wide cursor-pointer transition-transform duration-300 active:scale-110">BKcTB</h1>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 font-semibold">
    <Link
      href="/LandingPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Home
    </Link>

    <Link
      href="/AccesPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Access
    </Link>

    <Link
      href="/ContactPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Contact
    </Link>
  </div>

      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center text-white py-24 px-6"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 absolute inset-0" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Tempat yang aman untuk bertumbuh dan berbagi.
          </h2>
          <p className="text-sm md:text-base mb-8">
            Kami ada untuk memberikan solusi, mendengarkan keluh kesah siswa/i. Karena setiap siswa/i berhak untuk didengar dan dipahami.
          </p>

          {/* SATU TOMBOL LOGIN SAJA */}
          <Link href="/login">
            <button className="bg-white text-[#395E9D] font-bold px-12 py-4 rounded-full shadow-xl hover:opacity-90 transition transform hover:scale-110 text-lg">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Deskripsi Bawah Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex justify-center md:justify-start">
            <img src="/bk.png" alt="Konseling" className="w-64 md:w-80 rounded-xl shadow" />
          </div>
          <div className="flex-1 text-[#395E9D] font-semibold text-lg leading-relaxed text-center md:text-left">
            <p>
              Web ini membantu para siswa dan siswi SMK Taruna Bhakti agar bisa mendapatkan haknya untuk layanan bimbingan dan konseling dengan mudah.
            </p>
            <p className="mt-4">
              Bersama BKcTB bisa mewujudkan generasi yang percaya diri, bisa menghadapi masa depan dengan kuat.
            </p>
          </div>
        </div>
      </section>

      {/* Manfaat & Fitur */}
      <div className="bg-[#F5F7FB] py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-white">
          <div className="bg-[#395E9D] p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Manfaat Pakai BKcTB</h3>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Pengajuan Terjadwal dan Terdokumentasi</li>
              <li>Meningkatkan Hubungan Siswa dan Guru</li>
              <li>Mudah Digunakan</li>
              <li>Tempat Curhat yang Aman dan Rahasia</li>
            </ul>
          </div>
          <div className="bg-[#7BA4D9] p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Fitur Utama</h3>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Dashboard Guru</li>
              <li>Dashboard Siswa/i</li>
              <li>Form Pengajuan</li>
              <li>Button ACC</li>
              <li>Button Remove</li>
              <li>Catatan Konseling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimoni */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#395E9D] mb-2">Testimoni</h2>
        <p className="text-[#7BA4D9] font-semibold">
          Ucap Pengguna Yang Sudah Memakai BKcTB
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-4">
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Menurut saya ada nya web BKcTB di sekolah SMK Taruna Bhakti ini sangat membantu untuk membuat jadwal konseling dari jarak jauh."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– Yeji XI RPL 8</p>
          </div>
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Saya sangat suka dengan web ini karena apa yang saya ajukan tersimpan dengan rapih."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– XI Ryujin bC 6</p>
          </div>
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Saya sangat terbantu dengan adanya web BKcTB karena saya bisa menceritakan keluh kesah saya dengan konfirmasi yang cepat."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– Lia XI Animasi 4</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    </main>
  );
}
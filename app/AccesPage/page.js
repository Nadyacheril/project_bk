"use client";
import Image from "next/image";
import Link from "next/link";

export default function AccessPage() {
  return (
    <main className="bg-white min-h-screen text-[#2C3E50]">
      {/* Navbar */}
   <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-6 rounded-full flex items-center justify-between shadow-md">

  <h1 className="font-bold text-2xl tracking-wide cursor-pointer transition-transform duration-300 active:scale-110">BKcTB</h1>

  {/* Tengah */}
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


      {/* Section Guru BK */}
      { <section className="py-16 text-center">
        <h2 className="text-lg font-semibold text-[#5B7DB1] mb-10">
          Guru Bimbingan Konseling Yang <br /> Berada di SMK Taruna Bhakti Saat Ini,
          klik setiap foto untuk melihat profil lengkapnya
        </h2>

        <div className="grid grid-cols-2 gap-10 justify-center max-w-md mx-auto">
          <div className="w-40 h-40 bg-gray-300 rounded-lg mx-auto"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg mx-auto"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg mx-auto"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg mx-auto"></div>
        </div>
      </section> }

      {/* Cara Menggunakan Web */}
      <section className="text-center py-16">
        <h3 className="text-[#5B7DB1] font-semibold mb-6">
          Cara Menggunakan Web BKcTB
        </h3>

        <div className="bg-[#8EAAD6] text-white text-left max-w-xl mx-auto p-8 rounded-2xl leading-relaxed shadow">
          <p className="mb-3">I. Login di Web BKcTB</p>
          <p className="mb-3">
            II. Isi form pengajuan sesuai dengan apa yang tertera di form pengajuan
          </p>
          <p>
            III. Setelah diisi lalu kirim, tunggu form pengajuanmu di ACC oleh guru
            yang kamu pilih di form pengajuan
          </p>
        </div>
      </section>

      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    
    </main>
  );
}

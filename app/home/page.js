

// File: app/siswa/page.js   ← atau app/home/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Bell, LogOut } from "lucide-react";

export default function SiswaDashboard() {
  const [userData, setUserData] = useState(null);
  const [guruList, setGuruList] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [kelas, setKelas] = useState("");
  const [topik, setTopik] = useState("");
  const [jam, setJam] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);

  // Cek login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }
    setUserData(JSON.parse(storedUser));
  }, []);

  // Ambil daftar guru
  useEffect(() => {
    async function fetchGuru() {
      try {
        const res = await fetch("/api/guru");
        const data = await res.json();
        setGuruList(data.guru || []);
      } catch (err) {
        console.error("Gagal ambil data guru");
      }
    }
    fetchGuru();
  }, []);

  const handleOpenModal = (guru) => {
    setSelectedGuru(guru);
    setShowForm(false);
    setKelas("");
    setTopik("");
    setJam("");
    setTanggal("");
  };

  const handleCloseModal = () => setSelectedGuru(null);

  const handlePengajuan = async (e) => {
    e.preventDefault();
    if (!userData || !selectedGuru) return;

    setLoading(true);
    try {
      const profileRes = await fetch("/api/siswa/get-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData.id }),
      });
      const profileData = await profileRes.json();

      if (!profileData.siswaId) {
        alert("Data siswa tidak ditemukan!");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guruId: selectedGuru.id,
          userId: userData.id,
          kelas_siswa: kelas,
          topik,
          jam,
          tanggal,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Pengajuan berhasil dikirim!");
        handleCloseModal();
      } else {
        alert(data.error || "Gagal mengirim pengajuan");
      }
    } catch (err) {
      alert("Terjadi kesalahan!");
    }
    setLoading(false);

   
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-[#5B7DB1] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center rounded-b-3xl">
           <h1 className="text-3xl font-bold tracking-wide relative group cursor-pointer">
      BKcTB - Siswa
      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
    </h1>
          <div className="flex items-center gap-4">
           
            <button
              onClick={() => (window.location.href = "/siswa/profile")}
              className="bg-white text-[#5B7DB1] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition hover:scale-105"
            >
              Profile
            </button>
            
          </div>
        </div>
      </nav>


<section className="text-center mt-20 px-6">
  <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A]">
    Selamat Datang ؛༊
  </h1>
  <p className="text-3xl md:text-4xl font-bold text-[#2C3E50] mt-6 tracking-wide">
    {userData.nama 
      ? userData.nama 
      : userData.email?.split("@")[0] || "Siswa"
    }
  </p>
</section>

      {/* DAFTAR GURU */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#5B7DB1]">
            Guru Bimbingan Konseling
          </h2>
          <p className="text-xl md:text-2xl font-medium mt-4">
      Klik foto untuk mengajukan{" "}
      <span className="text-[#5B7DB1] font-bold">konseling</span>
    </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
          {guruList.map((guru) => (
            <div
              key={guru.id}
              onClick={() => handleOpenModal(guru)}
              className="group cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl ring-4 ring-transparent group-hover:ring-[#5B7DB1]/30">
                <Image
                  src={guru.foto || "/default-avatar.png"}
                  alt={guru.nama}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="mt-6 font-bold text-lg text-center text-[#2C3E50] group-hover:text-[#5B7DB1] transition-colors">
                {guru.nama}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL & FORM */}
      {selectedGuru && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4">
              <X size={28} className="text-gray-500 hover:text-gray-800" />
            </button>
            <h3 className="text-2xl font-bold text-center text-[#5B7DB1] mb-6">
              {selectedGuru.nama}
            </h3>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition"
              >
                Ajukan Konseling
              </button>
            ) : (
              <form onSubmit={handlePengajuan} className="space-y-5">
                <input placeholder="Kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} required className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1]" />
                <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1]" />
                <select value={topik} onChange={(e) => setTopik(e.target.value)} required className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1]">
                  <option value="">Pilih Topik</option>
                  <option>Akademik</option>
                  <option>Pribadi</option>
                  <option>Karir</option>
                  <option>Sosial</option>
                </select>
                <select value={jam} onChange={(e) => setJam(e.target.value)} required className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1]">
                  <option value="">Pilih Jam</option>
                  <option>Senin 08:00-09:00</option>
                  <option>Selasa 09:00-10:00</option>
                  <option>Rabu 10:00-11:00</option>
                  <option>Kamis 13:00-14:00</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold disabled:opacity-70"
                >
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#5B7DB1] text-white py-8 mt-auto">
        <div className="text-center">
          <p className="text-lg font-semibold">© 2025 BKcTB | SMK Taruna Bhakti</p>
        </div>
      </footer>
    </div>
  );
}
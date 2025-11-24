

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function HomePage() {
  const [userData, setUserData] = useState(null);
  const [guruList, setGuruList] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [kelas, setKelas] = useState("");
  const [topik, setTopik] = useState("");
  const [jam, setJam] = useState("");
  const [loading, setLoading] = useState(false);
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return window.location.href = "/login";
    setUserData(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    async function fetchGuru() {
      const res = await fetch("/api/guru");
      const data = await res.json();
      setGuruList(data.guru || []);
    }
    fetchGuru();
  }, []);

  const handleOpenModal = (guru) => {
    setSelectedGuru(guru);
    setShowForm(false);
    setKelas(""); setTopik(""); setJam("");
  };

  const handleCloseModal = () => setSelectedGuru(null);

  const handlePengajuan = async (e) => {
  e.preventDefault();
  if (!userData || !selectedGuru) return;

  setLoading(true);
  try {
    // LANGSUNG AMBIL siswaId DARI DATABASE PAKAI user.id (users.id)
    const profileRes = await fetch("/api/siswa/get-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.id }),   // kirim user.id
    });

    const profileData = await profileRes.json();
    if (!profileData.siswaId) {
      alert("Data siswa tidak ditemukan!");
      setLoading(false);
      return;
    }

    // SEKARANG KIRIM PENGAJUAN
    const res = await fetch("/api/pengajuan", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    guruId: selectedGuru.id,
    userId: userData.id,               // ⬅️ harus userId
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
      alert(data.error || "Gagal mengirim");
    }
  } catch (err) {
    console.error(err);
    alert("Gagal mengirim pengajuan");
  }
  setLoading(false);
};
  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-white text-[#2C3E50]">
      <nav className="bg-[#5B7DB1] text-white px-6 py-4 flex justify-between items-center rounded-full shadow-lg mb-10 mx-4">
        <h1 className="font-bold text-2xl">BKcTB</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href="/siswa/profile"} className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold">Profile</button>
          <button onClick={() => { localStorage.removeItem("user"); window.location.href="/login"; }} className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold">Logout</button>
        </div>
      </nav>

      <section className="text-center mt-10">
        <h2 className="text-3xl font-semibold text-[#5B7DB1]">Selamat datang 𐚁,</h2>
        <p className="text-2xl font-bold mt-2">{userData.nama || userData.email}</p>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-lg font-semibold text-[#5B7DB1] mb-12">
          Guru Bimbingan Konseling Klik foto untuk mengajukan
        </h2>

        <div className="grid grid-cols-2 gap-10 max-w-md mx-auto">
          {guruList.map((guru) => (
            <div key={guru.id} onClick={() => handleOpenModal(guru)} className="cursor-pointer transition-all hover:scale-105">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gray-100">
                <Image
                  src={guru.foto}
                  alt={guru.nama}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 font-bold text-lg text-center">{guru.nama}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedGuru && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
            <button onClick={handleCloseModal} className="absolute top-3 right-3"><X size={28} /></button>
            <h3 className="text-2xl font-bold text-center mb-6">{selectedGuru.nama}</h3>
            {!showForm ? (
              <button onClick={() => setShowForm(true)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg">Ajukan Konseling</button>
            ) : (
              <form onSubmit={handlePengajuan} className="space-y-4">

  {/* KELAS */}
  <input
    placeholder="Kelas"
    value={kelas}
    onChange={(e) => setKelas(e.target.value)}
    required
    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
  />

  {/* TANGGAL ⬅️ TAMBAHKAN DI SINI */}
  <input
    type="date"
    value={tanggal}
    onChange={(e) => setTanggal(e.target.value)}
    required
    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
  />

  {/* TOPIK */}
  <select
    value={topik}
    onChange={(e) => setTopik(e.target.value)}
    required
    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
  >
    <option value="">Pilih Topik</option>
    <option>Akademik</option>
    <option>Pribadi</option>
    <option>Karir</option>
    <option>Sosial</option>
  </select>

  {/* JAM */}
  <select
    value={jam}
    onChange={(e) => setJam(e.target.value)}
    required
    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
  >
    <option value="">Pilih Jadwal</option>
    <option>Senin 08:00-09:00</option>
    <option>Selasa 09:00-10:00</option>
    <option>Rabu 10:00-11:00</option>
    <option>Kamis 13:00-14:00</option>
  </select>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold"
  >
    {loading ? "Mengirim..." : "Kirim Pengajuan"}
  </button>
</form>

            )}
          </div>
        </div>
      )}
      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    </main>
  );
}



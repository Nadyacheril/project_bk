"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function MainPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const guruList = [
    { id: 1, nama: "BU CACA", foto: "/guru/bucaca.jpg", pengalaman: "10 tahun", mapel: "BK" },
    { id: 2, nama: "Bu Heni", foto: "/guru/buheni.jpg", pengalaman: "8 tahun", mapel: "BK" },
    { id: 3, nama: "Pak Fika", foto: "/guru/bufika.jpg", pengalaman: "5 tahun", mapel: "BK" },
    { id: 4, nama: "Bu Nadia", foto: "/guru/bunadia.jpg", pengalaman: "12 tahun", mapel: "BK" },
  ];

  const [selectedGuru, setSelectedGuru] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [kelas, setKelas] = useState("");
  const [topik, setTopik] = useState("");
  const [jam, setJam] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (guru) => {
    setSelectedGuru(guru);
    setShowForm(false);
    setKelas(""); setTopik(""); setJam("");
  };
  const handleCloseModal = () => setSelectedGuru(null);

  const handlePengajuan = async (e) => {
    e.preventDefault();
    if (!user) { alert("Silakan login dulu"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guruId: selectedGuru.id,
          siswaId: user.id,
          kelas_siswa: kelas,
          topik,
          jam,
        }),
      });
      const data = await res.json();
      if (res.ok) { alert("Pengajuan berhasil!"); handleCloseModal(); }
      else alert(data.error);
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white text-[#2C3E50]">
      <nav className="bg-[#5B7DB1] text-white px-6 py-3 flex justify-between rounded-full shadow-md mb-10">
        <h1 className="font-bold text-2xl">BKcTB</h1>
        {!user ? (
          <button onClick={() => window.location.href="/login"} className="bg-white text-[#395E9D] px-4 py-2 rounded-full">Login</button>
        ) : (
          <span>Halo, {user.name || user.email}</span>
        )}
      </nav>

      <section className="py-20 text-center">
        <h2 className="text-lg font-semibold text-[#5B7DB1] mb-10">
          Guru Bimbingan Konseling <br /> Klik foto untuk mengajukan
        </h2>
        <div className="grid grid-cols-2 gap-10 max-w-md mx-auto">
          {guruList.map((guru) => (
            <div key={guru.id} onClick={() => handleOpenModal(guru)} className="cursor-pointer">
              <Image src={guru.foto} width={160} height={160} alt={guru.nama} className="rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {selectedGuru && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2"><X /></button>
            <h3 className="text-xl font-semibold text-center">{selectedGuru.nama}</h3>
            {!showForm && user && <button onClick={() => setShowForm(true)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Klik Pengajuan</button>}
            {showForm && (
              <form onSubmit={handlePengajuan} className="mt-4 flex flex-col gap-2">
                <input placeholder="Kelas" value={kelas} onChange={e=>setKelas(e.target.value)} required className="border px-2 py-1 rounded"/>
                <select value={topik} onChange={e=>setTopik(e.target.value)} required className="border px-2 py-1 rounded">
                  <option value="">Pilih Topik</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Pribadi">Pribadi</option>
                  <option value="Karir">Karir</option>
                  <option value="Sosial">Sosial</option>
                </select>
                <select value={jam} onChange={e=>setJam(e.target.value)} required className="border px-2 py-1 rounded">
                  <option value="">Pilih Jam</option>
                  <option value="08:00-09:00">08:00-09:00</option>
                  <option value="09:00-10:00">09:00-10:00</option>
                  <option value="10:00-11:00">10:00-11:00</option>
                  <option value="13:00-14:00">13:00-14:00</option>
                </select>
                <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 rounded mt-2">{loading?"Mengirim...":"Kirim Pengajuan"}</button>
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

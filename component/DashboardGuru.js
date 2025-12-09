"use client";

import { useEffect, useState } from "react";
import { Bell, X, Trash2, CheckCircle, LogOut, Calendar, Clock } from "lucide-react";

export default function DashboardGuru() {
  const [userData, setUserData] = useState(null);
  const [guruId, setGuruId] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return (window.location.href = "/login");
    setUserData(JSON.parse(storedUser));
  }, []);

  const fetchGuruId = async () => {
    if (!userData) return;
    try {
      const res = await fetch(`/api/guru/by-user-id?userId=${userData.id}`);
      const data = await res.json();
      if (data.success && data.guru) setGuruId(data.guru.id);
      else setGuruId(null);
    } catch (err) {
      console.error("Gagal ambil guru.id:", err);
    }
  };

  const fetchPengajuan = async () => {
    if (!guruId) return;
    try {
      const res = await fetch(`/api/guru/pengajuan?guruId=${guruId}`);
      const data = await res.json();
      if (data.success) setPengajuan(data.data || []);
    } catch (err) {
      console.error("Gagal fetch pengajuan:", err);
    }
  };

  useEffect(() => { if (userData) fetchGuruId(); }, [userData]);
  useEffect(() => {
    if (guruId) {
      fetchPengajuan();
      const interval = setInterval(fetchPengajuan, 10000);
      return () => clearInterval(interval);
    }
  }, [guruId]);

  const handleSetujui = async (id) => {
    if (!confirm("Yakin SETUJUI pengajuan ini?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pengajuan/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Disetujui" }),
      });
      if (res.ok) {
        fetchPengajuan();
        alert("Pengajuan disetujui!");
      } else alert("Gagal setujui.");
    } catch (err) { alert("Error jaringan!"); }
    setLoading(false);
  };

  const handleHapus = async (id) => {
    if (!confirm("YAKIN MAU HAPUS PERMANEN?\nData akan hilang selamanya!")) return;
    try {
      const res = await fetch(`/api/pengajuan/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hapus: true }),
      });
      if (res.ok) {
        fetchPengajuan();
        alert("Pengajuan berhasil dihapus!");
      } else {
        const err = await res.text();
        alert("Gagal hapus: " + err);
      }
    } catch (err) { alert("Error jaringan!"); }
  };

  if (!userData) return <div className="text-center mt-20 text-2xl">Loading...</div>;
  if (guruId === null) return <div className="text-center mt-20 text-2xl text-red-600">Akun guru tidak valid!</div>;

  const guruNama = userData.nama || userData.email?.split("@")[0] || "Guru";
  const notifCount = pengajuan.filter(p => p.status === "Menunggu").length;

  const formatTanggal = (date) => new Date(date).toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  const formatJadwal = (tanggal, jam) => {
    if (!tanggal || !jam) return "Tidak ada jadwal";
    return `${tanggal} • ${jam}`;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">

        {/* NAVBAR */}
        
        <nav className="bg-gradient-to-r from-[#5B7DB1] to-[#3a5d8a] text-white px-8 py-5 shadow-xl flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide relative group cursor-pointer">
            BKcTB - Guru
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
          </h1>

          <div className="flex items-center gap-8">
            <button onClick={() => setShowNotif(true)} className="relative p-3 bg-white/20 hover:bg-white/30 rounded-full transition">
              <Bell size={28} />
              {notifCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
                  {notifCount}
                </span>
              )}
            </button>

            <button onClick={() => confirm("Yakin logout?") && (localStorage.removeItem("user"), window.location.href = "/login")}
              className="flex items-center gap-2 bg-white text-[#5B7DB1] px-6 py-3 rounded-full font-bold hover:scale-105 transition">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-6 pb-12">

          <div className="text-center my-12">
            <h2 className="text-3xl font-bold text-[#2C3E50]">Selamat Datang!!</h2>
            <p className="text-5xl font-extrabold text-[#5B7DB1] mt-3">{guruNama}!</p>
          </div>

          <h2 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">
            Daftar Pengajuan Konseling
          </h2>

          {pengajuan.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">Belum ada pengajuan masuk.</p>
            </div>
          ) : (
            <div className="grid gap-8 max-w-6xl mx-auto">
              {pengajuan.map((item) => (
                <div
                  key={item.id}
                  className={`p-8 rounded-3xl shadow-2xl border-4 transition-all ${
                    item.status === "Menunggu" 
                      ? "border-[#3a5d8a] bg-blue-50/80" 
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">

                    {/* KIRI - INFO SISWA & JADWAL */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-3xl font-bold text-[#2C3E50]">{item.nama_siswa}</h3>
                      <p className="text-2xl font-extrabold text-[#3a5d8a] mt-3 flex items-center gap-3 border-indigo-400"><strong>Kelas :</strong> {item.kelas_siswa}</p>
                      <p className="text-2xl font-extrabold text-[#3a5d8a] mt-3 flex items-center gap-3 border-indigo-400"><strong>Topik :</strong> {item.topik}</p>

                      {/* INI YANG BARU: JADWAL BESAR & JELAS */}
                      <div className="mt-6 p-5 bg-gradient-to-r  rounded-2xl border-2 border-indigo-400">
                        <div className="flex items-center gap-3 text-[#3a5d8a] font-bold text-lg">
                          <Calendar size={26} />
                          <span>Jadwal Konseling yang Diminta</span>
                        </div>
                        <p className="text-2xl font-bold text-[#3a5d8a] mt-3 flex items-center gap-3">
                          <Clock size={30} />
                          {formatJadwal(item.tanggal, item.jam)}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600">Diajukan: {formatTanggal(item.created_at)}</p>

                      <div className="flex items-center gap-4 mt-6">
                        <span className="font-bold text-lg">Status :</span>
                        <span className={`px-5 py-3 rounded-full font-bold text-white text-lg ${
                          item.status === "Menunggu" ? "bg-orange-600" :
                          item.status === "Disetujui" ? "bg-green-600" : "bg-red-600"
                        }`}>
                          {item.status}
                        </span>
                      </div>

                  
                    </div>

                    {/* KANAN - TOMBOL AKSI */}
                    <div className="flex flex-col gap-4 justify-center">
                      {item.status === "Menunggu" && (
                        <button
                          onClick={() => handleSetujui(item.id)}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold text-1xl px-8 py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition disabled:opacity-70"
                        >
                          <CheckCircle size={30} />
                          {loading ? "Memproses..." : "SETUJUI"}
                        </button>
                      )}
                      <button
                        onClick={() => handleHapus(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-1xl px-8 py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition"
                      >
                        <Trash2 size={30} />
                        HAPUS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {showNotif && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-[#2C3E50]">Notifikasi Pengajuan Baru</h3>
                    <button onClick={() => setShowNotif(false)} className="p-3 hover:bg-gray-200 rounded-full">
                      <X size={32} />
                    </button>
                  </div>

                  {pengajuan.filter(p => p.status === "Menunggu").length === 0 ? (
                    <p className="text-center text-gray-500 text-xl py-16">Tidak ada pengajuan baru.</p>
                  ) : (
                    <div className="space-y-6">
                      {pengajuan.filter(p => p.status === "Menunggu").map(p => (
                        <div key={p.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-3 border-blue-400 rounded-3xl p-8">
                          <div className="flex justify-between items-start gap-6">
                            <div>
                              <p className="text-3xl font-bold text-[#2C3E50]">{p.nama_siswa}</p>
                              <p className="text-xl text-gray-700 mt-2">Kelas {p.kelas_siswa} • {p.topik}</p>
                              <div className="mt-4 p-4 bg-indigo-100 rounded-xl">
                                <p className="font-bold text-indigo-900 flex items-center gap-2 gap-3">
                                  <Calendar size={24} /> {p.tanggal} <Clock size={24} /> {p.jam}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 mt-3">{formatTanggal(p.created_at)}</p>
                            </div>
                            <button onClick={() => handleHapus(p.id)} className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-lg transition">
                              <Trash2 size={26} /> 
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>

        <footer className="bg-[#5B7DB1] text-white py-8 text-center">
          <p className="font-semibold">© 2025 BKcTB | SMK Taruna Bhakti</p>
        </footer>
      </div>
    </>
  );
}
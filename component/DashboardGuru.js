
"use client";

import { useEffect, useState } from "react";
import { Bell, X, Trash2, CheckCircle, LogOut } from "lucide-react";

export default function DashboardGuru() {
  const [userData, setUserData] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return (window.location.href = "/login");
    setUserData(JSON.parse(storedUser));
  }, []);

  const fetchPengajuan = async () => {
    if (!userData) return;
    try {
      const res = await fetch(`/api/guru/pengajuan?guruId=${userData.id}`);
      const data = await res.json();
      if (data.success) setPengajuan(data.data || []);
    } catch (err) {
      console.error("Gagal fetch:", err);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchPengajuan();
      const interval = setInterval(fetchPengajuan, 10000); // refresh tiap 10 detik
      return () => clearInterval(interval);
    }
  }, [userData]);

  // SETUJUI PENGAJUAN
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
        await fetchPengajuan();
        alert("Pengajuan disetujui!");
      } else alert("Gagal setujui.");
    } catch (err) {
      alert("Error jaringan!");
    }
    setLoading(false);
  };

  // HAPUS PERMANEN
  const handleHapus = async (id) => {
    if (!confirm("YAKIN NI MAU HAPUS PERMANEN?\nData akan hilang selamanya loh!")) return;

    try {
      const res = await fetch(`/api/pengajuan/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hapus: true }),
      });

      if (res.ok) {
        await fetchPengajuan();
        alert("Pengajuan berhasil dihapus!");
      } else {
        const err = await res.text();
        alert("Gagal hapus: " + err);
      }
    } catch (err) {
      alert("Error jaringan!");
    }
  };

  if (!userData) return <div className="text-center mt-20 text-2xl">Loading...</div>;

  const guruNama = userData.nama || userData.email?.split("@")[0] || "Guru";
  const notifCount = pengajuan.filter(p => p.status === "Menunggu").length;

  const formatTanggal = (date) => new Date(date).toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-6">
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-[#5B7DB1] to-[#3a5d8a] text-white px-8 py-4 rounded-3xl shadow-2xl flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold tracking-wide relative group cursor-pointer">
      BKcTB - Dashboard Guru
      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
    </h1>
        <div className="flex items-center gap-6">
          {/* Notifikasi */}
          <button onClick={() => setShowNotif(true)} className="relative p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
            <Bell size={28} />
            {notifCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
                {notifCount}
              </span>
            )}
          </button>

          {/* LOGOUT DENGAN KONFIRMASI */}
          <button
            onClick={() => {
              if (window.confirm("Yakin mau logout ni??")) {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }
            }}
            className="flex items-center gap-3 bg-white text-[#5B7DB1] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Selamat Datang */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#2C3E50]">⋆.𐙚 ̊Selamat Datang!!,</h2>
        <p className="text-5xl font-extrabold text-[#5B7DB1] mt-3">{guruNama}!</p>
      </div>

      {/* Daftar Pengajuan */}
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Daftar Pengajuan Konseling ᝰ.ᐟ</h2>

      {pengajuan.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Belum ada pengajuan masuk.</p>
        </div>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {pengajuan.map((item) => (
            <div key={item.id} className={`p-8 rounded-3xl shadow-xl border-4 transition-all ${
              item.status === "Menunggu" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
            }`}>
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2C3E50]">{item.nama_siswa}</h3>
                  <p className="text-lg mt-2"><strong>Kelas:</strong> {item.kelas_siswa}</p>
                  <p className="text-lg"><strong>Topik:</strong> {item.topik}</p>
                  <p className="text-sm text-gray-600 mt-3">Diajukan: {formatTanggal(item.created_at)}</p>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="font-bold text-lg">Status:</span>
                    <span className={`px-5 py-2 rounded-full font-bold text-white ${
                      item.status === "Menunggu" ? "bg-orange-600" :
                      item.status === "Disetujui" ? "bg-green-600" : "bg-red-600"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {item.alasan && (
                    <p className="mt-4 text-red-700 font-medium bg-red-50 p-4 rounded-xl">
                      <strong>Alasan Penolakan:</strong> {item.alasan}
                    </p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col gap-4">
                  {item.status === "Menunggu" && (
                    <button
                      onClick={() => handleSetujui(item.id)}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition disabled:opacity-70"
                    >
                      <CheckCircle size={24} />
                      {loading ? "Memproses..." : "SETUJUI"}
                    </button>
                  )}
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition"
                  >
                    <Trash2 size={24} />
                    HAPUS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Notifikasi */}
      {showNotif && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#2C3E50]">Notifikasi Pengajuan Baru</h3>
                <button onClick={() => setShowNotif(false)} className="p-3 hover:bg-gray-200 rounded-full transition">
                  <X size={28} />
                </button>
              </div>

              {pengajuan.filter(p => p.status === "Menunggu").length === 0 ? (
                <p className="text-center text-gray-500 text-xl py-12">Tidak ada pengajuan baru.</p>
              ) : (
                <div className="space-y-5">
                  {pengajuan.filter(p => p.status === "Menunggu").map((p) => (
                    <div key={p.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{p.nama_siswa}</p>
                        <p className="text-lg text-gray-700 mt-1">Kelas {p.kelas_siswa} • {p.topik}</p>
                        <p className="text-sm text-gray-500 mt-2">{formatTanggal(p.created_at)}</p>
                      </div>
                      <button
                        onClick={() => handleHapus(p.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg transition"
                      >
                        <Trash2 size={22} /> HAPUS
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
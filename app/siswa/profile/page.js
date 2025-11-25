
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bell, LogOut, Camera, X, Save, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";

export default function ProfileSiswa() {
  const [userData, setUserData] = useState(null);
  const [siswaData, setSiswaData] = useState(null);
  const [fotoPreview, setFotoPreview] = useState("/default-avatar.png");
  const [quotes, setQuotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pengajuanList, setPengajuanList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadAll = async () => {
      const stored = localStorage.getItem("user");
      if (!stored) return (window.location.href = "/login");

      const user = JSON.parse(stored);
      setUserData(user);

      // Load profil
      const res = await fetch("/api/siswa/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (data.success) {
        setSiswaData(data.siswa);
        setFotoPreview(data.siswa.foto || "/default-avatar.png");
        setQuotes(data.siswa.quotes || "");
      }

      // Load pengajuan + nama guru
      const pengajuanRes = await fetch("/api/siswa/pengajuan-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const pengajuanData = await pengajuanRes.json();
      if (pengajuanData.success) {
        setPengajuanList(pengajuanData.pengajuan || []);
        const unread = (pengajuanData.pengajuan || []).filter(p => p.status !== "Menunggu" && p.notif_dibaca == 0);
        setNotifications(unread);
      }
    };
    loadAll();
  }, []);

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userData) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("userId", userData.id);
    try {
      const res = await fetch("/api/siswa/upload-foto", { method: "POST", body: formData });
      const result = await res.json();
      if (result.success) {
        setFotoPreview(result.foto);
        setSiswaData(prev => ({ ...prev, foto: result.foto }));
        alert("Foto berhasil diupload!");
      }
    } catch (err) { alert("Error upload"); }
    setLoading(false);
  };

  const handleSaveQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/siswa/update-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData.id, quotes: quotes.trim() || null }),
      });
      const result = await res.json();
      if (result.success) {
        setSiswaData(prev => ({ ...prev, quotes }));
        setIsEditing(false);
        alert("Quotes berhasil disimpan!");
      }
    } catch (err) { alert("Error"); }
    setLoading(false);
  };

  const hapusPengajuan = async (id) => {
    if (!confirm("Yakin hapus pengajuan ini?")) return;
    const res = await fetch("/api/siswa/hapus-pengajuan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPengajuanList(prev => prev.filter(p => p.id !== id));
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const tandaiSemuaDibaca = async () => {
    await fetch("/api/siswa/tandai-dibaca", { method: "POST" });
    setNotifications([]);
    setPengajuanList(prev => prev.map(p => ({ ...p, notif_dibaca: 1 })));
  };

  if (!userData || !siswaData) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 text-3xl font-bold text-[#5B7DB1]">Loading...</div>;
  }

  const namaTampil = siswaData.nama || userData.email.split("@")[0];
  const kelasTampil = pengajuanList[0]?.kelas_siswa || siswaData.kelas || "-";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-[#5B7DB1] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BKcTB - Profil</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="p-3 bg-white/20 rounded-full hover:bg-white/30 relative">
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-[#5B7DB1] text-white p-4 font-bold flex justify-between items-center">
                    <span>Notifikasi</span>
                    {notifications.length > 0 && <button onClick={tandaiSemuaDibaca} className="text-sm underline">Tandai semua dibaca</button>}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-6 text-center text-gray-500">Tidak ada notifikasi baru</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 border-b hover:bg-gray-50 flex justify-between items-start">
                          <div>
                            <p className="font-semibold">Pengajuan {n.topik}</p>
                            <p className="text-sm text-gray-600">Status: <span className={n.status === "Disetujui" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{n.status}</span></p>
                          </div>
                          <button onClick={() => hapusPengajuan(n.id)} className="text-red-500 hover:text-red-700"><X size={18} /></button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => confirm("Yakin logout?") && (localStorage.removeItem("user"), window.location.href = "/login")}
              className="flex items-center gap-2 bg-white text-[#5B7DB1] px-6 py-3 rounded-full font-bold hover:scale-105 transition">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* CARD PROFIL */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-br from-[#5B7DB1] to-[#3A5D8A] h-40 relative">
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-gray-200">
                  <Image src={fotoPreview} alt="Profil" width={160} height={160} className="object-cover w-full h-full" />
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-xl hover:scale-110 transition">
                  <Camera size={22} className="text-[#5B7DB1]" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
              </div>
            </div>
          </div>

          <div className="pt-24 pb-10 px-8 text-center">
            <h2 className="text-3xl font-bold text-[#2C3E50]">{namaTampil}</h2>
            <p className="text-gray-600 mt-2">{userData.email}</p>
            <p className="text-lg font-medium text-[#5B7DB1] mt-1">Kelas {kelasTampil}</p>

            <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 italic text-lg text-center leading-relaxed">
                "{quotes || "Belum ada quotes favorit"}"
              </p>
            </div>

            <button onClick={() => setIsEditing(true)} className="mt-8 w-full bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-4 rounded-xl font-bold hover:shadow-xl transition hover:scale-105">
              Edit Quotes
            </button>
          </div>
        </div>
      </main>

      {/* RIWAYAT PENGAJUAN — DESAIN LAMA YANG CANTIK */}
      <div className="flex-1 px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-[#5B7DB1] mb-6 text-center">Riwayat Pengajuan Konseling</h3>
            {pengajuanList.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Belum ada pengajuan</p>
            ) : (
              <div className="space-y-4">
                {pengajuanList.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border">
                    <div className="flex items-center gap-4">
                      {p.status === "Menunggu" && <Clock className="text-yellow-600" size={24} />}
                      {p.status === "Disetujui" && <CheckCircle className="text-green-600" size={24} />}
                      {p.status === "Ditolak" && <XCircle className="text-red-600" size={24} />}
                      <div>
                        <p className="font-semibold">{p.topik}</p>
                        <p className="text-sm text-gray-600">Ke: <strong>{p.nama_guru || "Guru BK"}</strong></p>
                        <p className="text-sm text-gray-600">{new Date(p.tanggal).toLocaleDateString("id-ID")} • {p.jam}</p>
                        <span className={`text-sm font-bold ${p.status === "Menunggu" ? "text-yellow-600" : p.status === "Disetujui" ? "text-green-600" : "text-red-600"}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => hapusPengajuan(p.id)} className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL QUOTES */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#5B7DB1]">Edit Quotes</h3>
              <button onClick={() => setIsEditing(false)}><X size={28} /></button>
            </div>
            <textarea
              value={quotes}
              onChange={(e) => setQuotes(e.target.value)}
              rows="5"
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1] outline-none resize-none"
              placeholder="Tulis quotes favoritmu..."
            />
            <div className="flex gap-4 mt-6">
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 py-4 rounded-xl font-bold">Batal</button>
              <button onClick={handleSaveQuotes} disabled={loading} className="flex-1 bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70">
                <Save size={20} /> {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#5B7DB1] text-white py-8 text-center">
        <p className="font-semibold">© 2025 BKcTB | SMK Taruna Bhakti</p>
      </footer>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Edit2, CheckCircle, XCircle, Clock, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [siswa, setSiswa] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [notifCount, setNotifCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({ foto: null, quotes: "", kelas: "" });
  const [previewFoto, setPreviewFoto] = useState("/default-avatar.png");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) return window.location.href = "/login";
    setUserData(user);
    loadProfile(user.id);
    loadPengajuan(user.id);
  }, []);

  const loadProfile = async (userId) => {
    const res = await fetch("/api/siswa/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (data.success) {
      setSiswa(data.siswa);
      setPreviewFoto(data.siswa.foto || "/default-avatar.png");
      setForm({ quotes: data.siswa.quotes || "", kelas: data.siswa.kelas || "", foto: null });
    }
  };

  const loadPengajuan = async (userId) => {
    const res = await fetch(`/api/siswa/pengajuan?userId=${userId}`);
    const data = await res.json();
    if (data.success) {
      setPengajuan(data.data || []);
      const unread = data.data.filter(p => p.status !== "Menunggu" && !p.dibaca).length;
      setNotifCount(unread);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setForm({ ...form, foto: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("userId", userData.id);
    formData.append("quotes", form.quotes);
    formData.append("kelas", form.kelas);
    if (form.foto) formData.append("foto", form.foto);

    const res = await fetch("/api/siswa/profile", {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();

    if (res.ok) {
      alert("Profil berhasil diperbarui!");
      setShowEditModal(false);
      loadProfile(userData.id);
    } else {
      alert(result.error || "Gagal menyimpan");
    }
    setUploading(false);
  };

  const markAsRead = async (id) => {
    await fetch("/api/siswa/pengajuan", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadPengajuan(userData.id);
  };

  if (!siswa) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-3xl font-bold text-[#5B7DB1]">Loading...</p>
    </div>
  );

  return (
    <>
      {/* NAVBAR PERSIS YANG LU MAU */}
      <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-10 rounded-full flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="font-bold text-2xl">BKcTB</h1>
        <div className="flex items-center gap-6">
          {/* FOTO PROFIL + NOTIFIKASI */}
          <div className="relative">
            <button onClick={() => setShowEditModal(true)} className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-white/50">
              <Image src={previewFoto} alt="Profil" width={48} height={48} className="object-cover w-full h-full" />
            </button>
            {notifCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {notifCount}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-full transition font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 bg-white min-h-screen">
        {/* HEADER PROFIL */}
        <div className="text-center mb-12">
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-8 border-[#5B7DB1] shadow-2xl mb-6">
            <Image src={siswa.foto || "/default-avatar.png"} alt="Profil" width={176} height={176} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl font-extrabold text-[#2C3E50]">{siswa.nama}</h1>
          <p className="text-2xl text-[#5B7DB1] mt-3 font-bold">Kelas {siswa.kelas || "-"}</p>
        </div>

        {/* QUOTES PRIBADI */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#5B7DB1]/10 to-blue-100 rounded-3xl p-10 text-center shadow-xl mb-16">
          <p className="text-3xl italic font-medium text-[#2C3E50] leading-relaxed">
            "{siswa.quotes || "Belum ada kutipan pribadi... Tulis yang menginspirasimu!"}"
          </p>
          <button onClick={() => setShowEditModal(true)} className="mt-8 text-[#5B7DB1] font-bold text-lg flex items-center gap-2 mx-auto hover:underline">
            <Edit2 size={24} /> Edit Profil & Quotes
          </button>
        </div>

        {/* RIWAYAT PENGAJUAN */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#5B7DB1]">Riwayat Pengajuan Konseling</h2>
          {pengajuan.length === 0 ? (
            <div class ofName="text-center py-20">
              <p className="text-2xl text-gray-500">Belum ada pengajuan konseling</p>
            </div>
          ) : (
            <div className="space-y-8">
              {pengajuan.map((p) => (
                <div key={p.id} className={`p-8 rounded-3xl shadow-xl border-l-8 transition-all ${p.status === "Disetujui" ? "border-green-500 bg-green-50" : p.status === "Ditolak" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-[#2C3E50]">Kepada: {p.guru_nama}</h3>
                      <div className="mt-4 space-y-2 text-lg">
                        <p><strong>Topik:</strong> {p.topik}</p>
                        <p><strong>Jadwal:</strong> {p.tanggal} • {p.jam}</p>
                        {p.alasan && <p className="text-red-700 font-medium mt-3">Alasan ditolak: {p.alasan}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-bold text-lg ${p.status === "Disetujui" ? "bg-green-600" : p.status === "Ditolak" ? "bg-red-600" : "bg-yellow-600"}`}>
                        {p.status === "Disetujui" && <CheckCircle size={24} />}
                        {p.status === "Ditolak" && <XCircle size={24} />}
                        {p.status === "Menunggu" && <Clock size={24} />}
                        {p.status}
                      </span>
                      {!p.dibaca && p.status !== "Menunggu" && (
                        <button onClick={() => markAsRead(p.id)} className="block mt-4 text-blue-600 font-medium underline">
                          Tandai sudah dibaca
                        </button>
                      )}
                    </div>
                </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL EDIT PROFIL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full">
              <X size={32} />
            </button>
            <h2 className="text-4xl font-bold text-center mb-10 text-[#5B7DB1]">Edit Profil</h2>

            <form onSubmit={handleUpdate} className="space-y-8">
              {/* FOTO */}
              <div className="text-center">
                <label className="cursor-pointer block group">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-[#5B7DB1] shadow-2xl relative">
                    <Image src={previewFoto} alt="Preview" width={192} height={192} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Upload size={48} className="text-white" />
                    </div>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <p className="mt-4 text-gray-600 font-medium">Klik foto untuk ganti</p>
              </div>

              {/* QUOTES */}
              <div>
                <label className="block text-xl font-bold mb-3">Quotes Pribadi</label>
                <textarea
                  value={form.quotes}
                  onChange={(e) => setForm({ ...form, quotes: e.target.value })}
                  placeholder="Tulis kutipan yang menginspirasimu..."
                  rows={5}
                  className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-lg focus:border-[#5B7DB1] outline-none resize-none"
                />
              </div>

              {/* KELAS */}
              <div>
                <label className="block text-xl font-bold mb-3">Kelas</label>
                <input
                  type="text"
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                  placeholder="XII RPL 2"
                  className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-lg focus:border-[#5B7DB1] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-[#5B7DB1] to-blue-700 text-white font-bold text-2xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transition disabled:opacity-70"
              >
                {uploading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold mt-20">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    </>
  );
}
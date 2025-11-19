"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/component/LogoutButton.js";


export default function AdminDashboard() {
  const [form, setForm] = useState({ nama: "", email: "", nip: "" });
  const [pengajuanList, setPengajuanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  
  // Load semua pengajuan saat mount
  useEffect(() => {
    fetchPengajuan();
  }, []);

  const fetchPengajuan = async () => {
    const res = await fetch("/api/admin/pengajuan-all");
    if (res.ok) {
      const data = await res.json();
      setPengajuanList(data);
    }
  };

  const handleTambahGuru = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/admin/tambah-guru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setMsg("Guru berhasil ditambahkan & email terkirim!");
      setForm({ nama: "", email: "", nip: "" });
    } else {
      setMsg(data.error || "Gagal menambahkan guru");
    }
    setLoading(false);
  };

  const handleHapusPengajuan = async (id) => {
    if (!confirm("Hapus pengajuan ini?")) return;
    const res = await fetch("/api/admin/delete-pengajuan", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPengajuanList(pengajuanList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Link href="/LandingPage" className="text-gray-700 font-medium">Back</Link>
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="BKcTB" width={40} height={40} className="rounded" />
          <span className="font-bold text-[#5B7DB1]">BKcTB</span>
        </div>
        <LogoutButton />
      </nav>

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

        {/* Form Tambah Guru */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#5B7DB1] mb-4">Tambah Guru BK</h2>
          <form onSubmit={handleTambahGuru} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nama Guru"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Masukan NIP"
              value={form.nip}
              onChange={(e) => setForm({ ...form, nip: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-3 bg-[#5B7DB1] text-white py-3 rounded-lg hover:bg-[#4A6995] disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Tambah Guru"}
            </button>
          </form>
          {msg && (
            <p className={`mt-3 text-sm ${msg.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
              {msg}
            </p>
          )}
        </div>

        {/* List Semua Pengajuan */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#5B7DB1] mb-4">Semua Pengajuan Siswa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#8EAAD6] text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Siswa</th>
                  <th className="px-3 py-2 text-left">Kelas</th>
                  <th className="px-3 py-2 text-left">Guru</th>
                  <th className="px-3 py-2 text-left">Topik</th>
                  <th className="px-3 py-2 text-left">Tanggal</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pengajuanList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-3 py-6 text-center text-gray-500">
                      Belum ada pengajuan
                    </td>
                  </tr>
                ) : (
                  pengajuanList.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{p.nama_siswa}</td>
                      <td className="px-3 py-2">{p.kelas_siswa}</td>
                      <td className="px-3 py-2">{p.nama_guru}</td>
                      <td className="px-3 py-2">{p.topik}</td>
                      <td className="px-3 py-2">{new Date(p.tanggal).toLocaleDateString("id-ID")}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 text-xs rounded-full
                          ${p.status === 'diterima' ? 'bg-green-100 text-green-800' :
                            p.status === 'ditolak' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => handleHapusPengajuan(p.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
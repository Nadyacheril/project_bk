"use client";
import { useEffect, useState } from "react";

export default function DashboardGuru() {
  // sementara hardcode ID guru
  // nanti kamu ganti pakai session guru login
  const guruId = 1;

  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const res = await fetch(`/api/guru/pengajuan?guruId=${guruId}`);
      const data = await res.json();
      setPengajuan(data);
    } catch (err) {
      console.error("Gagal ambil pengajuan:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleStatus(id, status) {
    await fetch("/api/guru/pengajuan/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    loadData(); // refresh tabel
  }

  if (loading) {
    return <p className="text-center mt-10">Loading data...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#395E9D]">
        Dashboard Guru – Pengajuan Masuk
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-[#5B7DB1] text-white">
            <tr>
              <th className="p-2 border">Siswa</th>
              <th className="p-2 border">Kelas</th>
              <th className="p-2 border">Topik</th>
              <th className="p-2 border">Jam</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pengajuan.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.nama_siswa}</td>
                <td className="p-2 border">{p.kelas_siswa}</td>
                <td className="p-2 border">{p.topik}</td>
                <td className="p-2 border">{p.jam}</td>
                <td className="p-2 border font-semibold">{p.status}</td>

                <td className="p-2 border flex gap-2 justify-center">
                  {p.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatus(p.id, "Diterima")}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Terima
                      </button>

                      <button
                        onClick={() => handleStatus(p.id, "Ditolak")}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Tolak
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Sudah diproses</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

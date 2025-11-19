"use client";
import { useState } from "react";

export default function FormPengajuan({ guruList, pengajuanList, siswaNama, siswaId }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const res = await fetch("/api/pengajuan/submit", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Pengajuan terkirim!");
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Hapus pengajuan?")) return;
    const formData = new FormData();
    formData.append("id", id);
    await fetch("/api/pengajuan/delete", { method: "POST", body: formData });
    window.location.reload();
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* ... form sama seperti sebelumnya ... */}

      <table className="w-full text-sm border-collapse mt-10">
        <thead className="bg-blue-200">
          <tr>
            
            <th className="border p-2">Kelas</th>
            <th className="border p-2">Guru</th>
            <th className="border p-2">Topik</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pengajuanList.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{siswaNama}</td>
              <td className="border p-2">{p.kelas_siswa}</td>
              <td className="border p-2">{p.nama_guru}</td>
              <td className="border p-2">{p.topik}</td>
              <td className="border p-2">{new Date(p.tanggal).toLocaleDateString("id-ID")}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 text-xs rounded-full
                  ${p.status === 'diterima' ? 'bg-green-100 text-green-800' :
                    p.status === 'ditolak' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {p.status}
                </span>
              </td>
              <td className="border p-2 text-center">
                {p.status === "menunggu" && (
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
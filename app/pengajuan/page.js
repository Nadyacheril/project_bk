"use client";
import { useState, useEffect } from "react";
import FormPengajuan from "./FormPengajuan";
import { useSession } from "next-auth/react";

export default function PengajuanPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [guruList, setGuruList] = useState([]);
  const [pengajuanList, setPengajuanList] = useState([]);

  // Ambil list guru
  useEffect(() => {
    fetch("/api/guru") // pastikan ada route GET guru
      .then((res) => res.json())
      .then((data) => setGuruList(data));
  }, []);

  // Ambil riwayat pengajuan user
  useEffect(() => {
    if (!user) return;
    fetch("/api/pengajuan")
      .then((res) => res.json())
      .then((data) =>
        setPengajuanList(data.filter((p) => p.id_siswa === user.id))
      );
  }, [user]);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error || "Terjadi kesalahan");
      else {
        alert("Pengajuan berhasil!");
        setPengajuanList((prev) => [...prev, { ...formData, status: "Pending" }]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) return <p className="text-center mt-10">Silakan login terlebih dahulu</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Pengajuan</h1>

      <FormPengajuan user={user} guruList={guruList} onSubmit={handleSubmit} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Riwayat Pengajuan</h2>
        {pengajuanList.length === 0 ? (
          <p>Belum ada pengajuan.</p>
        ) : (
          <ul className="space-y-3">
            {pengajuanList.map((p, idx) => (
              <li key={idx} className="border p-4 rounded shadow">
                <p>Guru: {guruList.find((g) => g.id == p.guruId)?.nama || "-"}</p>
                <p>Kelas: {p.kelas_siswa}</p>
                <p>Topik: {p.topik}</p>
                <p>Jam: {p.jam}</p>
                <p>Status: {p.status || "Pending"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

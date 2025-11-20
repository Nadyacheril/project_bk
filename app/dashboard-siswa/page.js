"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function DashboardSiswa() {
  const { user } = useAuth();
  const [pengajuan, setPengajuan] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/pengajuan/user")
      .then(res => res.json())
      .then(data => setPengajuan(data));
  }, [user]);

  if (!user) return <p className="text-center mt-10">Silakan login terlebih dahulu</p>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Siswa</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Riwayat Pengajuan</h2>
        {pengajuan.length === 0 ? (
          <p>Belum ada pengajuan.</p>
        ) : (
          <ul className="space-y-3">
            {pengajuan.map(p => (
              <li key={p.id} className="border p-4 rounded shadow">
                <p>Topik: {p.topik}</p>
                <p>Jam: {p.jam}</p>
                <p>Status: {p.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

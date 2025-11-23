"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/siswa/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profil berhasil diperbarui!");
      } else {
        alert(data.error || "Gagal update profil");
      }
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Silakan login dulu</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-[#5B7DB1] mb-6">Profil Siswa</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          Nama:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            disabled
            className="border px-2 py-1 rounded bg-gray-200"
          />
        </label>

        <label className="flex flex-col">
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border px-2 py-1 rounded"
            rows={4}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#5B7DB1] text-white py-2 rounded mt-2"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </main>
  );
}

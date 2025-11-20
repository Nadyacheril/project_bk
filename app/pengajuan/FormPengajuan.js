"use client";
import { useState } from "react";

export default function FormPengajuan({ user, guruList, onSubmit }) {
  const [kelas, setKelas] = useState("");
  const [topik, setTopik] = useState("");
  const [jam, setJam] = useState("");
  const [guruId, setGuruId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guruId || !kelas || !topik || !jam) {
      alert("Semua field harus diisi");
      return;
    }
    setLoading(true);
    await onSubmit({ guruId, siswaId: user.id, kelas_siswa: kelas, topik, jam });
    setLoading(false);
    setKelas("");
    setTopik("");
    setJam("");
    setGuruId("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Form Pengajuan Konseling</h2>

      <label className="block mb-2">
        Pilih Guru:
        <select
          value={guruId}
          onChange={(e) => setGuruId(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          required
        >
          <option value="">--Pilih Guru--</option>
          {guruList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nama} ({g.mapel})
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Kelas:
        <input
          type="text"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          placeholder="contoh: X-IPA 3"
          required
        />
      </label>

      <label className="block mb-2">
        Topik:
        <select
          value={topik}
          onChange={(e) => setTopik(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          required
        >
          <option value="">--Pilih Topik--</option>
          <option value="Akademik">Akademik</option>
          <option value="Pribadi">Pribadi</option>
          <option value="Karir">Karir</option>
          <option value="Sosial">Sosial</option>
        </select>
      </label>

      <label className="block mb-2">
        Jam:
        <select
          value={jam}
          onChange={(e) => setJam(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          required
        >
          <option value="">--Pilih Jam--</option>
          <option value="08:00-09:00">08:00-09:00</option>
          <option value="09:00-10:00">09:00-10:00</option>
          <option value="10:00-11:00">10:00-11:00</option>
          <option value="13:00-14:00">13:00-14:00</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Mengirim..." : "Kirim Pengajuan"}
      </button>
    </form>
  );
}

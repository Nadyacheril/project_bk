import { query } from "@/lib/database";

export async function POST(req) {
  try {
    const { guruId, siswaId, nama_siswa, kelas_siswa, topik, jam } = await req.json();

    if (!guruId || !siswaId || !nama_siswa) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
    }

    const result = await query(
      "INSERT INTO pengajuan (guru_id, siswa_id, nama_siswa, kelas_siswa, topik, jam) VALUES (?, ?, ?, ?, ?, ?)",
      [guruId, siswaId, nama_siswa, kelas_siswa, topik, jam]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

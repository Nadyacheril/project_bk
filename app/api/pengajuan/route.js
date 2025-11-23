import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function POST(req) {
  try {
    const { guruId, userId, kelas_siswa, topik, jam } = await req.json();

    if (!guruId || !userId || !kelas_siswa || !topik || !jam) {
      return NextResponse.json({ error: "Lengkapi semua field!" }, { status: 400 });
    }

    // API ini pintar → otomatis cari siswaId & nama dari userId
    const [siswa] = await connection.execute(
      "SELECT id, nama FROM siswa WHERE user_id = ?",
      [userId]
    );

    if (siswa.length === 0) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    await connection.execute(
      `INSERT INTO pengajuan (id_guru, id_siswa, nama_siswa, kelas_siswa, topik, jam)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [guruId, siswa[0].id, siswa[0].nama, kelas_siswa, topik, jam]
    );

    return NextResponse.json({ success: true, message: "Pengajuan berhasil!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengirim" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const rows = await db.execute(`
      SELECT p.*, g.nama as nama_guru 
      FROM pengajuan p 
      JOIN siswa s ON p.id_siswa = s.id 
      JOIN guru g ON p.id_guru = g.id 
      WHERE s.user_id = ? 
      ORDER BY p.created_at DESC 
    `, [userId]); //mengambil semua data yg ada di dlm pengajuan dan urutan terbaru 

    return NextResponse.json({ success: true, pengajuan: rows[0] });
  } catch (error) {
    console.error("Error ambil pengajuan:", error);
    return NextResponse.json({ success: false, error: "Gagal ambil data" }, { status: 500 });
  }
}
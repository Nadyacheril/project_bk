import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    // hapus user (CASCADE akan hapus guru/siswa otomatis)
    await query("DELETE FROM users WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}



import { NextResponse } from "next/server";
import connection from "@/lib/database";
import { writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic"; // biar ga di-cache

export async function POST(req) {
  try {
    const { userId } = await req.json();
    console.log("POST /api/siswa/profile → userId:", userId);

    const [rows] = await connection.execute(
      `SELECT s.*, u.nama, u.email 
       FROM siswa s 
       JOIN users u ON s.user_id = u.id 
       WHERE u.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Siswa tidak ditemukan" });
    }

    return NextResponse.json({ success: true, siswa: rows[0] });
  } catch (err) {
    console.error("ERROR DI POST /api/siswa/profile:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const quotes = formData.get("quotes");
    const kelas = formData.get("kelas");
    const fotoFile = formData.get("foto");

    console.log("PUT /api/siswa/profile → userId:", userId);

    let fotoPath = null;
    if (fotoFile && fotoFile.size > 0) {
      const buffer = Buffer.from(await fotoFile.arrayBuffer());
      const filename = `${Date.now()}-${fotoFile.name.replace(/\s/g, "_")}`;
      const filepath = path.join(process.cwd(), "public", "uploads", "foto-siswa", filename);
      await writeFile(filepath, buffer);
      fotoPath = `/uploads/foto-siswa/${filename}`;
    }

    const fields = [];
    const values = [];
    if (quotes !== null) { fields.push("quotes = ?"); values.push(quotes || null); }
    if (kelas !== null) { fields.push("kelas = ?"); values.push(kelas || null); }
    if (fotoPath) { fields.push("foto = ?"); values.push(fotoPath); }

    if (fields.length > 0) {
      values.push(userId);
      const sql = `UPDATE siswa s 
                   JOIN users u ON s.user_id = u.id 
                   SET ${fields.join(", ")} 
                   WHERE u.id = ?`;
      console.log("SQL PUT:", sql, values);
      await connection.execute(sql, values);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ERROR DI PUT /api/siswa/profile:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
// app/api/siswa/upload-foto/route.js
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "bkctb_db",
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("foto");
    const userId = data.get("userId");

    if (!file || !userId) {
      return NextResponse.json({ success: false, error: "File atau userId hilang" });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "File harus gambar!" });
    }

    // AUTO BUAT FOLDER KALAU BELUM ADA
    const uploadDir = path.join(process.cwd(), "public", "siswa");
    await mkdir(uploadDir, { recursive: true }); // ini kuncinya!

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const fotoUrl = `/siswa/${filename}`;

    // Simpan ke database
    await pool.execute("UPDATE siswa SET foto = ? WHERE user_id = ?", [fotoUrl, userId]);

    return NextResponse.json({ success: true, foto: fotoUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Gagal upload foto" });
  }
}
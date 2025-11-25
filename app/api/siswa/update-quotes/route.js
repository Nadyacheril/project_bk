// app/api/siswa/update-quotes/route.js
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "bkctb_db",
});

export async function POST(request) {
  try {
    const { userId, quotes } = await request.json();  // INI BOLEH json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "userId required" });
    }

    await pool.execute("UPDATE siswa SET quotes = ? WHERE user_id = ?", [quotes || null, userId]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Gagal simpan quotes" });
  }
}
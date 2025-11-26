
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
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ success: false, error: "userId required" });

    const [rows] = await pool.execute(
      `SELECT s.id, s.nama, s.kelas, s.foto, s.quotes, u.email 
       FROM siswa s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Siswa tidak ditemukan" });
    }

    return NextResponse.json({ success: true, siswa: rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Database error" });
  }
}
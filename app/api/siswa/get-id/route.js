import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId diperlukan" }, { status: 400 });
    }

    const [rows] = await connection.execute(
      "SELECT id FROM siswa WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ siswaId: null, error: "Siswa tidak ditemukan" });
    }

    return NextResponse.json({ siswaId: rows[0].id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

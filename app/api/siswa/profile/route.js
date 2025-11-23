import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connection from "@/lib/database";

export async function GET(req) {
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // sementara pake localStorage

  if (!user || user.role !== "siswa") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [siswa] = await connection.execute(
      "SELECT * FROM siswa WHERE user_id = ?",
      [user.id]
    );

    if (siswa.length === 0) {
      return NextResponse.json({ error: "Siswa tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ siswa: siswa[0] });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
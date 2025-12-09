import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // untuk hashing password
import { query } from "@/lib/database";

export async function POST(req) { //fungsi untuk menambah guru baru
  const { nama, email, password, nip } = await req.json();

  try {
    const hash = await bcrypt.hash(password, 12); // hash password

   
    const userResult = await query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'guru')",
      [email, hash]
    ); // membbuat user baru dengan role guru, insert ke table guru for login

    const userId = userResult.insertId; // ngambil id ini autoincrement

    // Insert ke guru
    await query(
      "INSERT INTO guru (user_id, nama, nip) VALUES (?, ?, ?)",
      [userId, nama, nip]
    );

    return NextResponse.json({ success: true }); //ini jika berhasil
  } catch (err) {
    return NextResponse.json({ error: err.message }); //ini jika error
  }
}

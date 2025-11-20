import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connection from "../../../lib/database";

import { registerSchema } from "@/lib/zodSchemas";

export async function POST(req) {
  try {
    const { username, email, password, } = await req.json();

    // VALIDASI ZOD
    const parsed = registerSchema.safeParse({ username, email, password });
    if (!parsed.success) {
      console.log(parsed.error.issues)
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // CEK EMAIL SUDAH ADA
    const [existing] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER ROLE = siswa
    const [result] = await connection.execute(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'siswa')",
      [email, hashedPassword]
    );

    // TAMBAH KE TABEL SISWA
    await connection.execute(
      "INSERT INTO siswa (user_id, nama) VALUES (?, ?)",
      [result.insertId, username]
    );

    return NextResponse.json({ message: "Register berhasil" }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
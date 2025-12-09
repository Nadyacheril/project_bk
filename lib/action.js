
"use server";

import { redirect } from "next/navigation";
import connection from "./database";
import bcrypt from "bcryptjs";

/**
 * Simpan user baru (siswa/guru/admin)
 * @param {FormData} formData 
 * @param {string} role 'siswa' | 'guru' | 'admin'
 */
export async function storeUser(formData, role = "siswa") {
  const username = formData.get("username"); // atau nama
  const email = formData.get("email");
  const password = bcrypt.hashSync(formData.get("password"), 12); // hash bcrypt
  const nip = formData.get("nip"); // optional, khusus guru

  // 1️ Simpan ke users
  const [result] = await connection.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, password, role]
  );

  // 2️kalau role = guru, masukkan juga ke tabel guru
  if (role === "guru") {
    const userId = result.insertId;
    await connection.execute(
      "INSERT INTO guru (user_id, nama, nip) VALUES (?, ?, ?)",
      [userId, username, nip]
    );
  }

  redirect("/login");
}

/**
 * Ambil user by email
 */
export async function getUserByEmail(email) {
  const [rows] = await connection.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
}

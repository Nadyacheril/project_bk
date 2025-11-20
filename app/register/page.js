
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";

const registerSchema = z.object({
  nama: z.string().min(2, "Nama harus minimal 2 karakter."),
  email: z.string().email("Format email tidak valid."),
  password: z.string().min(6, "Password minimal 6 karakter."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan konfirmasi tidak cocok.",
  path: ["confirmPassword"]
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      nama: e.target.nama.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };

    const validation = registerSchema.safeParse(formData);
    
    if (!validation.success) {
      alert(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    // Lolos validasi, lanjut register
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.nama,
        email: formData.email,
        password: formData.password
      }),
    });

    const data = await res.json();
    console.log(data)
    setLoading(false);

    if (res.ok) {
      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    } else {
      alert(data.message || "Terjadi kesalahan saat registrasi.");
    }
  }

  return (
    <main className="relative min-h-screen bg-white flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8EAAD6] rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8EAAD6] rounded-full -translate-x-1/3 translate-y-1/3"></div>

      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Image src="/logo.jpg" alt="Logo BKcTB" width={50} height={50} />
        <h1 className="text-[#5B7DB1] font-bold text-lg">BKcTB</h1>
      </div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-[#5B7DB1] text-2xl font-bold mb-8">Register Siswa</h2>

        <input type="text" name="nama" placeholder="Nama Lengkap" required className="w-full mb-5 px-4 py-3 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#5B7DB1]" />
        <input type="email" name="email" placeholder="Email" required className="w-full mb-5 px-4 py-3 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#5B7DB1]" />
        <input type="password" name="password" placeholder="Password" required className="w-full mb-5 px-4 py-3 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#5B7DB1]" />
        <input type="password" name="confirmPassword" placeholder="Konfirmasi Password" required className="w-full mb-6 px-4 py-3 rounded-md bg-gray-200 focus:ring-2 focus:ring-[#5B7DB1]" />

        <button type="submit" disabled={loading} className="w-full bg-[#5B7DB1] text-white font-semibold py-3 rounded-md hover:bg-[#4A6995] transition">
          {loading ? "Mendaftarkan..." : "Register"}
        </button>

        <p className="text-sm mt-5 text-[#2C3E50]">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#5B7DB1] font-semibold hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </main>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value;

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      alert(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      alert("Email atau password salah!");
      setLoading(false);
      return;
    }

    // LANGSUNG fetch session-role setelah login
    try {
      const res = await fetch("/api/session-role?t=" + Date.now());
      const data = await res.json();

      if (!data.role || data.role === "unknown") {
        alert("Role tidak terbaca!");
        setLoading(false);
        return;
      }
 
      // Redirect sesuai role
      if (data.role === "admin") router.push("/admin/dashboard");
      else if (data.role === "guru") router.push("/guru/dashboard");
      else if (data.role === "siswa") router.push("/pengajuan");
      else alert("Role tidak dikenali!");

    } catch (err) {
      alert("Gagal membaca role!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8EAAD6] rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8EAAD6] rounded-full -translate-x-1/3 translate-y-1/3"></div>

      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Image src="/logo.jpg" alt="BKcTB" width={50} height={50} className="rounded" />
        <h1 className="text-[#5B7DB1] font-bold text-lg">BKcTB</h1>
      </div>

      <form onSubmit={handleLogin} className="relative z-10 bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-[#5B7DB1] text-2xl font-bold mb-8">Login</h2>

        <input type="email" name="email" placeholder="Email" required disabled={loading}
          className="w-full mb-5 px-4 py-3 rounded-md bg-gray-200" />
        <input type="password" name="password" placeholder="Password" required disabled={loading}
          className="w-full mb-6 px-4 py-3 rounded-md bg-gray-200" />

        <button type="submit" disabled={loading} className="w-full bg-[#5B7DB1] text-white font-semibold py-3 rounded-md">
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-sm mt-5 text-[#2C3E50]">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#5B7DB1] font-semibold hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </main>
  );
}

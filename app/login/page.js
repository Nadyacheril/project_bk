

"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

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

    try {
      // Panggil API login
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Email atau password salah!");
        setLoading(false);
        return;
      }

      // Simpan user di localStorage supaya HomePage bisa langsung akses
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect sesuai role
      if (data.user.role === "admin") router.push("/admin");
      else if (data.user.role === "guru") router.push("/guru/pengajuan");
      else if (data.user.role === "siswa") router.push("/home");
      else alert("Role tidak dikenali!");

    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-white flex flex-col justify-center items-center overflow-hidden">
      {/* background bulat */}
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8EAAD6] rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8EAAD6] rounded-full -translate-x-1/3 translate-y-1/3"></div>

      
<Link 
  href="/" 
  className="absolute top-6 left-6 flex items-center gap-3 group transition-all duration-300"
>
  <div className="relative">
    <Image 
      src="/logo.jpg" 
      alt="BKcTB" 
      width={50} 
      height={50} 
      className="rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl"
    />
    {/* Efek glow kecil saat hover (opsional, tambah vibe premium) */}
    <div className="absolute inset-0 rounded-lg bg-[#5B7DB1] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
  </div>

  <h1 className="text-[#5B7DB1] font-bold text-2xl tracking-tight opacity-90 group-hover:opacity-100 transition-all duration-300">
    BKcTB
  </h1>
</Link>
   
    
      {/* form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-[#5B7DB1] text-2xl font-bold mb-8">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={loading}
          className="w-full mb-5 px-4 py-3 rounded-md bg-gray-200"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={loading}
          className="w-full mb-6 px-4 py-3 rounded-md bg-gray-200"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5B7DB1] text-white font-semibold py-3 rounded-md"
        >
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

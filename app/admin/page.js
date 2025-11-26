"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    nip: "",
  });

  const [msg, setMsg] = useState("");

  async function loadUsers() {
    const res = await fetch("/api/admin/get-users");
    const data = await res.json();
    setUsers(data.users);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/admin/create-guru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Guru berhasil ditambahkan!");
      setForm({ nama: "", email: "", password: "", nip: "" });
      loadUsers();
    } else {
      setMsg("Gagal: " + data.error);
    }
  }

  async function deleteUser(id) {
    if (!confirm("Yakin mau hapus akun ini?")) return;

    const res = await fetch("/api/admin/delete-user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.success) {
      loadUsers();
    }
  }

  // Logout function (bisa diarahkan ke login atau hapus session)
  const handleLogout = () => {
    // Ganti sesuai cara logout kamu (misal: localStorage, cookies, dll)
    if (confirm("Yakin ingin logout?")) {
      window.location.href = "/login"; // atau "/api/auth/logout"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
     <nav className="bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    {/* Judul dengan underline animasi saat hover */}
    <h1 className="text-3xl font-bold tracking-wide relative group cursor-pointer">
      BKcTB - Dashboard Admin
      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
    </h1>

    {/* Tombol Logout dengan Icon yang estetik */}
      <button onClick={() => confirm("Yakin logout?") && (localStorage.removeItem("user"), window.location.href = "/login")}
              className="flex items-center gap-2 bg-white text-[#5B7DB1] px-6 py-3 rounded-full font-bold hover:scale-105 transition">
              <LogOut size={18} /> Logout
            </button>
  </div>
</nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
        {/* Selamat Datang */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Selamat Datang, <span className="text-[#5B7DB1]">Admin</span> 
          </h2>
          <p className="text-gray-600 mt-2">Mari kelola website ini dengan baikk.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM TAMBAH GURU */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Tambah Guru Baru</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Nama Guru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7DB1] focus:border-transparent transition"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Guru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7DB1] focus:border-transparent transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password Guru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7DB1] focus:border-transparent transition"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="NIP Guru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7DB1] focus:border-transparent transition"
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  required
                />

                <button className="w-full bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] transition">
                  Tambah Guru
                </button>
              </form>

              {msg && (
                <div className={`mt-5 p-4 rounded-lg text-center font-medium ${msg.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {msg}
                </div>
              )}
            </div>
          </div>

          {/* TABEL USER */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white px-8 py-5">
                <h3 className="text-2xl font-bold">Daftar Semua User</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700 font-semibold">
                      <th className="px-6 py-4 text-left">ID</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Role</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-500">
                          Belum ada user terdaftar
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">{u.id}</td>
                          <td className="px-6 py-4 font-medium">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-6 mt-auto">
        <div className="text-center">
          <p className="font-medium">© 2025 BKcTB | SMK Taruna Bhakti</p>
          
        </div>
      </footer>
    </div>
  );
}
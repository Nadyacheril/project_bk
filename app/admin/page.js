"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    nip: "",
  });

  const [msg, setMsg] = useState("");

  // Ambil semua user
  async function loadUsers() {
    const res = await fetch("/api/admin/get-users");
    const data = await res.json();
    setUsers(data.users);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // Tambah guru
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

  // Hapus user
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

  return (
    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-bold">Dashboard Admin</h1>

      {/* FORM TAMBAH GURU */}
      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tambah Guru Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Nama Guru"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Email Guru"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Password Guru"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="NIP Guru"
            value={form.nip}
            onChange={(e) => setForm({ ...form, nip: e.target.value })}
          />

          <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
            Tambah Guru
          </button>
        </form>

        {msg && <p className="mt-3 text-green-600">{msg}</p>}
      </div>

      {/* TABEL USERS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Semua User</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteUser(u.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

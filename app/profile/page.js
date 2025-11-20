"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");

  const handleSave = () => {
    alert("Fitur edit profil sementara belum terhubung backend");
  };

  if (!user) return <p className="text-center mt-10">Silakan login terlebih dahulu</p>;

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex flex-col gap-4">
        <img src={user.avatar || "/logo.jpg"} alt="avatar" className="w-32 h-32 rounded-full mx-auto" />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="bg-[#5B7DB1] text-white py-2 rounded hover:bg-[#4A6995]"
        >
          Simpan
        </button>
      </div>
    </main>
  );
}

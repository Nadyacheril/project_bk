

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Bell, LogOut, Camera, X, Save } from "lucide-react";

// export default function ProfileSiswa() {
//   const [userData, setUserData] = useState(null);
//   const [siswaData, setSiswaData] = useState(null);
//   const [fotoPreview, setFotoPreview] = useState("/default-avatar.png");
//   const [quotes, setQuotes] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   // Ambil data user + data siswa dari DB
//   useEffect(() => {
//     const loadProfile = async () => {
//       const stored = localStorage.getItem("user");
//       if (!stored) {
//         window.location.href = "/login";
//         return;
//       }
//       const user = JSON.parse(stored);
//       setUserData(user);

//       // Ambil data lengkap siswa dari API
//       try {
//         const res = await fetch("/api/siswa/profile", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user.id }),
//         });
//         const data = await res.json();
//         if (data.siswa) {
//           setSiswaData(data.siswa);
//           setFotoPreview(data.siswa.foto || "/default-avatar.png");
//           setQuotes(data.siswa.quotes || "");
//         }
//       } catch (err) {
//         console.error("Gagal ambil profil siswa");
//       }
//     };
//     loadProfile();
//   }, []);

//   // Upload foto baru
//   const handleFotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("foto", file);
//     formData.append("userId", userData.id);

//     try {
//       const res = await fetch("/api/siswa/upload-foto", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await res.json();

//       if (result.success) {
//         setFotoPreview(result.foto);
//         setSiswaData({ ...siswaData, foto: result.foto });
//         alert("Foto profil berhasil diperbarui!");
//       } else {
//         alert("Gagal upload foto: " + result.error);
//       }
//     } catch (err) {
//       alert("Error upload foto");
//     }
//     setLoading(false);
//   };

//   // Simpan quotes baru
//   const handleSaveQuotes = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/siswa/update-quotes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userData.id,
//           quotes: quotes.trim() || null,
//         }),
//       });
//       const result = await res.json();

//       if (result.success) {
//         setSiswaData({ ...siswaData, quotes });
//         setIsEditing(false);
//         alert("Quotes berhasil diperbarui!");
//       } else {
//         alert("Gagal simpan quotes");
//       }
//     } catch (err) {
//       alert("Error saat menyimpan");
//     }
//     setLoading(false);
//   };

//   if (!userData || !siswaData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-2xl text-gray-600">
//         Loading Profil...
//       </div>
//     );
//   }

//   const namaTampil = siswaData.nama || userData.email?.split("@")[0];

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* NAVBAR */}
//       <nav className="bg-[#5B7DB1] text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center rounded-b-3xl">
//           <h1 className="text-2xl font-bold tracking-wider">BKcTB - Profil</h1>
//           <div className="flex items-center gap-4">
//             <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
//               <Bell size={22} />
//             </button>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("user");
//                 window.location.href = "/login";
//               }}
//               className="flex items-center gap-2 bg-white text-[#5B7DB1] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition hover:scale-105"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* CARD PROFIL - LEBIH BESAR & CANTIK */}
//       <main className="flex-1 flex items-center justify-center px-6 py-10">
//         <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
//           {/* Header Biru */}
//           <div className="bg-gradient-to-br from-[#5B7DB1] to-[#3A5D8A] h-40 relative">
//             <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
//               <div className="relative">
//                 <div className="w-40 h-40 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-gray-200">
//                   <Image
//                     src={fotoPreview}
//                     alt="Foto Profil"
//                     width={160}
//                     height={160}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={loading}
//                   className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-xl hover:scale-110 transition disabled:opacity-70"
//                 >
//                   <Camera size={22} className="text-[#5B7DB1]" />
//                 </button>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFotoChange}
//                   className="hidden"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Info Profil */}
//           <div className="pt-24 pb-10 px-8 text-center">
//             <h2 className="text-3xl font-bold text-[#2C3E50]">{namaTampil}</h2>
//             <p className="text-gray-600 mt-2">{userData.email}</p>
//             <p className="text-lg text-gray-500 mt-1">Kelas {siswaData.kelas || "-"}</p>

//             {/* Quotes */}
//             <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
//               <p className="text-gray-700 italic text-lg leading-relaxed text-center">
//                 "{quotes || "Belum ada quotes favorit"}"
//               </p>
//             </div>

//             {/* Tombol Edit */}
//             <button
//               onClick={() => setIsEditing(true)}
//               className="mt-10 w-full bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
//             >
//               Edit Profil
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* MODAL EDIT QUOTES */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-[#5B7DB1]">Edit Quotes Favorit</h3>
//               <button onClick={() => setIsEditing(false)}>
//                 <X size={28} className="text-gray-500 hover:text-gray-800" />
//               </button>
//             </div>

//             <textarea
//               value={quotes}
//               onChange={(e) => setQuotes(e.target.value)}
//               placeholder="Tulis quotes favoritmu di sini..."
//               rows="6"
//               className="w-full p-5 border-2 border-gray-300 rounded-xl focus:border-[#5B7DB1] focus:outline-none resize-none text-gray-700"
//             />

//             <div className="flex gap-4 mt-8">
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-300 transition"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleSaveQuotes}
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-[#5B7DB1] to-[#3A5D8A] text-white py-4 rounded-xl font-bold hover:shadow-xl transition disabled:opacity-70 flex items-center justify-center gap-2"
//               >
//                 <Save size={20} />
//                 {loading ? "Menyimpan..." : "Simpan"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* FOOTER */}
//       <footer className="bg-[#5B7DB1] text-white py-8 mt-auto">
//         <div className="text-center">
//           <p className="text-lg font-semibold">© 2025 BKcTB | SMK Taruna Bhakti</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "bkctb_db",
});

export async function POST(request) {
  try {
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ success: false, error: "userId required" });

    const [rows] = await pool.execute(
      `SELECT s.id, s.nama, s.kelas, s.foto, s.quotes, u.email 
       FROM siswa s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Siswa tidak ditemukan" });
    }

    return NextResponse.json({ success: true, siswa: rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Database error" });
  }
}
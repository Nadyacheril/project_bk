

// "use client";
// import { useEffect, useState } from "react";

// export default function DashboardGuru() {
//   const [userData, setUserData] = useState(null);
//   const [pengajuan, setPengajuan] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return (window.location.href = "/login");
//     setUserData(JSON.parse(storedUser));
//   }, []);

//   const fetchPengajuan = async () => {
//     if (!userData) return;
//     const res = await fetch(`/api/guru/pengajuan?guruId=${userData.id}`);
//     const data = await res.json();
//     if (data.success) setPengajuan(data.data);
//   };

  
  
//   useEffect(() => {
//     fetchPengajuan();
//     const interval = setInterval(fetchPengajuan, 10000); // refresh tiap 10 detik
//     return () => clearInterval(interval);
//   }, [userData]);

//   const handleUpdateStatus = async (id, status) => {
//     const alasan = status === "Ditolak" ? prompt("Alasan penolakan:") : null;
//     if (status === "Ditolak" && !alasan) return;

//     setLoading(true);
//     await fetch(`/api/pengajuan/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status, alasan }),
//     });
//     fetchPengajuan();
//     setLoading(false);
//   };

//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length;

//   if (!userData) return <p>Loading...</p>;

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           <button className="relative bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold">
//             Notifikasi
//             {notifCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>
//           <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold">
//             Logout
//           </button>
//         </div>
//       </nav>

//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>

//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map((item) => (
//             <div key={item.id} className={`p-5 rounded-xl border ${item.notif_dibaca == 0 && item.status === "Pending" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {item.jam}</p>
//                   <p>Status: <span className={`font-bold ${item.status === "Pending" ? "text-orange-600" : item.status === "Disetujui" ? "text-green-600" : "text-red-600"}`}>{item.status}</span></p>
//                   {item.alasan && <p className="text-red-600 mt-2"><b>Alasan:</b> {item.alasan}</p>}
//                 </div>
//                 {item.status === "Pending" && (
//                   <div className="flex gap-2">
//                     <button onClick={() => handleUpdateStatus(item.id, "Disetujui")}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
//                       Setujui
//                     </button>
//                     <button onClick={() => handleUpdateStatus(item.id, "Ditolak")}
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
//                       Tolak
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// export default function DashboardGuru() {
//   const [userData, setUserData] = useState(null);
//   const [pengajuan, setPengajuan] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return (window.location.href = "/login");
//     setUserData(JSON.parse(storedUser));
//   }, []);

//   const fetchPengajuan = async () => {
//     if (!userData) return;
//     try {
//       const res = await fetch(`/api/guru/pengajuan?guruId=${userData.id}`);
//       const data = await res.json();
//       if (data.success) setPengajuan(data.data);
//     } catch (err) {
//       console.error("Gagal fetch pengajuan:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPengajuan();
//     const interval = setInterval(fetchPengajuan, 10000); // refresh tiap 10 detik
//     return () => clearInterval(interval);
//   }, [userData]);

//   const handleUpdateStatus = async (id) => {
//     setLoading(true);
//     await fetch(`/api/pengajuan/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status: "Disetujui" }),
//     });
//     fetchPengajuan();
//     setLoading(false);
//   };

//   const handleNotifRead = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length;

//   if (!userData) return <p>Loading...</p>;

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           <button
//             className="relative bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold"
//             onClick={() => setShowNotif(true)}
//           >
//             Notifikasi
//             {notifCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>
//           <button
//             onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>

//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map((item) => (
//             <div key={item.id} className={`p-5 rounded-xl border ${item.notif_dibaca == 0 && item.status === "Pending" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {item.jam}</p>
//                   <p>Status: <span className={`font-bold ${item.status === "Pending" ? "text-orange-600" : item.status === "Disetujui" ? "text-green-600" : "text-red-600"}`}>{item.status}</span></p>
//                   {item.alasan && <p className="text-red-600 mt-2"><b>Alasan:</b> {item.alasan}</p>}
//                 </div>
//                 {item.status === "Pending" && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleUpdateStatus(item.id)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                       disabled={loading}
//                     >
//                       Setujui
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal Notifikasi */}
//       {showNotif && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowNotif(false)} className="absolute top-3 right-3">X</button>
//             <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>
//             {pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length === 0
//               ? <p className="text-gray-500">Tidak ada pengajuan baru.</p>
//               : pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").map(p => (
//                   <div key={p.id} className="border p-3 rounded mb-2 bg-blue-50">
//                     <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
//                     <p>Kelas: {p.kelas_siswa} | Topik: {p.topik} | Waktu: {p.jam}</p>
//                     <button
//                       onClick={() => handleNotifRead(p.id)}
//                       className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
//                     >
//                       Tandai sudah dibaca
//                     </button>
//                   </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import DashboardGuru from "@/component/DashboardGuru";

export default function Page() {
  return <DashboardGuru />;
}

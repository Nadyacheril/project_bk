// "use client";
// import { useEffect, useState } from "react";

// export default function DashboardGuru() {
//   const [userData, setUserData] = useState(null);
//   const [pengajuan, setPengajuan] = useState([]);
//   const [loadingIds, setLoadingIds] = useState({});
//   const [showNotif, setShowNotif] = useState(false);

//   // Ambil userData dari localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return (window.location.href = "/login");
//     setUserData(JSON.parse(storedUser));
//   }, []);

//   // Fetch pengajuan
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

//   // Auto refresh
//   useEffect(() => {
//     if (!userData) return;
//     fetchPengajuan();
//     const interval = setInterval(fetchPengajuan, 10000);
//     return () => clearInterval(interval);
//   }, [userData]);

//   // Setujui pengajuan
//   const handleUpdateStatus = async (id) => {
//     setLoadingIds((prev) => ({ ...prev, [id]: true }));
//     await fetch(`/api/pengajuan/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status: "Disetujui" }),
//     });
//     fetchPengajuan();
//     setLoadingIds((prev) => ({ ...prev, [id]: false }));
//   };

//   // Tandai notif sudah dibaca
//   const handleNotifRead = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   // Hitung notif baru
//   const notifCount = pengajuan.filter(
//     (p) => p.notif_dibaca === 0 && p.status === "Pending"
//   ).length;

//   if (!userData) return <p>Loading...</p>;

//   // Ambil nama guru dari email
//   const guruName = userData.nama || userData.email.split("@")[0];

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       {/* Navbar */}
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

//       {/* Selamat datang */}
//       <h2 className="text-2xl font-semibold text-blue-600 mb-1">
//         Selamat datang, {guruName}!
//       </h2>
//       <p className="text-gray-700 mb-6">Dashboard pengajuan siswa</p>

//       {/* Pengajuan */}
//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map((item) => (
//             <div
//               key={item.id}
//               className={`p-5 rounded-xl border ${
//                 item.notif_dibaca === 0 && item.status === "Pending"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {item.jam}</p>
//                   <p>
//                     Status:{" "}
//                     <span
//                       className={`font-bold ${
//                         item.status === "Pending"
//                           ? "text-orange-600"
//                           : item.status === "Disetujui"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </p>
//                   {item.alasan && (
//                     <p className="text-red-600 mt-2">
//                       <b>Alasan:</b> {item.alasan}
//                     </p>
//                   )}
//                 </div>
//                 {item.status === "Pending" && (
//                   <button
//                     onClick={() => handleUpdateStatus(item.id)}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                     disabled={loadingIds[item.id]}
//                   >
//                     {loadingIds[item.id] ? "Mengirim..." : "Setujui"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal Notifikasi */}
//       {showNotif && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[70vh] overflow-y-auto">
//             <button
//               onClick={() => setShowNotif(false)}
//               className="absolute top-3 right-3 font-bold text-lg"
//             >
//               X
//             </button>
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

// "use client";
// import { useEffect, useState } from "react";
// import { Bell, X } from "lucide-react";

// export default function DashboardGuru() {
//   const [userData, setUserData] = useState(null);
//   const [pengajuan, setPengajuan] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   // Ambil data user dari localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return (window.location.href = "/login");
//     setUserData(JSON.parse(storedUser));
//   }, []);

//   // Fetch pengajuan
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
//     const interval = setInterval(fetchPengajuan, 10000);
//     return () => clearInterval(interval);
//   }, [userData]);

//   // Setujui pengajuan
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

//   // Tandai notif sudah dibaca
//   const handleNotifRead = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   // Hapus notif
//   const handleNotifDelete = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length;

//   if (!userData) return <p>Loading...</p>;

//   const guruNama = userData.email?.split("@")[0]; // ambil nama dari email

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       {/* Navbar */}
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           {/* Notifikasi */}
//           <button
//             className="relative p-2 rounded-full hover:bg-white/20 transition"
//             onClick={() => setShowNotif(true)}
//             title="Notifikasi"
//           >
//             <Bell size={24} />
//             {notifCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>

//           {/* Logout */}
//           <button
//             onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Selamat datang */}
//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold text-blue-600">Selamat datang,</h2>
//         <p className="text-3xl font-bold mt-2">{guruNama}</p>
//       </section>

//       {/* Daftar Pengajuan */}
//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>
//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map(item => (
//             <div
//               key={item.id}
//               className={`p-5 rounded-xl border ${
//                 item.notif_dibaca === 0 && item.status === "Pending"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {item.jam}</p>
//                   <p>Tanggal: {item.tanggal}</p>
//                   <p>
//                     Status:{" "}
//                     <span
//                       className={`font-bold ${
//                         item.status === "Pending"
//                           ? "text-orange-600"
//                           : item.status === "Disetujui"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </p>
//                   {item.alasan && (
//                     <p className="text-red-600 mt-2">
//                       <b>Alasan:</b> {item.alasan}
//                     </p>
//                   )}
//                 </div>

//                 {/* Tombol Setujui hanya jika Pending */}
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
//             <button
//               onClick={() => setShowNotif(false)}
//               className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition"
//             >
//               <X size={20} />
//             </button>
//             <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>
//             {pengajuan.filter(p => p.status === "Pending").length === 0 ? (
//               <p className="text-gray-500">Tidak ada pengajuan baru.</p>
//             ) : (
//               pengajuan
//                 .filter(p => p.status === "Pending")
//                 .map(p => (
//                   <div key={p.id} className="border p-3 rounded mb-2 bg-blue-50 flex justify-between items-center">
//                     <div>
//                       <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
//                       <p>Kelas: {p.kelas_siswa} | Topik: {p.topik} | Waktu: {p.jam} | Tanggal: {p.tanggal}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleNotifRead(p.id)}
//                         className="bg-green-600 text-white px-3 py-1 rounded"
//                       >
//                         Sudah dibaca
//                       </button>
//                       <button
//                         onClick={() => handleNotifDelete(p.id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         X
//                       </button>
//                     </div>
//                   </div>
//                 ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import { Bell, X } from "lucide-react";

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
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPengajuan();
//     const interval = setInterval(fetchPengajuan, 10000);
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

//   const handleNotifDelete = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length;

//   if (!userData) return <p>Loading...</p>;

//   const guruNama = userData.email?.split("@")[0];

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       {/* Navbar */}
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           <button
//             className="relative p-2 rounded-full hover:bg-white/20 transition"
//             onClick={() => setShowNotif(true)}
//           >
//             <Bell size={24} />
//             {notifCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>
//           <button
//             onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Selamat datang */}
//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold text-blue-600">Selamat datang,</h2>
//         <p className="text-3xl font-bold mt-2">{guruNama}</p>
//       </section>

//       {/* Daftar Pengajuan */}
//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>
//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map(item => (
//             <div key={item.id} className={`p-5 rounded-xl border ${item.status === "Pending" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {item.jam}</p>
//                   <p>
//                     Tanggal: {new Date(item.tanggal).toLocaleDateString("id-ID", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
//                   </p>
//                   <p>Status: <span className={`font-bold ${item.status === "Pending" ? "text-orange-600" : item.status === "Disetujui" ? "text-green-600" : "text-red-600"}`}>{item.status}</span></p>
//                   {item.alasan && <p className="text-red-600 mt-2"><b>Alasan:</b> {item.alasan}</p>}
//                 </div>
//                 {item.status === "Pending" && (
//                   <button onClick={() => handleUpdateStatus(item.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" disabled={loading}>
//                     Setujui
//                   </button>
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
//             <button onClick={() => setShowNotif(false)} className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition">
//               <X size={20} />
//             </button>
//             <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>
//             {pengajuan.filter(p => p.status === "Pending").length === 0 ? (
//               <p className="text-gray-500">Tidak ada pengajuan baru.</p>
//             ) : (
//               pengajuan.filter(p => p.status === "Pending").map(p => (
//                 <div key={p.id} className="border p-3 rounded mb-2 bg-blue-50 flex justify-between items-center">
//                   <div>
//                     <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
//                     <p>Kelas: {p.kelas_siswa} | Topik: {p.topik} | Waktu: {p.jam}</p>
//                     <p>Tanggal: {new Date(p.tanggal).toLocaleDateString("id-ID", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleNotifRead(p.id)} className="bg-green-600 text-white px-3 py-1 rounded">Sudah dibaca</button>
//                     <button onClick={() => handleNotifDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">Hapus</button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import { Bell, X } from "lucide-react";

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
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPengajuan();
//     const interval = setInterval(fetchPengajuan, 10000);
//     return () => clearInterval(interval);
//   }, [userData]);

//   const handleUpdateStatus = async (id, status) => {
//     setLoading(true);
//     await fetch(`/api/pengajuan/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
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

//   const handleNotifDelete = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   if (!userData) return <p>Loading...</p>;

//   const guruNama = userData.email?.split("@")[0];
//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Menunggu").length;

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       {/* Navbar */}
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           <button
//             className="relative p-2 rounded-full hover:bg-white/20 transition"
//             onClick={() => setShowNotif(true)}
//             title="Notifikasi"
//           >
//             <Bell size={24} />
//             {notifCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>

//           <button
//             onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold text-blue-600">Selamat datang,</h2>
//         <p className="text-3xl font-bold mt-2">{guruNama}</p>
//       </section>

//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>

//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map(item => (
//             <div
//               key={item.id}
//               className={`p-5 rounded-xl border ${item.status === "Menunggu" && item.notif_dibaca === 0 ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {new Date(item.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
//                   <p>Status: <span className={`font-bold ${item.status === "Menunggu" ? "text-orange-600" : item.status === "Disetujui" ? "text-green-600" : "text-red-600"}`}>{item.status}</span></p>
//                   {item.alasan && <p className="text-red-600 mt-2"><b>Alasan:</b> {item.alasan}</p>}
//                 </div>
//                 {item.status === "Menunggu" && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleUpdateStatus(item.id, "Disetujui")}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                       disabled={loading}
//                     >
//                       Setujui
//                     </button>
//                     <button
//                       onClick={() => handleUpdateStatus(item.id, "Ditolak")}
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                       disabled={loading}
//                     >
//                       Tolak
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showNotif && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowNotif(false)} className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition">
//               <X size={20} />
//             </button>
//             <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>
//             {pengajuan.filter(p => p.status === "Menunggu").length === 0 ? (
//               <p className="text-gray-500">Tidak ada pengajuan baru.</p>
//             ) : (
//               pengajuan.filter(p => p.status === "Menunggu").map(p => (
//                 <div key={p.id} className="border p-3 rounded mb-2 bg-blue-50 flex justify-between items-center">
//                   <div>
//                     <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
//                     <p>Kelas: {p.kelas_siswa} | Topik: {p.topik}</p>
//                     <p>Waktu: {new Date(p.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleNotifRead(p.id)} className="bg-green-600 text-white px-3 py-1 rounded">Sudah dibaca</button>
//                     <button onClick={() => handleNotifDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">Hapus</button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import { Bell, X } from "lucide-react";

// export default function DashboardGuru() {
//   const [userData, setUserData] = useState(null);
//   const [pengajuan, setPengajuan] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   // Ambil data user dari localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return (window.location.href = "/login");
//     setUserData(JSON.parse(storedUser));
//   }, []);

//   // Fetch pengajuan
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

//   // Setujui pengajuan
//   const handleUpdateStatus = async (id) => {
//     setLoading(true);
//     await fetch(`/api/pengajuan/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status: "Menunggu" }), // ganti Pending → Menunggu
//     });
//     fetchPengajuan();
//     setLoading(false);
//   };

//   // Tandai notif sudah dibaca
//   const handleNotifRead = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   // Hapus notif
//   const handleNotifDelete = async (id) => {
//     await fetch("/api/pengajuan/notif", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchPengajuan();
//   };

//   const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Pending").length;

//   if (!userData) return <p>Loading...</p>;

//   const guruNama = userData.email?.split("@")[0]; // ambil nama dari email

//   // format tanggal rapi
//   const formatTanggal = (tgl) => {
//     const date = new Date(tgl);
//     return date.toLocaleString("id-ID", {
//       day: "2-digit", month: "short", year: "numeric",
//       hour: "2-digit", minute: "2-digit"
//     });
//   };

//   return (
//     <main className="min-h-screen bg-white text-[#2C3E50] p-6">
//       {/* Navbar */}
//       <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
//         <div className="flex items-center gap-4">
//           {/* Notifikasi */}
//           <button
//             className="relative p-2 rounded-full hover:bg-white/20 transition"
//             onClick={() => setShowNotif(true)}
//             title="Notifikasi"
//           >
//             <Bell size={24} />
//             {notifCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                 {notifCount}
//               </span>
//             )}
//           </button>

//           {/* Logout */}
//           <button
//             onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
//             className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Selamat datang */}
//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold text-blue-600">Selamat datang,</h2>
//         <p className="text-3xl font-bold mt-2">{guruNama}</p>
//       </section>

//       {/* Daftar Pengajuan */}
//       <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>
//       {pengajuan.length === 0 ? (
//         <p className="text-gray-500">Belum ada pengajuan.</p>
//       ) : (
//         <div className="space-y-4">
//           {pengajuan.map(item => (
//             <div
//               key={item.id}
//               className={`p-5 rounded-xl border ${
//                 item.status === "Pending" || item.status === "Menunggu"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-lg">{item.nama_siswa}</p>
//                   <p>Kelas: {item.kelas_siswa}</p>
//                   <p>Topik: {item.topik}</p>
//                   <p>Waktu: {formatTanggal(item.created_at)}</p>
//                   <p>
//                     Status:{" "}
//                     <span
//                       className={`font-bold ${
//                         item.status === "Menunggu"
//                           ? "text-orange-600"
//                           : item.status === "Disetujui"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </p>
//                   {item.alasan && (
//                     <p className="text-red-600 mt-2">
//                       <b>Alasan:</b> {item.alasan}
//                     </p>
//                   )}
//                 </div>

//                 {/* Tombol Setujui hanya jika Menunggu */}
//                 {item.status === "Menunggu" && (
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
//             <button
//               onClick={() => setShowNotif(false)}
//               className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition"
//             >
//               <X size={20} />
//             </button>
//             <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>

//             {pengajuan.length === 0 ? (
//               <p className="text-gray-500">Belum ada pengajuan.</p>
//             ) : (
//               pengajuan.map(p => (
//                 <div
//                   key={p.id}
//                   className={`border p-3 rounded mb-2 flex justify-between items-center ${
//                     p.notif_dibaca === 0 ? "bg-blue-50" : "bg-gray-100"
//                   }`}
//                 >
//                   <div>
//                     <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
//                     <p>Kelas: {p.kelas_siswa} | Topik: {p.topik} | Waktu: {formatTanggal(p.created_at)}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleNotifRead(p.id)}
//                       disabled={p.notif_dibaca === 1}
//                       className={`px-3 py-1 rounded ${
//                         p.notif_dibaca === 1
//                           ? "bg-gray-400 text-white cursor-not-allowed"
//                           : "bg-green-600 text-white hover:bg-green-700"
//                       }`}
//                     >
//                       Sudah dibaca
//                     </button>
//                     <button
//                       onClick={() => handleNotifDelete(p.id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

export default function DashboardGuru() {
  const [userData, setUserData] = useState(null);
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  // Ambil data user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return (window.location.href = "/login");
    setUserData(JSON.parse(storedUser));
  }, []);

  // Fetch pengajuan
  const fetchPengajuan = async () => {
    if (!userData) return;
    try {
      const res = await fetch(`/api/guru/pengajuan?guruId=${userData.id}`);
      const data = await res.json();
      if (data.success) setPengajuan(data.data);
    } catch (err) {
      console.error("Gagal fetch pengajuan:", err);
    }
  };

  useEffect(() => {
    fetchPengajuan();
    const interval = setInterval(fetchPengajuan, 10000); // refresh tiap 10 detik
    return () => clearInterval(interval);
  }, [userData]);

  // Setujui pengajuan
  const handleUpdateStatus = async (id) => {
    setLoading(true);
    await fetch(`/api/pengajuan/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Menunggu" }),
    });
    fetchPengajuan();
    setLoading(false);
  };

  // Tandai notif sudah dibaca
  const handleNotifRead = async (id) => {
    await fetch("/api/pengajuan/notif", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPengajuan();
  };

  // Hapus notif / riwayat
  const handleNotifDelete = async (id) => {
    await fetch("/api/pengajuan/notif", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPengajuan();
  };

  if (!userData) return <p>Loading...</p>;

  const guruNama = userData.email?.split("@")[0];

  const notifCount = pengajuan.filter(p => p.notif_dibaca === 0 && p.status === "Menunggu").length;

  // Format tanggal lebih friendly
  const formatTanggal = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <main className="min-h-screen bg-white text-[#2C3E50] p-6">
      {/* Navbar */}
      <nav className="bg-[#5B7DB1] text-white px-6 py-4 rounded-full shadow-lg flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">BKcTB - Dashboard Guru</h1>
        <div className="flex items-center gap-4">
          {/* Notifikasi */}
          <button
            className="relative p-2 rounded-full hover:bg-white/20 transition"
            onClick={() => setShowNotif(true)}
            title="Notifikasi"
          >
            <Bell size={24} />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {notifCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
            className="bg-white text-[#5B7DB1] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Selamat datang */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Selamat datang,</h2>
        <p className="text-3xl text-center font-bold mt-2">{guruNama}</p>
      </section>

      {/* Daftar Pengajuan */}
      <h2 className="text-3xl font-bold mb-6">Pengajuan Masuk</h2>
      {pengajuan.length === 0 ? (
        <p className="text-gray-500">Belum ada pengajuan.</p>
      ) : (
        <div className="space-y-4">
          {pengajuan.map(item => (
            <div
              key={item.id}
              className={`p-5 rounded-xl border ${
                item.notif_dibaca === 0 && item.status === "Menunggu"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{item.nama_siswa}</p>
                  <p>Kelas: {item.kelas_siswa}</p>
                  <p>Topik: {item.topik}</p>
                  <p>Waktu: {formatTanggal(item.created_at)}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        item.status === "Menunggu"
                          ? "text-orange-600"
                          : item.status === "Disetujui"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  {item.alasan && (
                    <p className="text-red-600 mt-2">
                      <b>Alasan:</b> {item.alasan}
                    </p>
                  )}
                </div>

                {/* Tombol Setujui hanya jika Menunggu */}
                {item.status === "Menunggu" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(item.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      disabled={loading}
                    >
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Notifikasi */}
      {showNotif && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowNotif(false)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Pengajuan Masuk</h3>
            {pengajuan.filter(p => p.status === "Menunggu").length === 0 ? (
              <p className="text-gray-500">Tidak ada pengajuan baru.</p>
            ) : (
              pengajuan
                .filter(p => p.status === "Menunggu")
                .map(p => (
                  <div key={p.id} className="border p-3 rounded mb-2 bg-blue-50 flex justify-between items-center">
                    <div>
                      <p><b>{p.nama_siswa}</b> mengajukan konseling.</p>
                      <p>Kelas: {p.kelas_siswa} | Topik: {p.topik} | Waktu: {formatTanggal(p.created_at)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleNotifRead(p.id)}
                        className={`px-3 py-1 rounded ${p.notif_dibaca === 1 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white"}`}
                        disabled={p.notif_dibaca === 1}
                      >
                        Sudah dibaca
                      </button>
                      <button
                        onClick={() => handleNotifDelete(p.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}

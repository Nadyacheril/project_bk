export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
        <p className="text-lg text-gray-700">Anda tidak memiliki izin untuk membuka halaman ini.</p>
      </div>
    </div>
  );
}

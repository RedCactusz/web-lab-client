"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authServicePraktikan } from "@/app/services/authServicePraktikan";

export default function RegisterMahasiswaPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nim: "",
    nama_lengkap: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await authServicePraktikan.registerPraktikan({
        nim: form.nim,
        nama_lengkap: form.nama_lengkap,
        password: form.password,
      });

      if (success) {
        alert("Pendaftaran berhasil! Silakan masuk.");
        router.push("/mahasiswa");
      } else {
        alert("Pendaftaran gagal. Silakan coba lagi atau hubungi administrator.");
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-1 text-center text-gray-900">Daftar Akun Mahasiswa</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">Buat akun untuk akses peminjaman alat</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">NIM *</label>
            <input
              type="text"
              placeholder="Masukkan NIM"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.nim}
              onChange={(e) => setForm({ ...form, nim: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nama Lengkap *</label>
            <input
              type="text"
              placeholder="Nama lengkap"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.nama_lengkap}
              onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              placeholder="Buat password"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/mahasiswa")}
              className="text-sm text-blue-600 hover:underline"
            >
              Sudah punya akun? Masuk di sini
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authServicePraktikan } from "@/app/services/authServicePraktikan";

export default function LoginFormPraktikan() {
  const router = useRouter();

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authServicePraktikan.loginPraktikan(nim, password);

      if (!data) {
        alert("Login gagal. Pastikan NIM dan password sudah benar.");
      } else {
        localStorage.setItem("user_praktikan", JSON.stringify(data));
        router.push("/admin/mahasiswa");
      }
    } catch (error: any) {
      alert("Error Database: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-1 text-center text-gray-900">Login Praktikan</h1>
      <p className="text-gray-500 text-center mb-8 text-sm">Masuk untuk peminjaman alat laboratorium</p>
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">NIM</label>
          <input
            type="text"
            placeholder="Masukkan NIM"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authServicePraktikan } from "@/app/services/authServicePraktikan";
import { peminjamanService } from "@/app/services/peminjamanService";
import Table from "@/app/components/tables/Table";
import { columnsPeminjaman, type Peminjaman } from "./_features/configPeminjaman";
import PeminjamanModal from "./_features/PeminjamanModal";
import KetersediaanModal from "./_features/KetersediaanModal";

export default function MahasiswaDashboardPage() {
  const router = useRouter();
  const [praktikan, setPraktikan] = useState<any>(null);
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [showPeminjamanModal, setShowPeminjamanModal] = useState(false);
  const [showKetersediaanModal, setShowKetersediaanModal] = useState(false);

  useEffect(() => {
    const data = authServicePraktikan.getPraktikanFromStorage();
    if (data) {
      setPraktikan(data);
      peminjamanService.getByNim(data.nim).then((riwayat) => setPeminjaman(riwayat));
    }
  }, []);

  const handleLogout = async () => {
    await authServicePraktikan.logout();
    router.push("/");
    router.refresh();
  };

  const handleSubmitPeminjaman = async (data: any) => {
    await peminjamanService.create(data);
    if (praktikan?.nim) {
      const riwayat = await peminjamanService.getByNim(praktikan.nim);
      setPeminjaman(riwayat);
    }
    setShowPeminjamanModal(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Halo, {praktikan?.nama_lengkap?.split(" ")[0] || praktikan?.nim || "Praktikan"}!
          </h1>
          <p className="text-gray-700 text-sm">NIM: {praktikan?.nim || "-"}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="bg-white border border-red-200 hover:bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            Keluar
          </button>
          <button
            onClick={() => setShowKetersediaanModal(true)}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            Cek Ketersediaan
          </button>
          <button
            onClick={() => setShowPeminjamanModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20"
          >
            + Pinjam Alat
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Riwayat Peminjaman Alat</h2>
        <Table columns={columnsPeminjaman} data={peminjaman} emptyMessage="Belum ada riwayat peminjaman" />
      </div>

      {showPeminjamanModal && (
        <PeminjamanModal
          praktikan={praktikan}
          onClose={() => setShowPeminjamanModal(false)}
          onSubmit={handleSubmitPeminjaman}
        />
      )}

      {showKetersediaanModal && (
        <KetersediaanModal onClose={() => setShowKetersediaanModal(false)} />
      )}
    </div>
  );
}

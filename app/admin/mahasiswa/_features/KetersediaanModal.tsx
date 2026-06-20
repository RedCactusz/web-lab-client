"use client";

import { useState, useEffect } from "react";
import { inventarisService, type Inventaris } from "@/app/services/inventarisService";

interface KetersediaanModalProps {
  onClose: () => void;
}

export default function KetersediaanModal({ onClose }: KetersediaanModalProps) {
  const [search, setSearch] = useState("");
  const [allAlat, setAllAlat] = useState<Inventaris[]>([]);

  useEffect(() => {
    inventarisService.getAll().then((data) => setAllAlat(data));
  }, []);

  const filtered = allAlat.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.kode_alat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Ketersediaan Alat</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Cari alat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="max-h-80 overflow-y-auto space-y-2">
            {allAlat.length === 0 ? (
              <p className="text-center py-8 text-gray-400 italic text-sm">Memuat data...</p>
            ) : filtered.length === 0 ? (
              <p className="text-center py-8 text-gray-600 italic text-sm">Tidak ada alat ditemukan</p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.nama}</p>
                    <p className="text-xs text-gray-600 font-mono">{item.kode_alat}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.jumlah > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.jumlah} unit
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

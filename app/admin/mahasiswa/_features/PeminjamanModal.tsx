"use client";

import { useState, useEffect, useRef } from "react";
import {
  inventarisService,
  type Inventaris,
} from "@/app/services/inventarisService";
import type { PeminjamanItem } from "./configPeminjaman";
import {
  PraktikumData,
  praktikumService,
} from "@/app/services/praktikumService";

interface PeminjamanModalProps {
  praktikan: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function PeminjamanModal({
  praktikan,
  onClose,
  onSubmit,
}: PeminjamanModalProps) {
  const [keperluan, setKeperluan] = useState("");
  const [alasanLainnya, setAlasanLainnya] = useState("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [jamPinjam, setJamPinjam] = useState("08:00");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [jamKembali, setJamKembali] = useState("16:00");
  const [items, setItems] = useState<PeminjamanItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showKetersediaan, setShowKetersediaan] = useState(false);
  const [ketersediaanSearch, setKetersediaanSearch] = useState("");
  const [allAlat, setAllAlat] = useState<Inventaris[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [praktikumOptions, setPraktikumOptions] = useState<PraktikumData[]>([]); // 3. State untuk menampung data DB

  useEffect(() => {
    const fetchPraktikum = async () => {
      try {
        const data = await praktikumService.getAll();
        setPraktikumOptions(data);
        if (data.length > 0) {
          setKeperluan(data[0].slug); // Set default value ke slug praktikum pertama
        }
      } catch (error) {
        console.error("Gagal memuat opsi praktikum:", error);
      }
    };
    fetchPraktikum();
  }, []);

  useEffect(() => {
    inventarisService.getAll().then((data) => setAllAlat(data));
  }, []);

  const suggestions =
    searchQuery.length > 0
      ? allAlat
          .filter((item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const ketersediaanList = allAlat.filter(
    (item) =>
      item.nama.toLowerCase().includes(ketersediaanSearch.toLowerCase()) ||
      item.kode_alat.toLowerCase().includes(ketersediaanSearch.toLowerCase()),
  );

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTanggalPinjam(today);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    setTanggalKembali(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addItem = (namaAlat: string) => {
    const exists = items.find((i) => i.nama_alat === namaAlat);
    if (exists) return;
    setItems([...items, { nama_alat: namaAlat, jumlah: 1 }]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    const alat = allAlat.find((a) => a.nama === items[index].nama_alat);
    const maxQty = alat ? alat.jumlah : 99;
    const newQty = items[index].jumlah + delta;
    if (newQty < 1 || newQty > maxQty) return;
    const updated = [...items];
    updated[index] = { ...updated[index], jumlah: newQty };
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keperluan || items.length === 0) return;
    if (keperluan === "lainnya" && !alasanLainnya.trim()) return;
    if (!tanggalPinjam || !tanggalKembali) return;

    onSubmit({
      nim: praktikan?.nim || "",
      nama_mahasiswa: praktikan?.nama_lengkap || "",
      keperluan,
      alasan_lainnya: keperluan === "lainnya" ? alasanLainnya : undefined,
      tanggal_pengajuan: new Date().toISOString().split("T")[0],
      tanggal_pinjam: tanggalPinjam,
      jam_pinjam: jamPinjam,
      tanggal_kembali: tanggalKembali,
      jam_kembali: jamKembali,
      items,
      status: "pending" as const,
      created_at: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex">
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${showKetersediaan ? "mr-80" : ""}`}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-lg font-bold text-gray-900">
              Form Peminjaman Alat
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors font-bold"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 overflow-y-auto flex-1"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Keperluan *
              </label>
              <select
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                {praktikumOptions.length === 0 ? (
                  <option value="">Memuat praktikum...</option>
                ) : (
                  praktikumOptions.map((prak) => (
                    <option key={prak.id} value={prak.slug}>
                      {prak.nama}
                    </option>
                  ))
                )}
              </select>
            </div>

            {keperluan === "lainnya" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Alasan Peminjaman *
                </label>
                <textarea
                  value={alasanLainnya}
                  onChange={(e) => setAlasanLainnya(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={2}
                  placeholder="Jelaskan alasan peminjaman..."
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tanggal Pinjam *
                </label>
                <input
                  type="date"
                  value={tanggalPinjam}
                  onChange={(e) => setTanggalPinjam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Jam Pinjam *
                </label>
                <input
                  type="time"
                  value={jamPinjam}
                  onChange={(e) => setJamPinjam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tanggal Kembali *
                </label>
                <input
                  type="date"
                  value={tanggalKembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  min={tanggalPinjam}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Jam Kembali *
                </label>
                <input
                  type="time"
                  value={jamKembali}
                  onChange={(e) => setJamKembali(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div ref={searchRef} className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tambah Alat
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Ketik nama alat..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {suggestions.map((item) => {
                    const alreadyAdded = items.some(
                      (i) => i.nama_alat === item.nama,
                    );
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => addItem(item.nama)}
                        disabled={alreadyAdded}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between ${
                          alreadyAdded
                            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "hover:bg-emerald-50 text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{item.nama}</span>
                        {alreadyAdded ? (
                          <span className="text-xs">Sudah ditambahkan</span>
                        ) : (
                          <span className="text-xs text-gray-600">
                            {item.jumlah} unit
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Alat yang Dipinjam ({items.length})
                </p>
                {items.map((item, index) => {
                  const alat = allAlat.find((a) => a.nama === item.nama_alat);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.nama_alat}
                        </p>
                        <p className="text-xs text-gray-600">
                          Tersedia: {alat?.jumlah || 0} unit
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">
                          {item.jumlah}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, 1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="ml-2 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowKetersediaan(!showKetersediaan)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                showKetersediaan
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {showKetersediaan
                ? "✕ Tutup Ketersediaan"
                : "📦 Cek Ketersediaan Alat"}
            </button>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={items.length === 0 || !keperluan}
                className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajukan Peminjaman
              </button>
            </div>
          </form>
        </div>

        {showKetersediaan && (
          <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col rounded-r-2xl">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">
                Ketersediaan Alat
              </h3>
              <input
                type="text"
                placeholder="Cari alat..."
                value={ketersediaanSearch}
                onChange={(e) => setKetersediaanSearch(e.target.value)}
                className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {ketersediaanList.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-500 italic">
                  Tidak ada alat
                </p>
              ) : (
                ketersediaanList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {item.nama}
                      </p>
                      <p className="text-[10px] font-mono text-gray-500">
                        {item.kode_alat}
                      </p>
                    </div>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                        item.jumlah > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.jumlah}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

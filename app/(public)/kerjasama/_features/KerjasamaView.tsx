"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicService, type KerjasamaItem } from "@/app/services/publicService";

export default function KerjasamaView() {
  const [kerjasamaItems, setKerjasamaItems] = useState<KerjasamaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadKerjasama() {
      try {
        setLoading(true);
        const data = await publicService.getKerjasama();
        setKerjasamaItems(data);
      } catch (err) {
        setError("Gagal memuat kerjasama. Silakan coba lagi nanti.");
        console.error("Error loading kerjasama:", err);
      } finally {
        setLoading(false);
      }
    }
    loadKerjasama();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (kerjasamaItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-lg">Belum ada kerjasama tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kerjasama Laboratorium</h2>
          <p className="text-gray-600 leading-relaxed">
            Laboratorium Terpadu menjalin kerjasama dengan berbagai institusi dan industri untuk mendukung kegiatan praktikum dan penelitian.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kerjasamaItems.map((item) => (
            <div key={item.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition">
              {item.logo && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image src={item.logo} alt={item.partner_name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.partner_name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.status === 'active' ? 'bg-green-100 text-green-700' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status === 'active' ? 'Aktif' : item.status === 'pending' ? 'Pending' : item.status}
                    </span>
                  </div>
                </div>
              )}
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              {item.start_date && (
                <div className="text-xs text-gray-500">
                  {item.start_date} {item.end_date ? ` - ${item.end_date}` : 'sekarang'}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Hubungi Kami untuk Kolaborasi</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:lab@univ.ac.id" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center">
              Kirim Proposal
            </a>
            <a href="tel:+6212345678" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-center">
              Hubungi Admin Lab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

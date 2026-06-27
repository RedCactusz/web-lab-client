"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicService, type Partner } from "@/app/services/publicService";

export default function PartnersView() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPartners() {
      try {
        setLoading(true);
        const data = await publicService.getPartners();
        setPartners(data);
      } catch (err) {
        setError("Gagal memuat mitra. Silakan coba lagi nanti.");
        console.error("Error loading partners:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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

  if (partners.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-lg">Belum ada mitra tersedia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {partners.map((partner) => (
        <div key={partner.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 group-hover:scale-110 transition-transform duration-300">
            <Image src={partner.logo} alt={partner.name} width={128} height={128} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{partner.name}</h3>
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{partner.category}</span>
        </div>
      ))}
    </div>
  );
}

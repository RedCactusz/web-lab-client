"use client";

import { useState, useEffect } from "react";
import { publicService, type AgendaItem } from "@/app/services/publicService";

export default function AgendaView() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAgenda() {
      try {
        setLoading(true);
        const data = await publicService.getAgenda();
        setAgendaItems(data);
      } catch (err) {
        setError("Gagal memuat agenda. Silakan coba lagi nanti.");
        console.error("Error loading agenda:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAgenda();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border-l-4 border-blue-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl min-w-[80px] animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-1"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
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

  if (agendaItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-lg">Belum ada agenda tersedia.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('id-ID', { month: 'short' }),
    };
  };

  return (
    <div className="space-y-6">
      {agendaItems.map((item) => {
        const { day, month } = formatDate(item.date);
        return (
          <div key={item.id} className="bg-white p-6 rounded-2xl border-l-4 border-blue-600 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-xl text-center min-w-[80px]">
                <span className="block text-xs font-bold uppercase">{month}</span>
                <span className="block text-xl font-black">{day}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {item.location} | {item.time}
                </p>
              </div>
            </div>
            <button className="text-sm font-bold text-blue-600 hover:underline">Detail Event</button>
          </div>
        );
      })}
    </div>
  );
}

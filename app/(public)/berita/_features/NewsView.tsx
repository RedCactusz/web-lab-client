"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicService, type NewsItem } from "@/app/services/publicService";

export default function NewsView() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const data = await publicService.getNews();
        setNewsItems(data);
      } catch (err) {
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
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

  if (newsItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-lg">Belum ada berita tersedia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {newsItems.map((news) => (
        <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <div className="h-48 overflow-hidden">
            <Image src={news.image} alt={news.title} width={400} height={192} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{news.category}</span>
              <span className="text-xs text-gray-400">{news.date}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">{news.title}</h3>
            <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1">
              Baca Selengkapnya &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

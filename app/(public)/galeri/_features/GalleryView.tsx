"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicService, type GalleryItem } from "@/app/services/publicService";

export default function GalleryView() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const data = await publicService.getGallery();
        setGalleryItems(data);
      } catch (err) {
        setError("Gagal memuat galeri. Silakan coba lagi nanti.");
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-200 rounded-2xl aspect-video animate-pulse"></div>
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

  if (galleryItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-lg">Belum ada galeri tersedia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryItems.map((img) => (
        <div key={img.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 aspect-video">
          <Image
            src={img.image}
            alt={img.title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
            <h3 className="text-white font-bold text-lg">{img.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

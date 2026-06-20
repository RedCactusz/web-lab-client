"use client";
import GalleryView from "@/app/(public)/galeri/_features/GalleryView";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Galeri Laboratorium</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dokumentasi fasilitas, alat, dan berbagai kegiatan praktikum yang berlangsung di Laboratorium Terpadu.
          </p>
        </div>
        <GalleryView />
      </div>
    </div>
  );
}

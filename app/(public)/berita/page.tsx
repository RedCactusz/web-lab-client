"use client";
import NewsView from "@/app/(public)/berita/_features/NewsView";
import Footer from "@/app/components/ui/Footer";

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Berita & Informasi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Kabar terbaru seputar perkembangan teknologi, riset, dan kegiatan akademik di Laboratorium.</p>
        </div>
        <NewsView />
      </div>
      <Footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-200" />
    </div>
  );
}

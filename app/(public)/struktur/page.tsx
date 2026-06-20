"use client";
import StructureView from "@/app/(public)/struktur/_features/StructureView";

export default function StructurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Struktur Organisasi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hierarki manajemen dan tanggung jawab operasional dalam pengelolaan Laboratorium Terpadu.
          </p>
        </div>
        <StructureView />
      </div>
    </div>
  );
}

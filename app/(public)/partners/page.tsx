"use client";
import PartnersView from "@/app/(public)/partners/_features/PartnersView";
import Footer from "@/app/components/ui/Footer";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Mitra Strategis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami bekerja sama dengan berbagai institusi pemerintah, akademisi, dan industri untuk meningkatkan kualitas riset dan praktikum.
          </p>
        </div>
        <PartnersView />
      </div>
      <Footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-200" />
    </div>
  );
}

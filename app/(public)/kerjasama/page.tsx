"use client";
import KerjasamaView from "@/app/(public)/kerjasama/_features/KerjasamaView";
import Footer from "@/app/components/ui/Footer";

export default function KerjasamaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Kerja Sama Strategis</h1>
          <p className="text-gray-600">Membangun sinergi akademik dan industri untuk kemajuan teknologi survei dan pemetaan.</p>
        </div>
        <KerjasamaView />
      </div>
      <Footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-200" />
    </div>
  );
}

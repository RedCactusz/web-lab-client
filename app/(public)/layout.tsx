import Navbar from "../components/bars/NavBar";
import Footer from "../components/ui/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar otomatis terpasang di atas */}
      <Navbar />

      {/* Konten halaman akan merender di sini */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer text={`© ${new Date().getFullYear()} Laboratorium Terpadu. All rights reserved.`} className="bg-gray-800 text-gray-400 py-6 text-center text-sm border-t border-gray-700" />
    </div>
  );
}
import { GALLERY_IMAGES } from '../galeri/_contents/galleryData';

export const landingData = {
  hero: {
    title: "Selamat Datang di Portal Laboratorium Terpadu",
    description: "Pusat inovasi, riset, dan praktikum mahasiswa. Kami memfasilitasi kebutuhan akademik dengan dukungan inventaris alat yang mutakhir dan sistem terintegrasi.",
    ctaPrimary: {
      text: "Mulai Peminjaman Alat →",
      href: "/mahasiswa",
    },
    ctaSecondary: {
      text: "Portal Nilai Asisten →",
      href: "/pengajar",
    },
  },
  about: {
    title: "Tentang Laboratorium",
    description: "Laboratorium Survei Geodesi & Geometri adalah pusat unggulan dalam pengembangan ilmu pemetaan dan pengukuran bumi. Kami berkomitmen menyediakan lingkungan belajar yang modern bagi mahasiswa melalui integrasi teknologi terbaru.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    stats: {
      value: "8+",
      label: "Tahun Pengalaman",
    },
  },
  services: [
    {
      icon: "📦",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      title: "Peminjaman Alat",
      description: "Pengajuan peminjaman alat secara mandiri menggunakan NIM dengan sistem real-time.",
      linkText: "Pelajari Lebih Lanjut →",
      href: "/mahasiswa",
    },
    {
      icon: "📊",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      title: "Transparansi Nilai",
      description: "Pantau rekapitulasi nilai praktikum secara aman dan transparan bagi mahasiswa.",
      linkText: "Akses Portal →",
      href: "/pengajar",
    },
    {
      icon: "📋",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      title: "Manajemen Logistik",
      description: "Pemantauan stok unit alat secara berkala untuk kelancaran kegiatan praktikum.",
      footerText: "Hanya untuk Admin",
    },
  ],
  announcements: [
    { id: 1, date: "22 Mei 2026", title: "Pendaftaran Praktikum Hidrografi Gelombang 1 Telah Dibuka", type: "Penting" },
    { id: 2, date: "18 Mei 2026", title: "Pemeliharaan Alat Ukur Theodolite (23-25 Mei), Peminjaman Ditutup", type: "Info" },
  ],
  agenda: [
    {
      date: "10",
      month: "JUN",
      title: "Workshop GNSS",
      time: "09:00 - 12:00",
      color: "bg-blue-600 text-white",
    },
    {
      date: "15",
      month: "JUN",
      title: "Ujian Akhir Hidro",
      time: "08:00 - Selesai",
      color: "bg-slate-200 text-slate-700",
    },
  ],
  partners: {
    title: "Mitra Strategis",
    description: "Bekerja sama dengan berbagai institusi terkemuka untuk memajukan ilmu geodesi.",
    items: GALLERY_IMAGES.slice(0, 4).map(img => ({
      src: img.url,
      alt: img.title,
    })),
    cta: {
      text: "Pelajari Peluang Kerja Sama",
      href: "/kerjasama",
    },
  },
};

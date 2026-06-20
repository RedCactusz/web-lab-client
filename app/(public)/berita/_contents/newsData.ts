export interface NewsItem {
  id: number;
  date: string;
  title: string;
  category: string;
  image: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  { id: 1, date: "28 Mei 2026", title: "Pengembangan Sistem Informasi Nilai Berbasis Cloud", category: "Teknologi", image: "https://images.unsplash.com/photo-1518770665202-45f9a412986c?q=80&w=400&auto=format&fit=crop" },
  { id: 2, date: "25 Mei 2026", title: "Kolaborasi Riset Pengukuran Pasang Surut Air Laut", category: "Riset", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" },
  { id: 3, date: "20 Mei 2026", title: "Pengadaan Alat Total Station Terbaru Seri 2026", category: "Fasilitas", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop" },
];

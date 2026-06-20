export interface GalleryImage {
  id: number;
  title: string;
  category: string;
  url: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, title: "Laboratorium Utama", category: "Fasilitas", url: "/gallery/alat.jpeg" },
  { id: 2, title: "Alat Theodolite", category: "Alat", url: "/gallery/alat1.jpeg" },
  { id: 3, title: "Kegiatan Praktikum", category: "Kegiatan", url: "/gallery/ngajar.jpeg" },
  { id: 4, title: "Ruang Pengolahan Data", category: "Fasilitas", url: "/gallery/alat2.jpeg" },
  { id: 5, title: "Alat Waterpass", category: "Alat", url: "/gallery/alat.jpeg" },
  { id: 6, title: "Diskusi Tim Asisten", category: "Kegiatan", url: "/gallery/ngajar.jpeg" },
];

export interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
}

export const PARTNERS: Partner[] = [
  { id: 1, name: "Kementerian ATR/BPN", logo: "https://via.placeholder.com/150?text=ATR+BPN", category: "Pemerintah" },
  { id: 2, name: "PT. Geospasial Indonesia", logo: "https://via.placeholder.com/150?text=GeoIndo", category: "Swasta" },
  { id: 3, name: "Universitas Terkemuka", logo: "https://via.placeholder.com/150?text=Uni+Edu", category: "Akademik" },
  { id: 4, name: "Sertifikasi Geodesi", logo: "https://via.placeholder.com/150?text=SertifGeo", category: "Sertifikasi" },
  { id: 5, name: "Global Survey Ltd", logo: "https://via.placeholder.com/150?text=GlobalS", category: "Internasional" },
  { id: 6, name: "Asosiasi Surveyor Indonesia", logo: "https://via.placeholder.com/150?text=ASI", category: "Organisasi" },
];

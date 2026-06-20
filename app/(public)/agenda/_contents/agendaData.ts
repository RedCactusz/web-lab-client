export interface AgendaItem {
  id: number;
  date: string;
  title: string;
  location: string;
  time: string;
}

export const AGENDA_ITEMS: AgendaItem[] = [
  { id: 1, date: "10 Juni 2026", title: "Workshop Pengolahan Data GNSS", location: "Lab Utama", time: "09:00 - 12:00" },
  { id: 2, date: "15 Juni 2026", title: "Ujian Akhir Praktikum Hidrografi", location: "Pantai Selatan", time: "08:00 - Selesai" },
  { id: 3, date: "22 Juni 2026", title: "Rapat Koordinasi Asisten Lab", location: "Ruang Rapat", time: "13:00 - 15:00" },
  { id: 4, date: "05 Juli 2026", title: "Kunjungan Industri PT. GeoS", location: "Kantor Pusat PT GeoS", time: "All Day" },
];

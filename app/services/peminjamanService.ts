const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export interface PeminjamanItem {
  nama_alat: string;
  jumlah: number;
}

export interface Peminjaman {
  id: string | number;
  nim: string;
  nama_mahasiswa: string;
  keperluan: string;
  alasan_lainnya?: string;
  tanggal_pengajuan: string;
  tanggal_pinjam: string;
  jam_pinjam: string;
  tanggal_kembali: string;
  jam_kembali: string;
  items: PeminjamanItem[];
  revised_items?: PeminjamanItem[];
  revisi_catatan?: string;
  status: string;
  created_at: string;
}

export const peminjamanService = {
  async getByNim(nim: string): Promise<Peminjaman[]> {
    const response = await fetch(`${API_URL}/public/peminjaman?nim=${nim}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || data || [];
  },

  async create(payload: any): Promise<Peminjaman | null> {
    const response = await fetch(`${API_URL}/public/peminjaman`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.data || data;
  },
};

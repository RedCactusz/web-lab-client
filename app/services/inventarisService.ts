const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export interface Inventaris {
  id: number;
  kode_alat: string;
  nama: string;
  kategori: string;
  merk: string;
  tipe: string;
  kondisi: string;
  jumlah: number;
  lokasi: string;
  keterangan: string;
}

export const inventarisService = {
  async getAll(): Promise<Inventaris[]> {
    const response = await fetch(`${API_URL}/public/inventaris`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || data || [];
  },
};

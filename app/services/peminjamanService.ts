import type { Peminjaman } from "@/app/types/peminjaman";

const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export const peminjamanService = {
  async getByNim(nim: string): Promise<Peminjaman[]> {
    const response = await fetch(`${API_URL}/public/peminjaman?nim=${nim}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || data || [];
  },

  async create(payload: Omit<Peminjaman, "id">): Promise<Peminjaman | null> {
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

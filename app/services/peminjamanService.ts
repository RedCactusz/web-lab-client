import type { Peminjaman } from "@/app/types/peminjaman";
import { authServicePraktikan } from "./authServicePraktikan";

const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export const peminjamanService = {
  async getByNim(nim: string): Promise<Peminjaman[]> {
    const token = authServicePraktikan.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/public/peminjaman?nim=${nim}`, {
      headers,
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || data || [];
  },

  async create(payload: Omit<Peminjaman, "id">): Promise<Peminjaman | null> {
    const token = authServicePraktikan.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/public/peminjaman`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.data || data;
  },
};

import { authServicePraktikan } from "./authServicePraktikan";

const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export interface PraktikumData {
  id: number;
  kode: string;
  nama: string;
  slug: string;
  deskripsi: string;
  is_active: boolean;
  jumlah_plug: number | null;
}

export const praktikumService = {
  async getAll(): Promise<PraktikumData[]> {
    const token = authServicePraktikan.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/selector/praktikum`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch praktikum');
    const data = await response.json();
    return data.data || data;
  },
};

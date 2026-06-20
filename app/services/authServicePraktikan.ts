const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

export interface PraktikanUser {
  id: number;
  nim: string;
  nama_lengkap: string;
  angkatan?: number;
}

export const authServicePraktikan = {
  loginPraktikan: async (nim: string, password: string): Promise<PraktikanUser | null> => {
    try {
      const response = await fetch(`${API_URL}/login/mahasiswa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim, password }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const result = data.data || data;
      const user = result.user || result;
      const mahasiswa = result.mahasiswa || {};
      const token = result.token || '';

      const praktikanUser: PraktikanUser = {
        id: user.id || 0,
        nim: mahasiswa.nim || nim,
        nama_lengkap: mahasiswa.nama_lengkap || user.name || nim,
        angkatan: mahasiswa.angkatan || null,
      };

      if (token) {
        localStorage.setItem('mahasiswa_token', token);
      }

      return praktikanUser;
    } catch {
      return null;
    }
  },

  getPraktikanFromStorage: (): PraktikanUser | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("user_praktikan");
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("user_praktikan");
  },

  logout: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user_praktikan");
    localStorage.removeItem("mahasiswa_token");
  },

  registerPraktikan: async (userData: any): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/register/mahasiswa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};

const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8001/client_api';

// Types based on backend API responses
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface AgendaItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
  url: string;
  order: number;
}

export interface KerjasamaItem {
  id: number;
  title: string;
  description: string;
  partner_name: string;
  logo: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_at: string;
}

export interface OrganizationStructure {
  id: number;
  type: 'kepala_lab' | 'dosen_lab' | 'praktikum_section' | 'praktikum_pengajar';
  name: string | null;
  role: string | null;
  image: string | null;
  section_name: string | null;
  parent_id: number | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export const publicService = {
  async getNews(): Promise<NewsItem[]> {
    const response = await fetch(`${API_URL}/public/news`);
    if (!response.ok) throw new Error('Failed to fetch news');
    const data = await response.json();
    return data.data || [];
  },

  async getGallery(): Promise<GalleryItem[]> {
    const response = await fetch(`${API_URL}/public/gallery`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    const data = await response.json();
    return data.data || [];
  },

  async getAgenda(): Promise<AgendaItem[]> {
    const response = await fetch(`${API_URL}/public/agenda`);
    if (!response.ok) throw new Error('Failed to fetch agenda');
    const data = await response.json();
    return data.data || [];
  },

  async getPartners(): Promise<Partner[]> {
    const response = await fetch(`${API_URL}/public/partners`);
    if (!response.ok) throw new Error('Failed to fetch partners');
    const data = await response.json();
    return data.data || [];
  },

  async getKerjasama(): Promise<KerjasamaItem[]> {
    const response = await fetch(`${API_URL}/public/kerjasama`);
    if (!response.ok) throw new Error('Failed to fetch kerjasama');
    const data = await response.json();
    return data.data || [];
  },

  async getStructure(): Promise<OrganizationStructure[]> {
    const response = await fetch(`${API_URL}/public/structure`);
    if (!response.ok) throw new Error('Failed to fetch structure');
    const data = await response.json();
    return data.data || [];
  },
};

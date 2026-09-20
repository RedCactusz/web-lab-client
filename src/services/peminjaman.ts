import { api } from './api'
import type { AlatLogListMeta } from './alat'

export type PeminjamanStatus = 'pending' | 'disetujui' | 'ditolak'

export interface PeminjamanItem {
  id: number
  alat_id: number
  inventaris: string
  nama_alat: string | null
  merk: string | null
  tipe: string | null
  jumlah: number
}

export interface Peminjaman {
  id: number
  nim: number
  nama: string
  keperluan: string
  keperluan_label: string
  praktikum_slug: string | null
  status: PeminjamanStatus
  catatan: string | null
  approved_by: string | null
  approved_at: string | null
  returned_at: string | null
  dibuat_pada: string
  items: PeminjamanItem[]
}

export interface PeminjamanListResponse {
  data: Peminjaman[]
  meta: AlatLogListMeta
}

export interface KeperluanOption {
  value: string
  label: string
}

export interface PraktikumOption {
  slug: string
  label: string
}

export interface PeminjamanOptions {
  keperluan: KeperluanOption[]
  praktikum: PraktikumOption[]
}

export interface AjukanPeminjamanPayload {
  keperluan: string
  praktikum_slug?: string
  items: { alat_id: number; jumlah: number }[]
}

export const peminjamanService = {
  async options(): Promise<PeminjamanOptions> {
    return api<PeminjamanOptions>('/api/client/peminjaman/options')
  },

  async list(page = 1): Promise<PeminjamanListResponse> {
    return api<PeminjamanListResponse>(`/api/client/peminjaman?page=${page}`)
  },

  async create(payload: AjukanPeminjamanPayload): Promise<{ data: Peminjaman }> {
    return api<{ data: Peminjaman }>('/api/client/peminjaman', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}

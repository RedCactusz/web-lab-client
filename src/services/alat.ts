import { api } from './api'

export const KETERSEDIAAN_STATUSES = ['tersedia', 'dipinjam', 'perbaikan'] as const

export type KetersediaanStatus = (typeof KETERSEDIAAN_STATUSES)[number]

export interface Alat {
  id: number
  inventaris: string
  nama_alat: string
  merk: string
  tipe: string
  serial_number: string
  jumlah: number
  kondisi: KondisiEntry[]
  kondisi_ringkas: KondisiRingkas
  lokasi_penyimpanan: string
  ketersediaan: KetersediaanStatus
}

export interface KatalogAlat {
  nama_alat: string
  jumlah_unit: number
  jumlah_tersedia: number
  items: Alat[]
}

export interface KondisiCatatan {
  komponen: string
  keterangan: string
}

export interface KondisiEntry {
  status: string
  jumlah: number
  catatan: KondisiCatatan[]
}

export const KONDISI_STATUSES = ['baik', 'rusak_ringan', 'rusak_berat', 'maintenance'] as const

export type KondisiStatus = (typeof KONDISI_STATUSES)[number]

export type KondisiRingkas = Record<KondisiStatus, number>

interface AlatListResponse {
  data: KatalogAlat[]
}

export interface AlatLogListMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export const alatService = {
  async getAll(): Promise<AlatListResponse> {
    return api<AlatListResponse>('/api/client/alat')
  },
}

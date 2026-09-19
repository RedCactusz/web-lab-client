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
  lokasi_penyimpanan: string
  ketersediaan: KetersediaanStatus
}

export type AlatLogStatus = 'keluar' | 'masuk'

export interface AlatLog {
  id: number
  id_log: string
  keperluan: string
  nim_pic: number | null
  nama_pic: string | null
  inventaris: string
  nama_alat: string | null
  status: AlatLogStatus
  waktu: string
}

interface AlatListResponse {
  data: Alat[]
}

export interface AlatLogListMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface AlatLogListResponse {
  data: AlatLog[]
  meta: AlatLogListMeta
}

export const alatService = {
  async getAll(): Promise<AlatListResponse> {
    return api<AlatListResponse>('/api/client/alat')
  },

  async pinjam(id: number): Promise<{ message: string }> {
    return api<{ message: string }>(`/api/client/alat/${id}/pinjam`, { method: 'POST' })
  },

  async kembali(id: number): Promise<{ message: string }> {
    return api<{ message: string }>(`/api/client/alat/${id}/kembali`, { method: 'POST' })
  },

  async riwayat(page = 1): Promise<AlatLogListResponse> {
    return api<AlatLogListResponse>(`/api/client/alat-log?page=${page}`)
  },
}

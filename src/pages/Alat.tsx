import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  alatService,
  ApiError,
  KONDISI_STATUSES,
  peminjamanService,
  type Alat,
  type AlatLog,
  type AlatLogListMeta,
  type KatalogAlat,
  type KetersediaanStatus,
  type KondisiStatus,
  type Peminjaman,
  type PeminjamanStatus,
} from '@/services'
import { useAuth } from '@/contexts/AuthContext'
import AlatDetailModal from './Alat/_components/AlatDetailModal'
import PeminjamanFormModal from './Alat/_components/PeminjamanFormModal'

const KETERSEDIAAN_LABELS: Record<KetersediaanStatus, string> = {
  tersedia: 'Tersedia',
  dipinjam: 'Dipinjam',
  perbaikan: 'Perbaikan',
}

const KETERSEDIAAN_BADGE_CLASSES: Record<KetersediaanStatus, string> = {
  tersedia: 'bg-green-100 text-green-800',
  dipinjam: 'bg-yellow-100 text-yellow-800',
  perbaikan: 'bg-red-100 text-red-800',
}

const KONDISI_LABELS: Record<KondisiStatus, string> = {
  baik: 'baik',
  rusak_ringan: 'rusak ringan',
  rusak_berat: 'rusak berat',
  maintenance: 'maintenance',
}

const kondisiRingkas = (alat: Alat) =>
  KONDISI_STATUSES.filter((status) => (alat.kondisi_ringkas[status] ?? 0) > 0)
    .map((status) => `${alat.kondisi_ringkas[status]} ${KONDISI_LABELS[status]}`)
    .join(' · ')

const STATUS_LABELS: Record<PeminjamanStatus, string> = {
  pending: 'Menunggu Persetujuan',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak',
}

const STATUS_BADGE_CLASSES: Record<PeminjamanStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  disetujui: 'bg-green-100 text-green-800',
  ditolak: 'bg-red-100 text-red-800',
}

function formatWaktu(value: string): string {
  return new Date(value).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AlatPage() {
  const { user } = useAuth()
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([])
  const [peminjamanMeta, setPeminjamanMeta] = useState<AlatLogListMeta | null>(null)
  const [peminjamanPage, setPeminjamanPage] = useState(1)
  const [katalog, setKatalog] = useState<KatalogAlat[]>([])
  const [logList, setLogList] = useState<AlatLog[]>([])
  const [logMeta, setLogMeta] = useState<AlatLogListMeta | null>(null)
  const [logPage, setLogPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedNama, setExpandedNama] = useState<string | null>(null)
  const [detailTarget, setDetailTarget] = useState<Alat | null>(null)
  const [error, setError] = useState<string | null>(null)

  const alatList = useMemo(() => katalog.flatMap((grup) => grup.items), [katalog])

  const loadPeminjaman = useCallback(async (page: number) => {
    const response = await peminjamanService.list(page)
    setPeminjamanList(response.data)
    setPeminjamanMeta(response.meta)
  }, [])

  const loadAlat = useCallback(async () => {
    const response = await alatService.getAll()
    setKatalog(response.data)
  }, [])

  const loadRiwayat = useCallback(async (page: number) => {
    const response = await alatService.riwayat(page)
    setLogList(response.data)
    setLogMeta(response.meta)
  }, [])

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    Promise.all([loadPeminjaman(peminjamanPage), loadAlat(), loadRiwayat(logPage)])
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Gagal memuat data.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [loadPeminjaman, loadAlat, loadRiwayat, peminjamanPage, logPage])

  const handlePengajuanSuccess = async () => {
    setIsModalOpen(false)
    setPeminjamanPage(1)
    await Promise.all([loadPeminjaman(1), loadAlat()])
  }

  const toggleExpand = (nama: string) => {
    setExpandedNama((current) => (current === nama ? null : nama))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Peminjaman Alat</h1>
          <p className="mt-1 text-sm text-gray-500">
            Halo {user?.nama}, ajukan peminjaman alat di sini. Pengajuan harus disetujui laboran sebelum alat bisa
            diambil.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Ajukan Peminjaman
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <h2 className="mt-8 text-xl font-bold">Pengajuan Peminjamanmu</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Diajukan</th>
              <th className="px-4 py-3">Keperluan</th>
              <th className="px-4 py-3">Alat</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Memuat...
                </td>
              </tr>
            ) : peminjamanList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Kamu belum mengajukan peminjaman alat.
                </td>
              </tr>
            ) : (
              peminjamanList.map((peminjaman) => (
                <tr key={peminjaman.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                    {formatWaktu(peminjaman.dibuat_pada)}
                  </td>
                  <td className="max-w-48 px-4 py-3">{peminjaman.keperluan}</td>
                  <td className="px-4 py-3">
                    <ul className="space-y-0.5">
                      {peminjaman.items.map((item) => (
                        <li key={item.id} className="text-gray-600">
                          <span className="font-mono text-xs">{item.inventaris}</span>{' '}
                          {item.nama_alat ?? '-'} ×{item.jumlah}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_BADGE_CLASSES[peminjaman.status]
                      }`}
                    >
                      {STATUS_LABELS[peminjaman.status]}
                    </span>
                    {peminjaman.status === 'ditolak' && peminjaman.catatan && (
                      <span className="mt-1 block text-xs text-red-600">Alasan: {peminjaman.catatan}</span>
                    )}
                    {peminjaman.status === 'disetujui' && peminjaman.returned_at === null && (
                      <span className="mt-1 block text-xs text-gray-500">
                        Ambil alat di lab, lalu kembalikan setelah selesai.
                      </span>
                    )}
                    {peminjaman.returned_at !== null && (
                      <span className="mt-1 block text-xs text-gray-500">
                        Dikembalikan {formatWaktu(peminjaman.returned_at)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {peminjamanMeta && peminjamanMeta.last_page > 1 && (
        <Pagination
          page={peminjamanPage}
          meta={peminjamanMeta}
          onChange={setPeminjamanPage}
        />
      )}

      <h2 className="mt-10 text-xl font-bold">Katalog Alat Lab</h2>
      <div className="mt-4 divide-y overflow-hidden rounded-lg border bg-white">
        {isLoading ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">Memuat...</p>
        ) : katalog.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">Belum ada data alat.</p>
        ) : (
          katalog.map((grup) => {
            const isExpanded = expandedNama === grup.nama_alat

            return (
              <div key={grup.nama_alat}>
                <button
                  onClick={() => toggleExpand(grup.nama_alat)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                >
                  <div>
                    <span className="font-medium">{grup.nama_alat}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {grup.jumlah_tersedia}/{grup.jumlah_unit} unit tersedia
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {isExpanded && (
                  <div className="overflow-x-auto border-t bg-gray-50/50">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-2.5">Inventaris</th>
                          <th className="px-4 py-2.5">Merk</th>
                          <th className="px-4 py-2.5">Tipe</th>
                          <th className="px-4 py-2.5">Serial Number</th>
                          <th className="px-4 py-2.5">Ketersediaan</th>
                          <th className="px-4 py-2.5">Kondisi</th>
                          <th className="px-4 py-2.5 text-right">Detail</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {grup.items.map((alat) => (
                          <tr key={alat.id} className="hover:bg-white">
                            <td className="px-4 py-2.5 font-mono">{alat.inventaris}</td>
                            <td className="px-4 py-2.5">{alat.merk}</td>
                            <td className="px-4 py-2.5">{alat.tipe}</td>
                            <td className="px-4 py-2.5 font-mono text-gray-600">{alat.serial_number}</td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                  KETERSEDIAAN_BADGE_CLASSES[alat.ketersediaan] ?? 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {KETERSEDIAAN_LABELS[alat.ketersediaan] ?? alat.ketersediaan}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-gray-600">{kondisiRingkas(alat) || '-'}</td>
                            <td className="px-4 py-2.5 text-right">
                              <button
                                onClick={() => setDetailTarget(alat)}
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                              >
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <h2 className="mt-10 text-xl font-bold">Riwayat Pergerakan Alat</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3">ID Log</th>
              <th className="px-4 py-3">Alat</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {!isLoading && logList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Kamu belum pernah meminjam alat.
                </td>
              </tr>
            ) : (
              logList.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatWaktu(log.waktu)}</td>
                  <td className="px-4 py-3 font-mono">{log.id_log}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono">{log.inventaris}</span>
                    <span className="block text-xs text-gray-500">{log.nama_alat ?? '-'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        log.status === 'keluar'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {log.status === 'keluar' ? 'Dipinjam' : 'Dikembalikan'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {logMeta && logMeta.last_page > 1 && <Pagination page={logPage} meta={logMeta} onChange={setLogPage} />}

      {isModalOpen && (
        <PeminjamanFormModal
          alatList={alatList}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => void handlePengajuanSuccess()}
        />
      )}

      {detailTarget && <AlatDetailModal alat={detailTarget} onClose={() => setDetailTarget(null)} />}
    </div>
  )
}

interface PaginationProps {
  page: number
  meta: AlatLogListMeta
  onChange: (page: number) => void
}

function Pagination({ page, meta, onChange }: PaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-md border px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span>
        Halaman {meta.current_page} / {meta.last_page}
      </span>
      <button
        disabled={page >= meta.last_page}
        onClick={() => onChange(page + 1)}
        className="rounded-md border px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Berikutnya
      </button>
    </div>
  )
}

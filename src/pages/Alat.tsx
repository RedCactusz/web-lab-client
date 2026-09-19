import { useCallback, useEffect, useState } from 'react'
import {
  alatService,
  ApiError,
  type Alat,
  type AlatLog,
  type AlatLogListMeta,
  type KetersediaanStatus,
} from '@/services'
import { useAuth } from '@/contexts/AuthContext'

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

export default function AlatPage() {
  const { user } = useAuth()
  const [alatList, setAlatList] = useState<Alat[]>([])
  const [logList, setLogList] = useState<AlatLog[]>([])
  const [logMeta, setLogMeta] = useState<AlatLogListMeta | null>(null)
  const [logPage, setLogPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadAlat = useCallback(async () => {
    const response = await alatService.getAll()
    setAlatList(response.data)
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

    Promise.all([loadAlat(), loadRiwayat(logPage)])
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Gagal memuat data alat.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [loadAlat, loadRiwayat, logPage])

  const handleAksi = async (alat: Alat, aksi: 'pinjam' | 'kembali') => {
    setBusyId(alat.id)
    setError(null)
    try {
      if (aksi === 'pinjam') {
        await alatService.pinjam(alat.id)
      } else {
        await alatService.kembali(alat.id)
      }
      await Promise.all([loadAlat(), loadRiwayat(1)])
      setLogPage(1)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Terjadi kesalahan.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Peminjaman Alat</h1>
      <p className="mt-1 text-sm text-gray-500">
        Halo {user?.nama}, pilih alat yang ingin kamu pinjam, lalu kembalikan setelah selesai.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-sm text-gray-500">Memuat...</p>
        ) : alatList.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada data alat.</p>
        ) : (
          alatList.map((alat) => (
            <div key={alat.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{alat.nama_alat}</p>
                  <p className="text-xs text-gray-500">
                    {alat.merk} {alat.tipe}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    KETERSEDIAAN_BADGE_CLASSES[alat.ketersediaan] ?? 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {KETERSEDIAAN_LABELS[alat.ketersediaan] ?? alat.ketersediaan}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-gray-500">{alat.inventaris}</p>
              <p className="text-xs text-gray-500">Lokasi: {alat.lokasi_penyimpanan}</p>
              {alat.ketersediaan === 'tersedia' ? (
                <button
                  disabled={busyId === alat.id}
                  onClick={() => void handleAksi(alat, 'pinjam')}
                  className="mt-3 w-full rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {busyId === alat.id ? 'Memproses...' : 'Pinjam'}
                </button>
              ) : alat.ketersediaan === 'dipinjam' ? (
                <button
                  disabled={busyId === alat.id}
                  onClick={() => void handleAksi(alat, 'kembali')}
                  className="mt-3 w-full rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {busyId === alat.id ? 'Memproses...' : 'Kembalikan'}
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>

      <h2 className="mt-10 text-xl font-bold">Riwayat Peminjamanmu</h2>
      <div className="mt-4 overflow-hidden rounded-lg border bg-white">
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
            {logList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Kamu belum pernah meminjam alat.
                </td>
              </tr>
            ) : (
              logList.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                    {new Date(log.waktu).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
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

      {logMeta && logMeta.last_page > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
          <button
            disabled={logPage <= 1}
            onClick={() => setLogPage((current) => current - 1)}
            className="rounded-md border px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span>
            Halaman {logMeta.current_page} / {logMeta.last_page}
          </span>
          <button
            disabled={logPage >= logMeta.last_page}
            onClick={() => setLogPage((current) => current + 1)}
            className="rounded-md border px-3 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}

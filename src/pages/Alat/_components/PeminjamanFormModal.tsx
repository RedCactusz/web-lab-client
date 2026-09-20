import { useEffect, useMemo, useState } from 'react'
import { ApiError, peminjamanService, type Alat, type PeminjamanOptions } from '@/services'

interface ItemRow {
  key: number
  alat_id: string
  jumlah: string
}

interface Props {
  alatList: Alat[]
  onClose: () => void
  onSuccess: () => void
}

export default function PeminjamanFormModal({ alatList, onClose, onSuccess }: Props) {
  const [options, setOptions] = useState<PeminjamanOptions | null>(null)
  const [keperluan, setKeperluan] = useState('')
  const [praktikumSlug, setPraktikumSlug] = useState('')
  const [rows, setRows] = useState<ItemRow[]>([{ key: 1, alat_id: '', jumlah: '1' }])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    peminjamanService
      .options()
      .then(setOptions)
      .catch(() => setError('Gagal memuat pilihan keperluan.'))
  }, [])

  const praktikumOptions = keperluan === 'praktikum' ? (options?.praktikum ?? []) : []

  const isFormValid = useMemo(() => {
    return (
      keperluan !== '' &&
      (keperluan !== 'praktikum' || praktikumSlug !== '') &&
      rows.length > 0 &&
      rows.every((row) => {
        if (row.alat_id === '') return false
        const alat = alatList.find((item) => item.id === Number(row.alat_id))
        const jumlah = Number(row.jumlah)
        return alat !== undefined && Number.isInteger(jumlah) && jumlah >= 1 && jumlah <= alat.jumlah
      })
    )
  }, [keperluan, praktikumSlug, rows, alatList])

  const updateRow = (key: number, patch: Partial<ItemRow>) => {
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)))
  }

  const addRow = () => {
    setRows((current) => [...current, { key: Math.max(0, ...current.map((row) => row.key)) + 1, alat_id: '', jumlah: '1' }])
  }

  const removeRow = (key: number) => {
    setRows((current) => current.filter((row) => row.key !== key))
  }

  const handleSubmit = async () => {
    if (!isFormValid || isSaving) return
    setIsSaving(true)
    setError(null)
    try {
      await peminjamanService.create({
        keperluan,
        ...(keperluan === 'praktikum' && { praktikum_slug: praktikumSlug }),
        items: rows.map((row) => ({ alat_id: Number(row.alat_id), jumlah: Number(row.jumlah) })),
      })
      onSuccess()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Terjadi kesalahan.')
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Ajukan Peminjaman Alat</h2>
        <p className="mt-1 text-xs text-gray-500">
          Pengajuan akan diperiksa oleh laboran. Statusnya bisa kamu lihat di daftar pengajuan.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-4">
          <label htmlFor="keperluan" className="text-sm font-medium">
            Keperluan
          </label>
          <select
            id="keperluan"
            value={keperluan}
            onChange={(event) => {
              setKeperluan(event.target.value)
              setPraktikumSlug('')
            }}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          >
            <option value="">Pilih keperluan...</option>
            {(options?.keperluan ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {keperluan === 'praktikum' && (
          <div className="mt-4">
            <label htmlFor="praktikum" className="text-sm font-medium">
              Praktikum
            </label>
            <select
              id="praktikum"
              value={praktikumSlug}
              onChange={(event) => setPraktikumSlug(event.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
            >
              <option value="">Pilih praktikum...</option>
              {praktikumOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
            {options !== null && praktikumOptions.length === 0 && (
              <p className="mt-1 text-xs text-gray-500">Kamu tidak terdaftar pada praktikum mana pun.</p>
            )}
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Alat</span>
            <button
              onClick={addRow}
              className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-gray-100"
            >
              + Tambah Alat
            </button>
          </div>

          <div className="mt-2 space-y-2">
            {rows.map((row) => {
              const selected = alatList.find((item) => item.id === Number(row.alat_id))
              const jumlahError =
                selected !== undefined && (Number(row.jumlah) < 1 || Number(row.jumlah) > selected.jumlah)

              return (
                <div key={row.key} className="flex items-start gap-2">
                  <select
                    value={row.alat_id}
                    onChange={(event) => updateRow(row.key, { alat_id: event.target.value })}
                    className="min-w-0 flex-1 rounded-md border px-2 py-1.5 text-sm focus:border-gray-400 focus:outline-none"
                  >
                    <option value="">Pilih alat...</option>
                    {alatList.map((item) => (
                      <option key={item.id} value={item.id} disabled={item.ketersediaan !== 'tersedia'}>
                        {item.nama_alat} ({item.inventaris})
                        {item.ketersediaan !== 'tersedia' ? ' — tidak tersedia' : ''}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    max={selected?.jumlah}
                    value={row.jumlah}
                    onChange={(event) => updateRow(row.key, { jumlah: event.target.value })}
                    className={`w-20 rounded-md border px-2 py-1.5 text-sm focus:outline-none ${
                      jumlahError ? 'border-red-400' : 'focus:border-gray-400'
                    }`}
                    aria-label="Jumlah"
                  />
                  <button
                    onClick={() => removeRow(row.key)}
                    disabled={rows.length === 1}
                    className="rounded-md border px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Hapus baris"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>

          {rows.some((row) => row.alat_id !== '') && (
            <p className="mt-1 text-xs text-gray-500">
              {rows
                .filter((row) => row.alat_id !== '')
                .map((row) => {
                  const alat = alatList.find((item) => item.id === Number(row.alat_id))
                  return alat ? `${alat.nama_alat}: maks ${alat.jumlah} unit` : null
                })
                .filter(Boolean)
                .join(' • ')}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={() => void handleSubmit()}
            disabled={!isFormValid || isSaving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </div>
      </div>
    </div>
  )
}

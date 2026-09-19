import { type Alat, type KetersediaanStatus } from '@/services'

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

const KONDISI_LABELS: Record<string, string> = {
  baik: 'Baik',
  rusak_ringan: 'Rusak Ringan',
  rusak_berat: 'Rusak Berat',
  maintenance: 'Maintenance',
}

const KONDISI_BADGE_CLASSES: Record<string, string> = {
  baik: 'bg-green-100 text-green-800',
  rusak_ringan: 'bg-yellow-100 text-yellow-800',
  rusak_berat: 'bg-red-100 text-red-800',
  maintenance: 'bg-blue-100 text-blue-800',
}

interface Props {
  alat: Alat
  onClose: () => void
}

export default function AlatDetailModal({ alat, onClose }: Props) {
  let unitCounter = 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold">{alat.nama_alat}</h2>
            <p className="text-sm text-gray-500">
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

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">No. Inventaris</dt>
            <dd className="font-mono">{alat.inventaris}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Serial Number</dt>
            <dd className="font-mono">{alat.serial_number}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Merk / Tipe</dt>
            <dd>
              {alat.merk} {alat.tipe}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Jumlah Unit</dt>
            <dd>{alat.jumlah}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Lokasi Penyimpanan</dt>
            <dd>{alat.lokasi_penyimpanan}</dd>
          </div>
        </dl>

        <h3 className="mt-5 text-sm font-bold">Kondisi</h3>
        <ul className="mt-2 space-y-2">
          {alat.kondisi.length === 0 ? (
            <li className="text-sm text-gray-500">Tidak ada data kondisi.</li>
          ) : (
            alat.kondisi.map((entry, index) => {
              const unitAwal = unitCounter + 1
              unitCounter += entry.jumlah
              const unitLabel = entry.jumlah === 1 ? `Unit ${unitAwal}` : `Unit ${unitAwal}–${unitCounter}`

              return (
                <li key={index} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{unitLabel}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        KONDISI_BADGE_CLASSES[entry.status] ?? 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {KONDISI_LABELS[entry.status] ?? entry.status}
                      {entry.jumlah > 1 && ` ×${entry.jumlah}`}
                    </span>
                  </div>
                  {entry.catatan.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {entry.catatan.map((catatan, catatanIndex) => (
                        <span
                          key={catatanIndex}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                        >
                          {catatan.komponen}: {catatan.keterangan}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              )
            })
          )}
        </ul>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

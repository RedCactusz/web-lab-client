import type { Column } from "@/app/components/tables/Table";
import type { Peminjaman, StatusPeminjaman, PeminjamanItem, PengembalianItem } from "@/app/types/peminjaman";

// Re-export for backward compatibility
export type { Peminjaman, PeminjamanItem };

const STATUS_CONFIG: Record<StatusPeminjaman, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  decline: { label: "Ditolak", className: "bg-red-100 text-red-800" },
  approved: { label: "Disetujui", className: "bg-blue-100 text-blue-800" },
  completed: { label: "Selesai", className: "bg-emerald-100 text-emerald-800" },
  miss: { label: "Miss", className: "bg-orange-100 text-orange-800" },
};

export function StatusBadge({ status }: { status: StatusPeminjaman }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

export const columnsPeminjaman: Column<Peminjaman>[] = [
  { key: "tanggal_pengajuan", header: "Tgl Pengajuan" },
  {key: "items",
    header: "Alat",
    render: (item) => {
      const hasRevisi = item.revised_items && item.revised_items.length > 0;
      return (
        <div className="space-y-0.5">
          {item.items.map((al, i) => {
            const revised = hasRevisi ? item.revised_items?.find((r) => r.nama_alat === al.nama_alat) : null;
            const isRejected = hasRevisi && !item.revised_items?.some((r) => r.nama_alat === al.nama_alat);
            const isQuantityChanged = revised && revised.jumlah !== al.jumlah;

            return (
              <div key={i} className="space-y-0">
                <div className="text-xs flex items-center gap-1">
                  <span className="font-medium text-gray-900">{al.nama_alat}</span>
                  <span className="text-gray-600">×{al.jumlah}</span>
                  {(isRejected || isQuantityChanged) && <span className="text-red-500 font-bold">(x)</span>}
                </div>
                {isQuantityChanged && (
                  <div className="text-xs flex items-center gap-1 pl-2">
                    <span className="font-medium text-gray-900">{al.nama_alat}</span>
                    <span className="text-gray-600">×{revised.jumlah}</span>
                    <span className="text-amber-600 font-bold">(*)</span>
                  </div>
                )}
              </div>
            );
          })}
          {hasRevisi &&
            item.revised_items
              ?.filter((r) => !item.items.some((al) => al.nama_alat === r.nama_alat))
              .map((r, i) => (
                <div key={`new-${i}`} className="text-xs flex items-center gap-1">
                  <span className="font-medium text-gray-900">{r.nama_alat}</span>
                  <span className="text-gray-600">×{r.jumlah}</span>
                  <span className="text-amber-600 font-bold">(*)</span>
                </div>
              ))}
        </div>
      );
    },
  },
  {key: "tanggal_pinjam",
    header: "Pinjam",
    render: (item) => (
      <div className="text-xs">
        <p className="font-medium text-gray-900">{item.tanggal_pinjam}</p>
        <p className="text-gray-600">{item.jam_pinjam}</p>
      </div>
    ),
  },
  {key: "tanggal_kembali",
    header: "Kembali",
    render: (item) => (
      <div className="text-xs">
        <p className="font-medium text-gray-900">{item.tanggal_kembali}</p>
        <p className="text-gray-600">{item.jam_kembali}</p>
      </div>
    ),
  },
  {key: "status",
    header: "Status",
    render: (item) => (
      <div className="space-y-1">
        <StatusBadge status={item.status} />
        {item.revised_items && item.revised_items.length > 0 && (
          <p className="text-[10px] text-amber-600 font-medium">* Direvisi</p>
        )}
      </div>
    ),
  },
  {key: "keperluan",
    header: "Keperluan",
    render: (item) => (
      <span className="text-xs text-gray-700">
        {item.keperluan === "lainnya" ? item.alasan_lainnya || "Lainnya" : item.keperluan}
      </span>
    ),
  },
];

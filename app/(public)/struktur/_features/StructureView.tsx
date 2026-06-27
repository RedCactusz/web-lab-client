import Image from 'next/image';
import { KEPALA_LAB, DOSEN_LAB, PRAKTIKUM_DATA } from "@/app/(public)/struktur/_contents/structureData";

const PRAKTIKUM_COLORS = [
  { border: "border-blue-600", ring: "ring-blue-100", bg: "bg-blue-50", text: "text-blue-700" },
  { border: "border-teal-600", ring: "ring-teal-100", bg: "bg-teal-50", text: "text-teal-700" },
  { border: "border-emerald-600", ring: "ring-emerald-100", bg: "bg-emerald-50", text: "text-emerald-700" },
  { border: "border-amber-600", ring: "ring-amber-100", bg: "bg-amber-50", text: "text-amber-700" },
];

function PersonCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 text-center transition-transform hover:scale-105">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-gray-100 object-cover"
      />
      <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
      <p className="text-xs text-gray-500">{role}</p>
    </div>
  );
}

function PengajarCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex flex-col items-center transition-transform hover:scale-105">
      <Image
        src={image}
        alt={name}
        width={56}
        height={56}
        className="w-14 h-14 rounded-full border-2 border-gray-100 object-cover"
      />
      <p className="text-xs text-gray-700 mt-1.5 text-center leading-tight max-w-[80px]">{name}</p>
    </div>
  );
}

export default function StructureView() {
  return (
    <div className="space-y-16">
      {/* Kepala Lab */}
      <section className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Kepala Laboratorium
        </h2>
        <PersonCard
          name={KEPALA_LAB.name}
          role={KEPALA_LAB.role}
          image={KEPALA_LAB.image}
        />
      </section>

      {/* Dosen Lab */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Dosen Lab
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {DOSEN_LAB.map((dosen, i) => (
            <PersonCard key={i} name={dosen.name} role={dosen.role} image={dosen.image} />
          ))}
        </div>
      </section>

      {/* Praktikum */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Pengajar Praktikum
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRAKTIKUM_DATA.map((praktikum, i) => {
            const c = PRAKTIKUM_COLORS[i % PRAKTIKUM_COLORS.length];
            return (
              <div
                key={praktikum.name}
                className={`bg-white rounded-2xl shadow-sm border-t-4 ${c.border} overflow-hidden`}
              >
                <div className={`${c.bg} px-5 py-3 border-b border-gray-100`}>
                  <h3 className={`font-bold text-sm ${c.text}`}>{praktikum.name}</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                    {praktikum.pengajar.map((p) => (
                      <PengajarCard key={p.name} name={p.name} image={p.image} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

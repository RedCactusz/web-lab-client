"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { publicService } from "@/app/services/publicService";

const PRAKTIKUM_COLORS = [
  { border: "border-blue-600", ring: "ring-blue-100", bg: "bg-blue-50", text: "text-blue-700" },
  { border: "border-teal-600", ring: "ring-teal-100", bg: "bg-teal-50", text: "text-teal-700" },
  { border: "border-emerald-600", ring: "ring-emerald-100", bg: "bg-emerald-50", text: "text-emerald-700" },
  { border: "border-amber-600", ring: "ring-amber-100", bg: "bg-amber-50", text: "text-amber-700" },
];

interface Person {
  name: string;
  role: string;
  image: string;
}

interface Pengajar {
  name: string;
  image: string;
}

interface PraktikumSection {
  name: string;
  pengajar: Pengajar[];
}

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
  const [kepalaLab, setKepalaLab] = useState<Person | null>(null);
  const [dosenLab, setDosenLab] = useState<Person[]>([]);
  const [praktikumData, setPraktikumData] = useState<PraktikumSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStructure() {
      try {
        setLoading(true);
        const data = await publicService.getStructure();

        // Transform flat array into hierarchical structure
        const kepalaLabItem = data.find(item => item.type === 'kepala_lab');
        const dosenLabItems = data.filter(item => item.type === 'dosen_lab');
        const praktikumSections = data.filter(item => item.type === 'praktikum_section');

        setKepalaLab(kepalaLabItem ? {
          name: kepalaLabItem.name || '',
          role: kepalaLabItem.role || '',
          image: kepalaLabItem.image || '/placeholder-person.svg',
        } : null);

        setDosenLab(dosenLabItems.map(item => ({
          name: item.name || '',
          role: item.role || '',
          image: item.image || '/placeholder-person.svg',
        })));

        setPraktikumData(praktikumSections.map(section => {
          const pengajar = data
            .filter(item => item.type === 'praktikum_pengajar' && item.parent_id === section.id)
            .map(p => ({
              name: p.name || '',
              image: p.image || '/placeholder-person.svg',
            }));

          return {
            name: section.section_name || '',
            pengajar,
          };
        }));

      } catch (err) {
        setError("Gagal memuat struktur organisasi. Silakan coba lagi nanti.");
        console.error("Error loading structure:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStructure();
  }, []);

  if (loading) {
    return (
      <div className="space-y-16">
        <div className="flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
          <div className="bg-white p-5 rounded-2xl w-64">
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mx-auto mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Kepala Lab */}
      {kepalaLab && (
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Kepala Laboratorium
          </h2>
          <PersonCard
            name={kepalaLab.name}
            role={kepalaLab.role}
            image={kepalaLab.image}
          />
        </section>
      )}

      {/* Dosen Lab */}
      {dosenLab.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Dosen Lab
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {dosenLab.map((dosen, i) => (
              <PersonCard key={i} name={dosen.name} role={dosen.role} image={dosen.image} />
            ))}
          </div>
        </section>
      )}

      {/* Praktikum */}
      {praktikumData.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Pengajar Praktikum
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {praktikumData.map((praktikum, i) => {
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
                      {praktikum.pengajar.map((p, pi) => (
                        <PengajarCard key={pi} name={p.name} image={p.image} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

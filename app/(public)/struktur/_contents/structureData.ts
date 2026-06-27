export interface Person {
  name: string;
  role: string;
  image: string;
}

export interface Pengajar {
  name: string;
  image: string;
}

export interface PraktikumSection {
  name: string;
  pengajar: Pengajar[];
}

export const KEPALA_LAB: Person = {
  name: "Nama Kepala Lab",
  role: "Kepala Laboratorium Terpadu",
  image: "/placeholder-person.svg",
};

export const DOSEN_LAB: Person[] = Array.from({ length: 6 }, (_, i) => ({
  name: `Nama Dosen Lab ${i + 1}`,
  role: "Dosen Lab",
  image: "/placeholder-person.svg",
}));

export const PRAKTIKUM_DATA: PraktikumSection[] = [
  {
    name: "Praktikum Survei Terestris 1",
    pengajar: [
      { name: "M. Rouf Indhra Dewa Sambodo, S.T.", image: "/structure/Sutris1_MRoufIndhraDewaSambodo.JPG" },
      { name: "Azzahra Nisrina Iskandariah", image: "/structure/Sutris1_AzzahraNisrinaIskandariah.JPG" },
      { name: "Dewi Tyas Utami", image: "/structure/Sutris1_DewiTyasUtami.JPG" },
      { name: "M. Luthfi Al Bukhori", image: "/structure/Sutris1_MLuthfiAlBukhori.JPG" },
      { name: "Rayhan Dwinata Putra", image: "/structure/Sutris1_RayhanDwinataPutra.JPG" },
    ],
  },
  {
    name: "Praktikum Survei Hidrografi",
    pengajar: [
      { name: "Raden Nur Azizah Afiati, S.T.", image: "/structure/Hidro_RadenNurAzizahAfiati.JPG" },
      { name: "Saud T.P. Pangaribuan, S.T.", image: "/structure/Hidro_SaudTPPangaribuan.JPG" },
    ],
  },
  {
    name: "Praktikum Survei Kadaster",
    pengajar: [
      { name: "Aldy Lois", image: "/structure/Kadaster_AldyLois.JPG" },
      { name: "Dimar Fatwa Laksono", image: "/structure/Kadaster_DimarFatwaLaksono.JPG" },
    ],
  },
  {
    name: "Praktikum Survei Ilmu Ukur Tambang",
    pengajar: [
      { name: "Aris Baha Sinaga", image: "/structure/Tambang_ArisBahaSinaga.JPG" },
      { name: "Devita", image: "/structure/Tambang_Devita.JPG" },
    ],
  },
];

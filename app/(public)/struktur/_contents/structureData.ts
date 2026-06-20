export interface Person {
  name: string;
  role: string;
  image: string;
}

export const STRUCTURE_DATA = {
  head: {
    name: "Prof. Dr. Ir. Nama Kepala Lab, M.T.",
    role: "Kepala Laboratorium Terpadu",
    image: "https://i.pravatar.cc/150?u=head",
  } as Person,
  supervisors: [
    { name: "Dr. Nama Supervisor 1, M.Sc.", role: "Supervisor Survei Terestris", image: "https://i.pravatar.cc/150?u=sup1" },
    { name: "Ir. Nama Supervisor 2, M.T.", role: "Supervisor Hidrografi", image: "https://i.pravatar.cc/150?u=sup2" },
  ] as Person[],
  assistants: [
    { name: "Nama Koordinator Asisten", role: "Koordinator Asisten Lab", image: "https://i.pravatar.cc/150?u=koor" },
    { name: "Asisten Spesialis 1", role: "Asisten Survei Terestris I", image: "https://i.pravatar.cc/150?u=as1" },
    { name: "Asisten Spesialis 2", role: "Asisten Survei Rekayasa", image: "https://i.pravatar.cc/150?u=as2" },
    { name: "Asisten Spesialis 3", role: "Asisten Survei Hidrografi", image: "https://i.pravatar.cc/150?u=as3" },
  ] as Person[],
};

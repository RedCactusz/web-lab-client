import { STRUCTURE_DATA } from "@/app/(public)/struktur/_contents/structureData";

export default function StructureView() {
  const { head, supervisors, assistants } = STRUCTURE_DATA;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-600 text-center w-64 transition-transform hover:scale-105">
          <img src={head.image} alt="" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-100" />
          <h3 className="font-bold text-gray-900">{head.name}</h3>
          <p className="text-sm text-gray-500">{head.role}</p>
        </div>
        <div className="absolute left-1/2 top-full h-12 w-0.5 bg-gray-300 -translate-x-1/2"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-0.5 bg-gray-300 hidden md:block"></div>
        {supervisors.map((sup, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-300 -translate-x-1/2 hidden md:block"></div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border-t-4 border-emerald-500 text-center w-56 transition-transform hover:scale-105">
              <img src={sup.image} alt="" className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-emerald-100" />
              <h3 className="font-semibold text-gray-900">{sup.name}</h3>
              <p className="text-xs text-gray-500">{sup.role}</p>
            </div>
            <div className="absolute left-1/2 top-full h-12 w-0.5 bg-gray-300 -translate-x-1/2"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {assistants.map((ast, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center transition-transform hover:scale-105">
            <img src={ast.image} alt="" className="w-14 h-14 rounded-full mx-auto mb-3 border-2 border-gray-100" />
            <h4 className="font-medium text-gray-900 text-sm">{ast.name}</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-tight">{ast.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

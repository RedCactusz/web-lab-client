import { PARTNERS } from "@/app/(public)/partners/_contents/partnersData";

export default function PartnersView() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {PARTNERS.map((partner) => (
        <div key={partner.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 group-hover:scale-110 transition-transform duration-300">
            <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{partner.name}</h3>
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{partner.category}</span>
        </div>
      ))}
    </div>
  );
}

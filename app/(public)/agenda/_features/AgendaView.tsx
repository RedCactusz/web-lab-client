import { AGENDA_ITEMS } from "@/app/(public)/agenda/_contents/agendaData";

export default function AgendaView() {
  return (
    <div className="space-y-6">
      {AGENDA_ITEMS.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-2xl border-l-4 border-blue-600 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-xl text-center min-w-[80px]">
              <span className="block text-xs font-bold uppercase">{item.date.split(" ")[1]}</span>
              <span className="block text-xl font-black">{item.date.split(" ")[0]}</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                {item.location} | {item.time}
              </p>
            </div>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline">Detail Event</button>
        </div>
      ))}
    </div>
  );
}

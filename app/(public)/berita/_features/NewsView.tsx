import { NEWS_ITEMS } from "@/app/(public)/berita/_contents/newsData";

export default function NewsView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {NEWS_ITEMS.map((news) => (
        <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <div className="h-48 overflow-hidden">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{news.category}</span>
              <span className="text-xs text-gray-400">{news.date}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">{news.title}</h3>
            <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1">
              Baca Selengkapnya &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

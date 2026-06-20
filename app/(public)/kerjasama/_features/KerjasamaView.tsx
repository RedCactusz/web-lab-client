import { KERJASAMA_CONTENT } from "@/app/(public)/kerjasama/_contents/kerjasamaData";

export default function KerjasamaView() {
  const { title, subtitle, visi, pillars } = KERJASAMA_CONTENT;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{visi.heading}</h2>
        <p className="text-gray-600 leading-relaxed">{visi.text}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, i) => (
          <div key={i} className={`p-6 ${pillar.bg} rounded-2xl border ${pillar.border}`}>
            <h3 className={`font-bold ${pillar.textTitle} mb-2`}>{pillar.title}</h3>
            <p className={`text-sm ${pillar.textDesc}`}>{pillar.description}</p>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Hubungi Kami untuk Kolaborasi</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="mailto:lab@univ.ac.id" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center">
            Kirim Proposal
          </a>
          <a href="tel:+6212345678" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-center">
            Hubungi Admin Lab
          </a>
        </div>
      </div>
    </div>
  );
}

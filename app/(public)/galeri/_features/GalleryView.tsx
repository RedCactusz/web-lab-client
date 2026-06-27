import Image from 'next/image';
import { GALLERY_IMAGES } from "@/app/(public)/galeri/_contents/galleryData";

export default function GalleryView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {GALLERY_IMAGES.map((img) => (
        <div key={img.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 aspect-video">
          <Image
            src={img.url}
            alt={img.title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
            <h3 className="text-white font-bold text-lg">{img.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

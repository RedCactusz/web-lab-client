"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { landingData } from '../_contents/landingData';

export default function LandingView() {
  const { hero, about, services, announcements, agenda, partners } = landingData;

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-light">
            {hero.description}
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link href={hero.ctaPrimary.href} className="inline-block bg-white text-blue-700 px-8 py-4 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition-all active:scale-95">
              {hero.ctaPrimary.text}
            </Link>
            <Link href={hero.ctaSecondary.href} className="inline-block bg-blue-600 text-white px-8 py-4 font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95">
              {hero.ctaSecondary.text}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DESKRIPSI LAB (About Us) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src={about.image}
              alt="Lab Equipment"
              width={800}
              height={600}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl hidden md:block shadow-xl">
              <p className="text-3xl font-black">{about.stats.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider">{about.stats.label}</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{about.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {about.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN / FITUR UTAMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Layanan Laboratorium</h2>
          <p className="text-gray-500 mt-2">Akses cepat ke berbagai fitur utama sistem informasi laboratorium kami.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition group">
              <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center ${service.textColor} font-bold text-lg mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              {service.href ? (
                <Link href={service.href} className="text-sm font-bold text-blue-600 hover:underline">
                  {service.linkText}
                </Link>
              ) : (
                <span className="text-xs text-gray-400 italic">{service.footerText}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. PENGUMUMAN & BERITA TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                📢 Pengumuman Terbaru
              </h2>
              <Link href="/berita" className="text-sm font-semibold text-blue-600 hover:underline">Lihat Semua</Link>
            </div>
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-start gap-4 hover:border-blue-300 transition">
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${ann.type === 'Penting' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {ann.type}
                    </span>
                    <h3 className="font-bold text-gray-900">{ann.title}</h3>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{ann.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Agenda */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda Terdekat</h2>
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              {agenda.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`${item.color} p-2 rounded-lg text-center min-w-[50px]`}>
                    <span className="block text-[10px] font-bold">{item.month}</span>
                    <span className="block text-lg font-black">{item.date}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/agenda" className="block text-center text-sm font-bold text-blue-600 pt-4 border-t border-gray-100 hover:underline">
                Lihat Kalender Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MITRA & KERJASAMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{partners.title}</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{partners.description}</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.items.map((partner, idx) => (
            <Image key={idx} src={partner.src} alt={partner.alt} width={48} height={48} className="h-12 object-contain" />
          ))}
        </div>
        <div className="mt-12">
          <Link href={partners.cta.href} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm">
            {partners.cta.text}
          </Link>
        </div>
      </section>
    </div>
  );
}

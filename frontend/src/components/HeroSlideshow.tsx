"use client";

import { useState, useEffect } from "react";
import { urlFor } from "../sanity/client";

interface HeroData {
  title: string;
  subtitle: string;
  images: Parameters<typeof urlFor>[0][];
}

export default function HeroSlideshow({ data }: { data: HeroData | null }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow logika
  useEffect(() => {
    if (!data?.images || data.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }, 5000); // Mijenjaj sliku svakih 5 sekundi

    return () => clearInterval(interval);
  }, [data?.images]);

  // Ako nemamo podataka, renderiramo "fallback" hero sekciju tamnih tonova
  if (!data || !data.images?.length) {
    return (
      <div className="relative w-full h-[70vh] md:h-[100vh] flex items-center justify-center bg-gray-900 overflow-hidden shadow-2xl border-b-4 border-purple-600 mb-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 tracking-tight drop-shadow-lg">
            GGZONE
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto uppercase tracking-widest font-semibold">
            Najbolje gaming iskustvo
          </p>
          <div className="mt-8">
            <span className="animate-pulse inline-block bg-purple-600 px-6 py-2 rounded-full text-sm font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              DODAJTE SLIKE U SANITY STUDIO
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[100vh] flex items-center justify-center bg-black overflow-hidden shadow-2xl mb-0 group">
      {/* Slike vizualno (Background) */}
      {data.images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(img).width(1920).height(1080).url()}
            alt={`Hero BG ${index}`}
            fetchPriority="high"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[10000ms]"
          />
        </div>
      ))}

      {/* Moderni Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#111] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent z-10" />

      {/* Sadržaj (Tekst) */}
      <div className="relative z-20 text-center px-4 mt-16 md:mt-24">
        {data.title && (
          <h1 className="font-heading text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] filter">
            {data.title}
          </h1>
        )}
        {data.subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium tracking-wide drop-shadow-md">
            {data.subtitle}
          </p>
        )}

        {/* Indikatori (Tockice pri dnu) */}
        {data.images.length > 1 && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {data.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-purple-500 w-8 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "bg-gray-500/50 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

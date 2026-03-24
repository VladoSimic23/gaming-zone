/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function WorkingHours({ data }: { data: any }) {
  if (!data) return null; // Ako nema podataka iz Sanityja, ne prikazuj sekciju.

  const days = [
    { key: "monday", label: "Ponedjeljak" },
    { key: "tuesday", label: "Utorak" },
    { key: "wednesday", label: "Srijeda" },
    { key: "thursday", label: "Četvrtak" },
    { key: "friday", label: "Petak" },
    { key: "saturday", label: "Subota" },
    { key: "sunday", label: "Nedjelja" },
  ];

  return (
    <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
        >
          Radno Vrijeme
        </h2>
        {data.title && (
          <p
            className="text-gray-500 mt-2"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            {data.title}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {days.map((day) => {
          const dayData = data[day.key];
          // Pretpostavljamo da radi ako eksplicitno nije stavljeno isOpen: false
          const isClosed = dayData?.isOpen === false;

          return (
            <div
              key={day.key}
              className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${
                isClosed
                  ? "bg-red-950/10 border-red-900/30"
                  : "bg-[#111] border-gray-800 hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              }`}
            >
              <span
                className={`text-lg font-bold ${isClosed ? "text-gray-600" : "text-gray-300"}`}
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {day.label}
              </span>

              <div className="flex items-center">
                {isClosed ? (
                  <span className="text-red-500/80 font-bold px-3 py-1 bg-red-500/10 rounded-lg text-sm border border-red-500/20 tracking-wider">
                    ZATVORENO
                  </span>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 font-bold px-3 py-1 bg-green-500/10 rounded-lg text-sm border border-green-500/20 tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {dayData?.openTime ? `${dayData.openTime}h` : "--:--"} -{" "}
                    {dayData?.closeTime ? `${dayData.closeTime}h` : "--:--"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

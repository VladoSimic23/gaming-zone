"use client";

import { useState, useEffect } from "react";
import { client } from "../sanity/client";

type Station = {
  _key: string;
  name: string;
  type: "pc" | "ps";
  status: "slobodan" | "zauzet" | "kvar";
};

export default function LiveSeatStatus() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const data = await client.fetch(`*[_type == "liveStatus"][0].stations`);
      if (data) {
        setStations(data);
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju statusa:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Osvježavanje svakih 30 sekundi
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && stations.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-12 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
        <p className="text-gray-400 text-sm animate-pulse">
          Učitavanje statusa...
        </p>
      </div>
    );
  }

  if (!stations || stations.length === 0) {
    return (
      <div className="mb-12 p-6 bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl text-center">
        <p className="text-gray-400">
          Trenutni status računala trenutno nije postavljen u sustavu.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-12 p-6 bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <h2
        className="text-2xl md:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-wider"
        style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
      >
        Trenutni Status Računala
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></span>
          <span className="text-gray-300 font-medium tracking-wide">
            Slobodno
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626]"></span>
          <span className="text-gray-300 font-medium tracking-wide">
            Zauzeto
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-600 shadow-[0_0_10px_#4b5563]"></span>
          <span className="text-gray-300 font-medium tracking-wide">
            Nije u funkciji
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {stations.map((seat) => {
          let bgClass = "";
          let textClass = "";
          let statusText = "";

          if (seat.status === "slobodan") {
            bgClass =
              "bg-green-950/30 border-green-500/50 shadow-[inset_0_0_20px_rgba(34,197,94,0.15)]";
            textClass = "text-green-400";
            statusText = "Dostupno";
          } else if (seat.status === "zauzet") {
            bgClass =
              "bg-red-950/30 border-red-600/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.15)]";
            textClass = "text-red-500";
            statusText = "Zauzeto";
          } else {
            bgClass =
              "bg-gray-900/50 border-gray-600/50 shadow-[inset_0_0_20px_rgba(75,85,99,0.2)] opacity-80";
            textClass = "text-gray-400";
            statusText = "Kvar";
          }

          return (
            <div
              key={seat._key}
              className={`relative flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${bgClass}`}
            >
              <div
                className={`absolute inset-0 rounded-xl blur-md -z-10 transition-opacity opacity-40 ${
                  seat.status === "zauzet"
                    ? "bg-red-600/20"
                    : seat.status === "slobodan"
                      ? "bg-green-500/20"
                      : "bg-gray-500/20"
                }`}
              ></div>

              {seat.type === "pc" ? (
                <svg
                  className={`w-10 h-10 md:w-14 md:h-14 mb-3 drop-shadow-lg ${textClass}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  className={`w-10 h-10 md:w-14 md:h-14 mb-3 drop-shadow-lg ${textClass}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.27.599.596.57 1.582-.132 3.141-.406 4.67-.81A.641.641 0 0021 16.5v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.27.599.596.57a48.039 48.039 0 00.642-5.056.656.656 0 00-.658-.663v0c-.355 0-.676.186-.959.401a1.647 1.647 0 01-1.003.349c-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401v0a.64.64 0 00.657-.643 48.39 48.39 0 00-4.163-.3.656.656 0 00-.658.663v0z"
                  />
                </svg>
              )}

              <span
                className={`text-lg md:text-xl font-bold ${textClass}`}
                style={{ fontFamily: "var(--font-chakra-petch, sans-serif)" }}
              >
                {seat.name}
              </span>

              <span
                className={`text-[10px] md:text-xs mt-1 uppercase font-bold tracking-widest ${textClass}`}
              >
                {statusText}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { urlFor } from "../sanity/client";

export interface PSGameDoc {
  _id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

interface PlaystationGamesListProps {
  games: PSGameDoc[] | null;
}

export default function PlaystationGamesList({
  games,
}: PlaystationGamesListProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#050510]/80 backdrop-blur-md border border-blue-900/30 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden mt-8">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex flex-col items-center mb-10 relative z-10">
        <h2
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 tracking-widest text-center"
          style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
        >
          PLAYSTATION IGRE
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <p
          className="mt-4 text-gray-400 text-center max-w-2xl"
          style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
        >
          Baci pogled na našu kolekciju PlayStation naslova i uživaj u vrhunskom
          gaming iskustvu na konzolama.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {games.map((game) => (
          <div
            key={game._id}
            className="group relative rounded-xl overflow-hidden cursor-pointer border border-blue-900/50 transition-all duration-500 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1 bg-[#0a0a1a]"
          >
            <div className="aspect-[4/5] relative w-full bg-gray-900 flex items-center justify-center">
              {game.image ? (
                <Image
                  src={urlFor(game.image).auto("format").fit("max").url()}
                  alt={game.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              ) : (
                <span className="text-blue-900">Nema slike</span>
              )}
              {/* Dark overlay for text readability, customized for blue theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-[#02020a]/40 to-transparent"></div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-1 transition-transform duration-500 group-hover:translate-y-0 text-center">
              <h3
                className="text-lg md:text-xl font-bold text-gray-200 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {game.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

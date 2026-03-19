"use client";

import Image from "next/image";
import { urlFor } from "../sanity/client";

export interface GameDoc {
  _id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

interface GamesListProps {
  games: GameDoc[] | null;
}

export default function GamesList({ games }: GamesListProps) {
  if (!games || games.length === 0) {
    return (
      <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <h2
          className="text-3xl font-bold text-gray-400 mb-4"
          style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
        >
          Popis Igara
        </h2>
        <p
          className="text-gray-500"
          style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
        >
          Trenutno nemamo unesenih igara. Provjerite malo kasnije!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-purple-900/30 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      <div className="flex flex-col items-center mb-12">
        <h2
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 tracking-widest text-center"
          style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
        >
          PC IGRE
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-4 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
        <p
          className="mt-4 text-gray-400 text-center max-w-2xl"
          style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
        >
          Najnoviji i najpopularniji naslovi spremni za igranje. Odaberi svog
          favorita i rezerviraj mjesto.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {games.map((game) => (
          <div
            key={game._id}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-gray-800 transition-all duration-500 hover:border-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:-translate-y-1 sm:hover:-translate-y-2 bg-[#0a0a1a]"
          >
            <div className="aspect-[4/5] sm:aspect-[3/4] relative w-full bg-gray-900 flex items-center justify-center">
              {game.image ? (
                <Image
                  src={urlFor(game.image).auto("format").fit("max").url()}
                  alt={game.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <span className="text-gray-600">Nema slike</span>
              )}
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70"></div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 transform translate-y-1 transition-transform duration-500 group-hover:translate-y-0 text-center">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 group-hover:text-fuchsia-300 transition-colors duration-300 tracking-wider"
                style={{
                  fontFamily: "var(--font-chakra, sans-serif)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                {game.title}
              </h3>
              <div className="w-0 h-[2px] bg-fuchsia-500 mt-2 transition-all duration-500 ease-out group-hover:w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

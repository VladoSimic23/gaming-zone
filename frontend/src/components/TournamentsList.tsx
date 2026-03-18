/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/client";

export default function TournamentsList({
  tournaments,
}: {
  tournaments: any[];
}) {
  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="w-full relative py-24 bg-gradient-to-b from-[#050505] via-[#1a0808] to-[#050505] overflow-hidden my-4">
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-red-900/30 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <h2
              className="text-3xl font-bold text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
            >
              Turniri
            </h2>
            <p
              className="text-gray-500"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Trenutno nema nadolazećih turnira.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative py-24 bg-gradient-to-b from-[#050505] via-[#1a0808] to-[#050505] overflow-hidden drop-shadow-xl mt-4">
      {/* Background glow effects for Tournaments - Red/Orange aesthetic */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-red-600/10 rounded-full filter blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full filter blur-[120px] opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-red-500/20 pb-6">
          <div>
            <h2
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 tracking-wider mb-2 drop-shadow-md"
              style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
            >
              Nadolazeći Turniri
            </h2>
            <p
              className="text-gray-400 text-sm md:text-base max-w-xl"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Prijavi se, natječi se i osvoji nagrade u najnovijim gaming
              turnirima.
            </p>
          </div>
          <Link
            href="/turniri"
            className="text-red-500 hover:text-red-400 font-bold transition-all uppercase text-sm border-b border-red-500/30 hover:border-red-400 pb-1 whitespace-nowrap flex items-center gap-2 group"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            Svi turniri
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tournaments.slice(0, 3).map((tournament) => (
            <Link
              key={tournament._id}
              href={`/turniri/${tournament.slug.current}`}
              className="group block relative rounded-2xl overflow-hidden bg-[#0d0d0d] shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-[420px] border border-white/5 hover:border-red-500/40"
            >
              <div className="h-[220px] w-full relative overflow-hidden flex-shrink-0">
                {tournament.mainImage ? (
                  <Image
                    src={urlFor(tournament.mainImage)
                      .width(800)
                      .height(450)
                      .url()}
                    alt={tournament.mainImage.alt || tournament.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-70 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-600">Nema slike</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-100"></div>
              </div>

              <div className="relative z-10 flex flex-col flex-grow px-6 pb-6 pt-2 justify-between">
                <div>
                  {tournament.startDate && (
                    <div
                      className="text-red-400 text-xs font-semibold mb-2 bg-red-500/10 inline-block px-2 py-1 rounded border border-red-500/20"
                      style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                    >
                      {new Date(tournament.startDate).toLocaleDateString(
                        "hr-HR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </div>
                  )}
                  <h3
                    className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors leading-snug line-clamp-3 drop-shadow-md mb-2"
                    style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                  >
                    {tournament.title}
                  </h3>
                </div>

                <div
                  className="mt-4 text-gray-500 group-hover:text-red-400 text-sm flex items-center font-semibold transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                >
                  Prijavi se
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

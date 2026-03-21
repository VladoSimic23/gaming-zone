/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/client";

export default function NewsSection({ news }: { news: any[] }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="w-full relative py-24 bg-gradient-to-b from-[#050505] via-[#081229] to-[#050505] overflow-hidden ">
      {/* Cool background glowing effects */}
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full filter blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full filter blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider mb-2 drop-shadow-md"
              style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
            >
              Novosti
            </h2>
            <p
              className="text-gray-400 text-sm md:text-base max-w-xl"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Najnovija događanja, turniri, akcije i bitne informacije iz
              ggZone-a.
            </p>
          </div>
          <Link
            href="/novosti"
            className="text-cyan-400 hover:text-cyan-300 font-bold transition-all uppercase text-sm border-b border-cyan-500/30 hover:border-cyan-300 pb-1 whitespace-nowrap flex items-center gap-2 group"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            Sve novosti
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {news.map((item, index) => {
            return (
              <Link
                key={item._id}
                href={`/novosti/${item.slug.current}`}
                className="group block relative rounded-2xl overflow-hidden bg-[#0d0d0d] shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2 flex-shrink-0 w-[85vw] md:w-auto flex flex-col h-[420px] border border-white/5 hover:border-cyan-500/40 snap-center"
              >
                {/* Oznaka rednog broja (Cool broj) */}
                <div
                  className="absolute top-4 left-4 z-20 flex items-center justify-center w-12 h-12 rounded-xl bg-[#0d0d0d]/80 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.4)] text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 font-black text-2xl"
                  style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                >
                  {index + 1}
                </div>

                <div className="h-[220px] w-full relative overflow-hidden flex-shrink-0">
                  {item.mainImage ? (
                    <Image
                      src={urlFor(item.mainImage).width(800).height(450).url()}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-70 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <span className="text-gray-600">Nema slike</span>
                    </div>
                  )}

                  {/* Gradijent koji blenda sliku sa donjim contentom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-100" />
                </div>

                <div className="relative z-10 flex flex-col flex-grow px-6 pb-6 pt-2 justify-between">
                  <div>
                    <div
                      className="flex items-center text-cyan-500 text-xs md:text-sm font-bold mb-3 space-x-2 uppercase tracking-widest"
                      style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>
                        {new Date(item.publishedAt).toLocaleDateString("hr-HR")}
                      </span>
                    </div>

                    <h3
                      className="font-bold text-xl text-gray-100 group-hover:text-white transition-colors leading-snug line-clamp-3 drop-shadow-md"
                      style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className="mt-4 text-gray-500 group-hover:text-cyan-400 text-sm flex items-center font-semibold transition-colors uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                  >
                    Pročitaj više
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

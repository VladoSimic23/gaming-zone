/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Turniri",
  description:
    "Pregled svih nadolazećih, trenutnih i prethodnih turnira u našoj igraonici. Prijavi se i pokaži tko je najbolji!",
  alternates: {
    canonical: "/turniri",
  },
};

export default async function TurniriPage() {
  const tournaments = await client.fetch(
    `*[_type == "tournament"] | order(startDate desc)`,
    {},
    { next: { revalidate: 30 } },
  );

  const now = new Date();

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans py-24 px-4 md:px-8 mt-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            Svi Turniri
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            Pregled svih nadolazećih, trenutnih i prethodnih turnira u našoj
            igraonici. Prijavi se i pokaži tko je najbolji!
          </p>
        </div>

        {tournaments.length === 0 ? (
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <p
              className="text-gray-500 text-xl"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Trenutno nema dostupnih turnira.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament: any) => (
              <Link
                key={tournament._id}
                href={`/turniri/${tournament.slug.current}`}
                className="group block relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gray-800 hover:border-red-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.2)] hover:-translate-y-2"
              >
                <div className="aspect-video w-full relative overflow-hidden">
                  {tournament.mainImage ? (
                    <Image
                      src={urlFor(tournament.mainImage)
                        .width(800)
                        .height(450)
                        .url()}
                      alt={tournament.mainImage.alt || tournament.title}
                      fill
                      fetchPriority="high"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <span className="text-gray-600">Nema slike</span>
                    </div>
                  )}
                  {/* Overlay gradijent i tekst */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {tournament.startDate &&
                    new Date(tournament.startDate) < now && (
                      <div
                        className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10 shadow-lg uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                      >
                        Završeno
                      </div>
                    )}

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    {tournament.startDate && (
                      <div
                        className="text-red-400 text-xs font-semibold mb-2 bg-red-500/10 inline-block px-2 py-1 rounded border border-red-500/20"
                        style={{
                          fontFamily: "var(--font-chakra, sans-serif)",
                          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {new Date(tournament.startDate).toLocaleDateString(
                          "hr-HR",
                          {
                            timeZone: "Europe/Zagreb",
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
                      className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors"
                      style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                    >
                      {tournament.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-block border border-gray-700 hover:border-red-500 text-gray-300 hover:text-red-400 px-6 py-3 rounded-lg transition-all"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            ← Povratak na naslovnicu
          </Link>
        </div>
      </div>
    </main>
  );
}

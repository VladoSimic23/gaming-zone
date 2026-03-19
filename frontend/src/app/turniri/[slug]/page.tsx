/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Prilagođene komponente za PortableText kako bismo ga stilizirali
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full max-w-3xl mx-auto my-8 aspect-video rounded-xl overflow-hidden border border-gray-800 shadow-lg">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Slika u tekstu"}
            fill
            className="object-contain bg-black/50"
            priority
            fetchPriority="high"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-center text-sm text-gray-300">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        className="text-4xl font-bold text-red-500 mb-6 mt-10"
        style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className="text-3xl font-bold text-gray-200 mb-5 mt-8 border-b border-gray-800 pb-2"
        style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-gray-300 mb-4 mt-6">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-400 leading-relaxed mb-6 text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-red-500 pl-4 py-2 my-6 italic text-gray-300 bg-red-500/10 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-400 mb-6 ml-4 space-y-2 text-lg marker:text-red-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-400 mb-6 ml-4 space-y-2 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-300">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-red-400 hover:text-red-300 underline decoration-red-500/30 hover:decoration-red-500 transition-all"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tournament = await client.fetch(
    `*[_type == "tournament" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 30 } },
  );

  if (!tournament) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans pb-24">
      {/* Hero sekcija za turnir */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-black border-b border-red-500/30">
        {tournament.mainImage ? (
          <>
            <Image
              src={urlFor(tournament.mainImage).width(1920).height(1080).url()}
              alt={tournament.mainImage.alt || tournament.title}
              fill
              className="object-cover opacity-60"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-[#111]"></div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto md:left-1/2 md:-translate-x-1/2 flex flex-col items-start mt-12">
          <Link
            href="/turniri"
            className="inline-flex items-center text-red-500 hover:text-red-400 mb-8 font-bold uppercase tracking-wider text-sm transition-colors"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            ← Svi turniri
          </Link>
          {tournament.startDate && (
            <div
              className="text-red-400 text-sm md:text-base font-semibold mb-3 bg-red-500/20 inline-block px-3 py-1 rounded-md border border-red-500/30 backdrop-blur-sm"
              style={{
                fontFamily: "var(--font-chakra, sans-serif)",
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {new Date(tournament.startDate).toLocaleDateString("hr-HR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
          <h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,0,0,1)]"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            {tournament.title}
          </h1>
        </div>
      </div>

      {/* Sadržaj turnira */}
      {/* Smanjen negativni margin (-mt-8 na md:-mt-8) i dodan padding bottom na hero sekciju */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-4 md:-mt-8 relative z-10">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-gray-800 rounded-3xl p-6 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          {tournament.details ? (
            <div
              className="prose prose-invert max-w-none"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              <PortableText
                value={tournament.details}
                components={ptComponents}
              />
            </div>
          ) : (
            <p
              className="text-gray-500 text-center py-12 text-xl"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Trenutno nema objavljenih detalja za ovaj turnir.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

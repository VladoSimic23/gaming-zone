/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const newsItem = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0]`,
    { slug },
  );

  if (!newsItem) {
    return {
      title: "Novost nije pronađena | ggZone",
      description: "Tražena novost ne postoji.",
    };
  }

  const title = `${newsItem.title} | ggZone`;
  const description = `Pročitajte više o "${newsItem.title}" na ggZone portalu. Najnovije vijesti i događanja.`;
  const imageUrl = newsItem.mainImage
    ? urlFor(newsItem.mainImage).width(1200).height(630).url()
    : "/images/og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `/novosti/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `http://www.gggamingzone.com/novosti/${slug}`,
      type: "article",
      publishedTime: newsItem.publishedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Prilagođene komponente za PortableText kako bismo ga stilizirali (isto kao u turnirima)
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      // Izvuci prirodne dimenzije slike iz Sanity _ref stringa (npr. image-abc-800x600-png) kako bismo izbjegli layout shift
      let imgWidth = 1600;
      let imgHeight = 900;
      const refMatch = value.asset._ref.match(/-(\d+)x(\d+)-/);
      if (refMatch) {
        imgWidth = parseInt(refMatch[1], 10);
        imgHeight = parseInt(refMatch[2], 10);
      }

      return (
        <div className="relative w-full my-10 md:my-14 rounded-none md:rounded-2xl overflow-hidden border-y md:border border-gray-800 shadow-2xl flex justify-center bg-[#111]">
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value.alt || "Slika uz vijest"}
            width={imgWidth}
            height={imgHeight}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, 1600px"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        className="text-4xl font-bold text-blue-500 mb-6 mt-10"
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
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-300 bg-blue-500/10 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-400 mb-6 ml-4 space-y-2 text-lg marker:text-blue-500">
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
        className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const newsItem = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 30 } },
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans pb-24 mt-12">
      {/* Hero sekcija vijesti */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black border-b border-blue-500/30">
        {newsItem.mainImage ? (
          <>
            <Image
              src={urlFor(newsItem.mainImage).width(1920).height(1080).url()}
              alt={newsItem.title}
              fill
              className="object-cover opacity-50"
              fetchPriority="high"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-[#111]"></div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto md:left-1/2 md:-translate-x-1/2">
          <Link
            href="/novosti"
            className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4 font-bold uppercase tracking-wider text-sm transition-colors"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            ← Sve novosti
          </Link>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4 drop-shadow-md"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            {newsItem.title}
          </h1>
          <div
            className="flex items-center text-blue-400 font-medium"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {new Date(newsItem.publishedAt).toLocaleDateString("hr-HR")}
          </div>
        </div>
      </div>

      {/* Sadržaj Novosti */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 md:p-12">
          {newsItem.body ? (
            <div
              className="prose prose-invert max-w-none"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              <PortableText value={newsItem.body} components={ptComponents} />
            </div>
          ) : (
            <p
              className="text-gray-500 py-6 text-lg"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Nema dodatnog teksta za ovu objavu.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

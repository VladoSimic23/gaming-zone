/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, urlFor } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

export default async function NovostiPage() {
  const news = await client.fetch(
    `*[_type == "news"] | order(publishedAt desc)`,
    {},
    { next: { revalidate: 30 } },
  );

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans mt-12 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            Sve Novosti
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            Pratite najnovije obavijesti, događanja i promjene u našoj igraonici
          </p>
        </div>

        {news.length === 0 ? (
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <p
              className="text-gray-500 text-xl"
              style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
            >
              Trenutno nema objavljenih novosti.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <Link
                key={item._id}
                href={`/novosti/${item.slug.current}`}
                className="group block relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:-translate-y-2 flex flex-col"
              >
                <div className="aspect-video w-full relative overflow-hidden flex-shrink-0">
                  {item.mainImage ? (
                    <Image
                      src={urlFor(item.mainImage).width(800).height(450).url()}
                      alt={item.title}
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
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#1a1a1a] to-[#111]">
                  <h3
                    className="text-2xl font-bold text-gray-200 group-hover:text-blue-400 transition-colors mb-4"
                    style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                  >
                    {item.title}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
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
                    {new Date(item.publishedAt).toLocaleDateString("hr-HR")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-block border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-blue-400 px-6 py-3 rounded-lg transition-all"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            ← Povratak na naslovnicu
          </Link>
        </div>
      </div>
    </main>
  );
}

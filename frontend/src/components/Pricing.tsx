/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Pricing({ data }: { data: any }) {
  if (!data) return null;

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number") return "---";
    return `${price.toFixed(2)} KM`;
  };

  return (
    <div className="w-full relative py-12 md:py-16 bg-gradient-to-b from-[#050505] via-[#081210] to-[#050505] overflow-hidden drop-shadow-xl ">
      {/* Background glow effects - Emerald/Blue aesthetic for Pricing */}
      <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-emerald-600/10 rounded-full filter blur-[140px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-blue-600/10 rounded-full filter blur-[140px] opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        <div className="text-center border-b border-white/5 pb-8">
          <h2
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-wider mb-4 drop-shadow-md uppercase"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            Cjenik
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            Pregled cijena igranja, snackova i pića
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* PC Cijene (Top Left) */}
          {data.pcPricing && (
            <div className="bg-[#0d131f]/80 backdrop-blur-md border border-blue-900/30 rounded-2xl p-8 shadow-[0_4px_30px_rgba(59,130,246,0.1)] hover:border-blue-500/50 hover:bg-[#0f1725] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6 border-b border-blue-900/30 pb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-100 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                >
                  PC Gaming
                </h3>
              </div>

              <div
                className="space-y-4 flex-1"
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {data.pcPricing.perHour && (
                  <div className="flex justify-between items-center bg-[#05080f] p-5 rounded-xl border border-blue-900/40">
                    <span className="text-base md:text-lg text-gray-300 uppercase tracking-widest font-semibold">
                      Cijena po satu
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                      {formatPrice(data.pcPricing.perHour)}
                    </span>
                  </div>
                )}

                {data.pcPricing.packages &&
                  data.pcPricing.packages.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-blue-500/80 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="h-px bg-blue-900/50 flex-1"></span>
                        Paketi
                        <span className="h-px bg-blue-900/50 flex-1"></span>
                      </h4>
                      <div className="space-y-3">
                        {data.pcPricing.packages.map(
                          (pkg: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center border-b border-blue-900/20 border-dashed pb-3 last:border-0 hover:bg-blue-500/5 p-2 rounded transition-colors"
                            >
                              <span className="text-sm md:text-base text-gray-300 font-medium">
                                {pkg.name}
                              </span>
                              <span className="text-sm md:text-base font-bold text-white tracking-wider">
                                {formatPrice(pkg.price)}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* PS Cijene (Top Right) */}
          {data.psPricing && (
            <div className="bg-[#120a1c]/80 backdrop-blur-md border border-purple-900/30 rounded-2xl p-8 shadow-[0_4px_30px_rgba(168,85,247,0.1)] hover:border-purple-500/50 hover:bg-[#160c22] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6 border-b border-purple-900/30 pb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="6"
                      width="20"
                      height="12"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M6 12h4m-2-2v4"></path>
                    <circle cx="15" cy="11" r="1"></circle>
                    <circle cx="18" cy="13" r="1"></circle>
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-100 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                >
                  PlayStation
                </h3>
              </div>

              <div
                className="space-y-4 flex-1"
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {data.psPricing.perHour && (
                  <div className="flex justify-between items-center bg-[#07040a] p-5 rounded-xl border border-purple-900/40">
                    <span className="text-base md:text-lg text-gray-300 uppercase tracking-widest font-semibold">
                      Cijena po satu
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                      {formatPrice(data.psPricing.perHour)}
                    </span>
                  </div>
                )}

                {data.psPricing.packages &&
                  data.psPricing.packages.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-purple-500/80 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="h-px bg-purple-900/50 flex-1"></span>
                        Paketi
                        <span className="h-px bg-purple-900/50 flex-1"></span>
                      </h4>
                      <div className="space-y-3">
                        {data.psPricing.packages.map(
                          (pkg: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center border-b border-purple-900/20 border-dashed pb-3 last:border-0 hover:bg-purple-500/5 p-2 rounded transition-colors"
                            >
                              <span className="text-sm md:text-base text-gray-300 font-medium">
                                {pkg.name}
                              </span>
                              <span className="text-sm md:text-base font-bold text-white tracking-wider">
                                {formatPrice(pkg.price)}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Pića (Bottom Left) */}
          {data.drinks && data.drinks.length > 0 && (
            <div className="bg-[#081510]/80 backdrop-blur-md border border-emerald-900/30 rounded-2xl p-8 shadow-[0_4px_30px_rgba(16,185,129,0.05)] hover:border-emerald-500/40 hover:bg-[#0a1a14] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6 border-b border-emerald-900/30 pb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-100 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                >
                  Pića
                </h3>
              </div>

              <div
                className="flex-1 space-y-4"
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {data.drinks.map((drink: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-emerald-900/20 pb-2 group"
                  >
                    <span className="text-gray-400 text-base md:text-base group-hover:text-gray-200 transition-colors">
                      {drink.name}
                    </span>
                    <span className="text-base md:text-base font-bold text-emerald-400">
                      {formatPrice(drink.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Snacks (Bottom Right) */}
          {data.snacks && data.snacks.length > 0 && (
            <div className="bg-[#1a1405]/80 backdrop-blur-md border border-yellow-900/30 rounded-2xl p-8 shadow-[0_4px_30px_rgba(234,179,8,0.05)] hover:border-yellow-500/40 hover:bg-[#1c160a] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6 border-b border-yellow-900/30 pb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400 border border-yellow-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-100 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
                >
                  Grickalice
                </h3>
              </div>

              <div
                className="flex-1 space-y-4"
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                {data.snacks.map((snack: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-yellow-900/20 pb-2 group"
                  >
                    <span className="text-gray-400 text-base md:text-base group-hover:text-gray-200 transition-colors">
                      {snack.name}
                    </span>
                    <span className="text-base md:text-base font-bold text-yellow-400">
                      {formatPrice(snack.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

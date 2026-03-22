import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-purple-900/50 py-12  relative overflow-hidden">
      {/* Cool glowing background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-10 z-10 relative">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="Početna"
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-[var(--font-orbitron)] tracking-wider"
          >
            <span
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 hidden sm:block"
              style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
            >
              ggZone
            </span>
          </Link>
          <p className="mt-2 text-gray-400 font-[var(--font-chakra)] text-sm uppercase tracking-widest">
            Level up your game
          </p>
        </div>

        {/* Info Links */}
        <div className="flex flex-col md:flex-row justify-center gap-8 lg:gap-12 items-center text-gray-300 font-[var(--font-chakra)]">
          {/* Location */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 shrink-0 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-400 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <a
              href="https://maps.google.com/?q=Ulica+dr.+Franje+Tudjmana+8B,+Grude+88340"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors text-left leading-tight"
            >
              Ulica dr. Franje Tuđmana 8B
              <br />
              <span className="text-sm text-gray-500">Grude 88340</span>
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 shrink-0 rounded-full bg-pink-900/30 border border-pink-500/30 flex items-center justify-center group-hover:border-pink-400 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.15)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-400 group-hover:text-pink-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <a
              href="tel:063740656"
              className="font-bold tracking-widest text-xl hover:text-pink-300 transition-colors"
            >
              063-740-656
            </a>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-4 group">
            <a
              href="https://www.instagram.com/gg.grude/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-shadow">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
              </div>
              <span className="font-bold tracking-wider text-lg hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all">
                @gg.grude
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-purple-900/30 pt-6 text-center text-xs text-gray-500 font-[var(--font-chakra)] uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ggZone Grude. Sva prava pridržana.
      </div>
    </footer>
  );
}

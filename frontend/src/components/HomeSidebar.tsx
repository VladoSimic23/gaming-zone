"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  {
    id: "novosti",
    label: "Novosti",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h2m-2 4h2m-6 4h4" />
      </svg>
    ),
  },
  {
    id: "status",
    label: "Status računala",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "rezervacije",
    label: "Rezervacije",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "radno-vrijeme",
    label: "Radno vrijeme",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "igre",
    label: "Igre",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" />
        <line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: "turniri",
    label: "Turniri",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },

  {
    id: "cjenik",
    label: "Cjenik",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

export default function HomeSidebar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Scrollspy logika - IntersectionObserver je najstabilnije i preciznije rješenje.
    const observer = new IntersectionObserver(
      (entries) => {
        // Obično ćemo iterirati kroz promijenjene entrije
        // Pronalazimo one koji se zapravo vide
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // rootMargin određuje kad "okida" vidljivost.
        // negativan top i bottom margin forsira da komponenta mora ući u "središnji" dio ekrana
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1, // aktivirat će se čim bar malo (10%) sekcije uđe na taj ograničeni dio
      },
    );

    // Registracija elemenata u observer
    SECTIONS.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Očisti stare handlere
      SECTIONS.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 left-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-sidebar ${
          isCollapsed ? "-translate-x-[calc(100%-2rem)]" : "translate-x-0"
        }`}
      >
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-800/80 rounded-r-3xl p-4 pr-12 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative flex flex-col gap-4">
          <div className="mb-4 pl-2">
            <span
              className="text-cyan-500 font-bold uppercase tracking-widest text-xs"
              style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
            >
              Meni
            </span>
          </div>

          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
              >
                <div
                  className={`${isActive ? "text-cyan-400" : "text-gray-500"}`}
                >
                  {section.icon}
                </div>
                <span className="font-semibold">{section.label}</span>
              </button>
            );
          })}

          {/* Toggle Button for Desktop */}
          <button
            aria-label={isCollapsed ? "Proširi sidebar" : "Skupi sidebar"}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-[#1a1a1a] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:text-cyan-300 w-8 h-16 rounded-full flex items-center justify-center transition-all duration-300 z-50 focus:outline-none focus:ring-0"
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="translate-x-[1px]"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="translate-x-[-1px]"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE FAB & OVERLAY MENU */}
      <div className="md:hidden">
        {/* Floating Action Button */}
        <button
          aria-label="Otvori navigaciju"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-transform duration-300 ${isMobileOpen ? "scale-0" : "scale-100"}`}
        >
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
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {/* Fullscreen Mobile Overlay Menu */}
        <div
          className={`fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-500 ease-in-out flex flex-col justify-center items-center ${
            isMobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Odluka da ga gasimo sa "X" u istom uglu */}
          <button
            aria-label="Zatvori navigaciju"
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 rounded-full"
          >
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <h3
            className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold mb-10"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            Brzi Skok
          </h3>

          <div className="flex flex-col gap-4 w-full px-8 max-w-sm">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center gap-6 px-6 py-4 rounded-2xl transition-all duration-300 w-full text-left ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      : "text-gray-300 bg-[#111] border border-gray-800"
                  }`}
                  style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
                >
                  <div
                    className={`${isActive ? "text-cyan-400" : "text-gray-500"} scale-125`}
                  >
                    {section.icon}
                  </div>
                  <span className="text-xl font-semibold">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

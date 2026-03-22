"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Novosti", href: "/novosti" },
    { name: "Turniri", href: "/turniri" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsMobileMenuOpen(false); // Zatvori menu nakon klika

    // Ako link vodi na hash unutar iste stranice (npr. #status), dodajemo smooth scroll
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Dodajemo mali offset zbog fixed navbar-a
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-cyan-500/20 py-2 shadow-[0_4px_20px_rgba(0,255,255,0.1)]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Početna"
          className="flex items-center gap-3 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            {/* Ovdje direktno učitavamo sliku iz public foldera ili odakle god Next.js može uzeti */}
            <Image
              src="/logo.png"
              alt="ggZone Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>
          <span
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 hidden sm:block"
            style={{ fontFamily: "var(--font-orbitron, sans-serif)" }}
          >
            ggZone
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul
          className="hidden lg:flex gap-8 items-center"
          style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 text-lg uppercase tracking-wider font-semibold transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Phone Number */}
          <li className="ml-4 border-l border-gray-700 pl-8">
            <a
              href="tel:063740656"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group text-lg font-semibold tracking-wider"
            >
              <svg
                className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              063-740-656
            </a>
          </li>
          {/* Instagram Icon */}
          <li className="ml-4 border-l border-gray-700 pl-8">
            <a
              href="https://www.instagram.com/gg.grude/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-fuchsia-500 transition-all duration-300 flex items-center group"
            >
              <svg
                className="w-8 h-8 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(217,70,239,0.8)] transition-all duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button - Hamburger */}
        <button
          aria-label={isMobileMenuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          className="lg:hidden text-cyan-400 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <ul
            className="flex flex-col items-center py-6 w-full"
            style={{ fontFamily: "var(--font-chakra, sans-serif)" }}
          >
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="w-full border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors"
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-gray-300 text-xl uppercase tracking-wider font-semibold block w-full text-center py-3 hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Phone Number */}
            <li className="w-full border-b border-gray-800/50 hover:bg-white/5 transition-colors">
              <a
                href="tel:063740656"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 text-gray-300 text-xl font-semibold hover:text-cyan-400 transition-colors py-4 w-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                063-740-656
              </a>
            </li>

            {/* Mobile Instagram */}
            <li className="w-full hover:bg-white/5 transition-colors mt-2">
              <a
                href="https://www.instagram.com/gg.grude/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 text-gray-300 text-xl font-semibold hover:text-fuchsia-500 transition-colors py-4 w-full"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

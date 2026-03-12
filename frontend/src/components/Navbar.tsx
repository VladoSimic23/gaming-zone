'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Status računala', href: '#status' },
    { name: 'Rezervacije', href: '#rezervacije' },
    { name: 'Popis igara', href: '#igre' },
    { name: 'Turniri', href: '#turniri' },
    { name: 'Cjenik', href: '#cjenik' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Ako link vodi na hash unutar iste stranice (npr. #status), dodajemo smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const element = document.querySelector(href);
      if (element) {
        // Dodajemo mali offset zbog fixed navbar-a
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-cyan-500/20 py-2 shadow-[0_4px_20px_rgba(0,255,255,0.1)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            {/* Ovdje direktno učitavamo sliku iz public foldera ili odakle god Next.js može uzeti */}
            <Image src="/logo.png" alt="ggZone Logo" fill className="object-contain rounded-full" />
          </div>
          <span
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 hidden sm:block"
            style={{ fontFamily: 'var(--font-orbitron, sans-serif)' }}
          >
            ggZone
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center" style={{ fontFamily: 'var(--font-chakra, sans-serif)' }}>
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
        </ul>

        {/* Mobile Menu Button - Hamburger */}
        <button
          className="lg:hidden text-cyan-400 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <ul className="flex flex-col py-6" style={{ fontFamily: 'var(--font-chakra, sans-serif)' }}>
            {navLinks.map((link) => (
              <li key={link.name} className="px-6 py-3 border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors">
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-gray-300 text-xl uppercase tracking-wider font-semibold block w-full hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
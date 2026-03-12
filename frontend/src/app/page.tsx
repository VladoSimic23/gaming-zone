import ReservationForm from "../components/ReservationForm";
import HeroSlideshow from "../components/HeroSlideshow";
import LiveSeatStatus from "../components/LiveSeatStatus";
import GamesList from "../components/GamesList";
import { client } from "../sanity/client";

// Obzirom da je ovo Server Component, možemo direktno dohvatiti podatke prije rendera
export default async function Home() {
  // Dohvaća posljednji objavljeni "hero" dokument
  const heroData = await client.fetch(`*[_type == "hero"][0]`, {}, { next: { revalidate: 30 } });
  
  // Dohvaća se igre iz baze...
  const gamesData = await client.fetch(`*[_type == "game"] | order(_createdAt asc)`, {}, { next: { revalidate: 30 } });

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans">
      <HeroSlideshow data={heroData} />
      
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16">
        <section id="status" className="scroll-mt-24">
          <LiveSeatStatus />
        </section>
        
        <section id="rezervacije" className="scroll-mt-24">
          <ReservationForm />
        </section>

        {/* Prikaz dohvaćenih igara */}
        <section id="igre" className="scroll-mt-24">
          <GamesList games={gamesData} />
        </section>

        {/* Placeholders za buduće sekcije */}
        <section id="turniri" className="scroll-mt-24 bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <h2 className="text-3xl font-bold text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron, sans-serif)' }}>Turniri</h2>
          <p className="text-gray-500" style={{ fontFamily: 'var(--font-chakra, sans-serif)' }}>Ova sekcija će biti implementirana kasnije.</p>
        </section>

        <section id="cjenik" className="scroll-mt-24 bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(0,0,0,0.8)] mb-24">
          <h2 className="text-3xl font-bold text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron, sans-serif)' }}>Cjenik</h2>
          <p className="text-gray-500" style={{ fontFamily: 'var(--font-chakra, sans-serif)' }}>Ova sekcija će biti implementirana kasnije.</p>
        </section>
      </div>
    </main>
  );
}

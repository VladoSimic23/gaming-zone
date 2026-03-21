import ReservationForm from "../components/ReservationForm";
import HeroSlideshow from "../components/HeroSlideshow";
import LiveSeatStatus from "../components/LiveSeatStatus";
import GamesList from "../components/GamesList";
import PlaystationGamesList from "../components/PlaystationGamesList";
import TournamentsList from "../components/TournamentsList";
import WorkingHours from "../components/WorkingHours";
import Pricing from "../components/Pricing";
import NewsSection from "../components/NewsSection";
import HomeSidebar from "../components/HomeSidebar";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { client } from "../sanity/client";

// Obzirom da je ovo Server Component, možemo direktno dohvatiti podatke prije rendera
export default async function Home() {
  // Dohvaća posljednji objavljeni "hero" dokument
  const heroData = await client.fetch(
    `*[_type == "hero"][0]`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća se igre iz baze...
  const gamesData = await client.fetch(
    `*[_type == "game"] | order(_createdAt asc)`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća se PlayStation igre iz baze...
  const psGamesData = await client.fetch(
    `*[_type == "playstationGame"] | order(_createdAt asc)`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća turnire (zadnja 3 objavljena)
  const tournamentsData = await client.fetch(
    `*[_type == "tournament"] | order(_createdAt desc)[0...3]`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća novosti (zadnje 3 objavljene)
  const newsData = await client.fetch(
    `*[_type == "news"] | order(publishedAt desc)[0...3]`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća postavljeno radno vrijeme
  const workingHoursData = await client.fetch(
    `*[_type == "workingHours"][0]`,
    {},
    { next: { revalidate: 30 } },
  );

  // Dohvaća cjenik
  const pricingData = await client.fetch(
    `*[_type == "prices"][0]`,
    {},
    { next: { revalidate: 30 } },
  );

  return (
    <main className="min-h-screen bg-[#111] text-white font-sans relative">
      <HomeSidebar />

      {/* Hero bez scroll animacije jer je odmah na vrhu */}
      <HeroSlideshow data={heroData} />

      {/* Sekcija za novosti na punoj širini iznad glavnog wrappera */}
      <section id="novosti" className="w-full relative z-10">
        <AnimateOnScroll animation="fade-up" duration={1000}>
          <NewsSection news={newsData} />
        </AnimateOnScroll>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-16 md:space-y-24 relative z-10">
        <section id="status" className="scroll-mt-24">
          <AnimateOnScroll animation="scale-up" duration={800}>
            <LiveSeatStatus />
          </AnimateOnScroll>
        </section>

        <section id="rezervacije" className="scroll-mt-24">
          <AnimateOnScroll animation="slide-right" duration={800}>
            <ReservationForm />
          </AnimateOnScroll>
        </section>

        {/* Sekcija za radno vrijeme */}
        <section id="radno-vrijeme" className="scroll-mt-24">
          <AnimateOnScroll animation="slide-left" duration={800}>
            <WorkingHours data={workingHoursData} />
          </AnimateOnScroll>
        </section>

        {/* Prikaz dohvaćenih igara */}
        <section id="igre" className="scroll-mt-24 flex flex-col gap-12">
          <AnimateOnScroll animation="fade-up" duration={1000}>
            <GamesList games={gamesData} />
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={1000} delay={200}>
            <PlaystationGamesList games={psGamesData} />
          </AnimateOnScroll>
        </section>
      </div>

      {/* Sekcija za turnire */}
      <section id="turniri" className="w-full relative z-10">
        <AnimateOnScroll animation="scale-up" duration={1000}>
          <TournamentsList tournaments={tournamentsData} />
        </AnimateOnScroll>
      </section>

      {/* Sekcija za cjenik */}
      <section id="cjenik" className="w-full relative z-10">
        <AnimateOnScroll animation="fade-up" duration={1000}>
          <Pricing data={pricingData} />
        </AnimateOnScroll>
      </section>
    </main>
  );
}

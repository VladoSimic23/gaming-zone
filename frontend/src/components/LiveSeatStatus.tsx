'use client';

export default function LiveSeatStatus() {
  const seats = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    // Ovo su trenutno neki nasumično odabrani "zauzeti" računari samo za prikaz
    occupied: [2, 5, 7, 8].includes(i + 1)
  }));

  return (
    <section className="mb-12 p-6 bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-wider" style={{ fontFamily: 'var(--font-orbitron, sans-serif)' }}>
        Trenutni Status Računala
      </h2>
      
      <div className="flex justify-center items-center gap-6 mb-8 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></span>
          <span className="text-gray-300 font-medium tracking-wide">Slobodno</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626]"></span>
          <span className="text-gray-300 font-medium tracking-wide">Zauzeto</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`relative flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              seat.occupied
                ? 'bg-red-950/30 border-red-600/50 text-red-500 shadow-[inset_0_0_20px_rgba(220,38,38,0.15)]'
                : 'bg-green-950/30 border-green-500/50 text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.15)]'
            }`}
          >
            <div className={`absolute inset-0 rounded-xl blur-md -z-10 transition-opacity opacity-40 ${seat.occupied ? 'bg-red-600/20' : 'bg-green-500/20'}`}></div>

            <svg 
              className="w-12 h-12 md:w-16 md:h-16 mb-3 drop-shadow-lg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            
            <span className="text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-chakra-petch, sans-serif)' }}>
              PC - {seat.id < 10 ? `0${seat.id}` : seat.id}
            </span>
            
            <span className={`text-[10px] md:text-xs mt-1 uppercase font-bold tracking-widest ${seat.occupied ? 'text-red-500' : 'text-green-400'}`}>
              {seat.occupied ? 'Igra se' : 'Dostupno'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
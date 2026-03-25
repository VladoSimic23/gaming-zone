"use client";

import { useEffect, useState } from "react";

// Opcionalno: Definirajte ispravan tip podataka prema stvarnom odgovoru s API-ja
type TableData = any;

export default function TablesStatus() {
  const [data, setData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(data);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("/api/tables");
        if (!response.ok) {
          throw new Error("Dogodila se greška prilikom preuzimanja podataka.");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Nepoznata greška");
      } finally {
        setLoading(false);
      }
    };

    fetchTables();

    // Opcionalno auto-osvježavanje svake minute
    const intervalId = setInterval(fetchTables, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400 animate-pulse">
        Učitavanje statusa stolova...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Greška: {error}</div>;
  }

  // Prilagodite prikaz podataka na temelju točne strukture koju vraća GGRude API
  return (
    <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl mx-auto border border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-white">Status stolova</h2>

      {/* Ovdje možete dizajnirati kako će stolovi vizualno izgledati na temelju {data} */}
      <div className="bg-gray-800 p-4 rounded text-gray-300 overflow-auto max-h-96">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-right">
        Podaci se automatski osvježavaju svake minute.
      </p>
    </div>
  );
}

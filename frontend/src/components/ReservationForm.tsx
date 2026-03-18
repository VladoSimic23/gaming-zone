"use client";

import { useState, useEffect } from "react";
import { client } from "../sanity/client"; // putanja od src/components/ReservationForm.tsx -> src/sanity/client

// Konstante
const TOTAL_SEATS = 10;
const WEEKDAY_HOURS = Array.from({ length: 11 }, (_, i) => `${12 + i}:00`); // 12-23h za odabir
const WEEKEND_HOURS = Array.from({ length: 7 }, (_, i) => `${16 + i}:00`); // 16-23h za odabir

type TimeSlot = {
  time: string;
  availableSeats: number;
};

interface ReservationDoc {
  timeSlots?: string[];
  seats?: number;
}

export default function ReservationForm() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Generiraj dostupna vremena kada korisnik odabere datum
  useEffect(() => {
    if (!date) return;

    const fetchAvailability = async () => {
      setIsLoadingSlots(true);

      const d = new Date(date);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6; // 0=Nedjelja, 6=Subota
      const hours = isWeekend ? WEEKEND_HOURS : WEEKDAY_HOURS;

      try {
        // Dobavi postojeće rezervacije za taj datum
        const existingReservations = await client.fetch(
          `*[_type == "reservation" && date == $date && status != "cancelled"]{
            timeSlots, seats
          }`,
          { date },
        );

        const slots = hours.map((hour: string) => {
          const bookedInSlot = existingReservations
            // Filtriramo rezervacije koje u nizu "timeSlots" sadrže trenutni sat
            .filter(
              (r: ReservationDoc) => r.timeSlots && r.timeSlots.includes(hour),
            )
            .reduce(
              (sum: number, r: ReservationDoc) => sum + (r.seats || 0),
              0,
            );

          return {
            time: hour,
            availableSeats: Math.max(0, TOTAL_SEATS - bookedInSlot),
          };
        });

        setAvailableSlots(slots);
      } catch (err) {
        console.error("Greška pri dohvaćanju slobodnih termina:", err);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchAvailability();
    setSelectedTimes([]); // resetiraj vrijeme kad se promijeni datum
  }, [date]);

  const toggleTime = (time: string, availableSeatsForTime: number) => {
    if (availableSeatsForTime === 0) return; // Ignore if full

    setSelectedTimes((prev) => {
      const isSelected = prev.includes(time);
      let newSelection;

      if (isSelected) {
        newSelection = prev.filter((t) => t !== time);
      } else {
        newSelection = [...prev, time].sort();
      }
      return newSelection;
    });
  };

  // Tražimo minimalni broj slobodnih mjesta među svim ODABRANIM satima
  const minAvailableInSelected =
    selectedTimes.length > 0
      ? Math.min(
          ...availableSlots
            .filter((s) => selectedTimes.includes(s.time))
            .map((s) => s.availableSeats),
        )
      : TOTAL_SEATS;

  // Automatski smanji broj sjedala ako je odabran sat s manje mjesta
  useEffect(() => {
    if (selectedTimes.length > 0 && seats > minAvailableInSelected) {
      setSeats(Math.max(1, minAvailableInSelected));
    }
  }, [selectedTimes, minAvailableInSelected, seats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || selectedTimes.length === 0 || !name || !phone) {
      setMessage("Molimo ispunite sva polja i odaberite barem jedan termin.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Šaljemo podatke na naš Next.js API route (/api/reserve)
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Šaljemo "times" umjesto "time"
        body: JSON.stringify({
          date,
          times: selectedTimes,
          seats,
          name,
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Uspješno! Vaša rezervacija je zabilježena.");
        setDate(new Date().toISOString().split("T")[0]);
        setSelectedTimes([]);
        setSeats(1);
        setName("");
        setPhone("");
        setAvailableSlots([]);
      } else {
        setMessage(`Greška: ${data.message || "Pokušajte ponovno."}`);
      }
    } catch (err) {
      setMessage("Došlo je do mrežne greške. Pokušajte ponovno kasnije.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#1a1a1a] p-8 rounded-xl shadow-2xl border border-gray-800">
      <h1 className="font-heading text-3xl font-bold mb-2 text-center text-purple-500">
        ggZone Rezervacije
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Rezervirajte svoje mjesto za najbolje gaming iskustvo!
      </p>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${message.includes("Uspješno") ? "bg-green-600/20 text-green-400 border border-green-500/50" : "bg-red-600/20 text-red-400 border border-red-500/50"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Datum dolaska
          </label>
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {date && !isLoadingSlots && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Dostupni sati (Možete označiti više termina)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map((slot) => {
                const isFull = slot.availableSeats === 0;
                const isSelected = selectedTimes.includes(slot.time);

                return (
                  <button
                    type="button"
                    key={slot.time}
                    disabled={isFull && !isSelected}
                    onClick={() => toggleTime(slot.time, slot.availableSeats)}
                    className={`
                        p-2 rounded-lg text-sm font-medium transition-colors border
                        ${
                          isFull
                            ? "opacity-30 cursor-not-allowed bg-red-900 border-red-800"
                            : isSelected
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-[#222] border-gray-700 hover:bg-[#333] text-gray-200"
                        }
                      `}
                  >
                    {slot.time}
                    <span className="block text-xs opacity-75">
                      {isFull ? "Puno" : `${slot.availableSeats} sl.`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isLoadingSlots && (
          <p className="text-sm text-gray-400">
            Provjeravam slobodna mjesta...
          </p>
        )}

        {selectedTimes.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Koliko računala/konzola?
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {Array.from(
                { length: minAvailableInSelected },
                (_, i) => i + 1,
              ).map((num) => (
                <option key={num} value={num}>
                  {num} mjesto(a)
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Maksimalan broj mjesta ovisi o terminu koji ima najmanje slobodnih
              mjesta.
            </p>
          </div>
        )}

        {selectedTimes.length > 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ime
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Broj telefona
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Mjesto čuvamo određeno vrijeme; nazvat ćemo vas ako kasnite.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-colors"
            >
              {isSubmitting ? "Spremanje..." : "Potvrdi rezervaciju"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

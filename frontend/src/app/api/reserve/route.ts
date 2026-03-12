import { NextResponse } from "next/server";
import { client } from "../../../sanity/client"; // putanja od src/app/api/reserve/route.ts -> src/sanity/client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, times, seats, name, phone } = body;

    // Ažurirano: "times" je umjesto "time", on je niz stringova (npr. ["12:00", "13:00"])
    if (!date || !times || times.length === 0 || !name || !phone || !seats) {
      return NextResponse.json({ message: "Sva polja su obavezna" }, { status: 400 });
    }

    // Provjera imamo li postavljen token
    if (!process.env.SANITY_API_TOKEN) {
      console.error("NEDOSTAJE SANITY_API_TOKEN u .env.local!");
      return NextResponse.json(
        { message: "Server nije konfiguriran za spremanje (nedostaje API token)." }, 
        { status: 500 }
      );
    }
    
    const doc = {
      _type: "reservation",
      name,
      phone,
      date,
      timeSlots: times, // Spremamo niz odabranih sati ("12:00", "13:00")
      seats: Number(seats),
      status: "pending"
    };

    // Stvori dokument u Sanity-u
    await client.create(doc);

    return NextResponse.json({ message: "Uspješno spremljeno", success: true }, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Greška kod spremanja rezervacije:", error);
    
    // Ako greška sadrži "Insufficient permissions", šaljemo jasnu poruku klijentu
    if (error instanceof Error && error.message.includes('Insufficient permissions')) {
      return NextResponse.json(
        { message: "Nemate prava za spremanje. Provjerite ima li vaš Sanity Token 'Editor' prava!" }, 
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Interna greška servera" }, { status: 500 });
  }
}

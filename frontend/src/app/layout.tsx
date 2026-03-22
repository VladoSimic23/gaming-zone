import type { Metadata, Viewport } from "next";
import { Orbitron, Chakra_Petch } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("http://www.gggamingzone.com/"),
  title: {
    default: "ggZone | Najbolja gaming i esport igraonica",
    template: "%s | ggZone",
  },
  description:
    "Dobrodošli u ggZone - vrhunsku gaming i esport igraonicu. Otkrijte najnovije igre, sudjelujte na turnirima, i rezervirajte svoje PC ili PlayStation mjesto već danas!",
  keywords: [
    "igraona",
    "gaming igraonica",
    "esport",
    "gaming turniri",
    "gaming zone grude",
    "Rezervacija PC-a u igraonici",
    "Rezervacija PC-a u igraonici grude",
    "Proslava rođendana u igraonici",
    "Proslava rođendana u igraonici grude",
    "Gaming turniri s nagradama",
    "Gdje igrati igrice u grudama",
    "gaming računalna igraonica",
    "ggZone turniri",
    "PC igraonica",
    "PlayStation 5 igraonica",
    "gaming turniri",
    "ggZone",
    "rezervacija računala",
    "video igre",
    "gaming centar",
    "lan party",
    "grude",
    "counter strike",
    "csgo",
    "fortnite",
    "call of duty",
    "valorant",
    "league of legends",
    "dota 2",
    "overwatch",
    "apex legends",
    "pubg",
    "rocket league",
    "fifa",
    "madden nfl",
    "street fighter",
    "tekken",
    "smash bros",
    "Gaming igraonica zapadna hercegovina",
    "Gaming igraonica hercegovina",
    "PC igraonica Posušje",
    "Esport centar Široki Brijeg",
    "Gdje igrati PS5 u Hercegovini",
    "Roblox igraonica",
    "Mjesto za druženje mladih Grude",
  ],
  authors: [{ name: "ggZone" }],
  creator: "ggZone",
  publisher: "ggZone",
  openGraph: {
    title: "ggZone | Najbolja gaming i esport igraonica",
    description:
      "Vrhunsko gaming iskustvo! Otkrijte najnovije igre, sudjelujte na turnirima i rezervirajte svoje mjesto u ggZone igraonici.",
    url: "http://www.gggamingzone.com/",
    siteName: "ggZone",
    images: [
      {
        url: "/images/og-image.jpg", // Dodaj sliku dimenzija 1200x630px u folder /public/images/
        width: 1200,
        height: 630,
        alt: "ggZone gaming igraonica",
      },
    ],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ggZone | Najbolja gaming i esport igraonica",
    description:
      "Vrhunsko gaming iskustvo! Otkrijte najnovije igre, sudjelujte na turnirima i rezervirajte svoje mjesto u ggZone igraonici.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ggZone Gaming Center",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ulica dr. Franje Tuđmana 8B",
      addressLocality: "Grude",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.37160696800801",
      longitude: "17.4157977",
    },
    url: "https://gggamingzone.com",
    telephone: "+38763740656",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "16:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <html lang="hr">
      <body
        className={`${chakraPetch.variable} ${orbitron.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

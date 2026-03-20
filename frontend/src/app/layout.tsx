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
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
    "gaming igraonica",
    "esport",
    "PC igraonica",
    "PlayStation 5 igraonica",
    "gaming turniri",
    "ggZone",
    "rezervacija računala",
    "video igre",
    "lan party",
  ],
  authors: [{ name: "ggZone" }],
  creator: "ggZone",
  publisher: "ggZone",
  alternates: {
    canonical: "/",
  },
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
  return (
    <html lang="hr">
      <body
        className={`${chakraPetch.variable} ${orbitron.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

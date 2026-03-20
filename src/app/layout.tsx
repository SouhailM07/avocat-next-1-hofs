import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cabinet d'Avocat Mahi Fares | Boufarik, Blida",
    template: "%s | Cabinet d'Avocat Mahi Fares"
  },
  description: "Cabinet d'avocat spécialisé à Boufarik, Blida. Prenez rendez-vous avec Maître Mahi Fares pour des conseils juridiques, affaires civiles, et pénales. محامي في بوفاريك.",
  keywords: ["avocat", "avocat boufarik", "avocat blida", "cabinet avocat", "droit pénal", "droit civil", "محامي", "محامي بوفاريك", "مكتب محاماة بوفاريك", "استشارة قانونية", "Mahi Fares", "avocat algerie", "lawyer algeria"],
  authors: [{ name: "Maître Mahi Fares" }],
  creator: "Cabinet Mahi Fares",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "ar_DZ",
    title: "Cabinet d'Avocat Mahi Fares | Boufarik",
    description: "Votre partenaire de confiance pour la défense de vos droits à Boufarik et ses environs. محامي في بوفاريك.",
    siteName: "Cabinet d'Avocat Mahi Fares",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

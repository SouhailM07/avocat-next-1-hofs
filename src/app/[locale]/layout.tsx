import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Amiri } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cabinet d'Avocat Mahi Fares | Boufarik, Blida",
    template: "%s | Cabinet d'Avocat Mahi Fares",
  },
  description:
    "Cabinet d'avocat spécialisé à Boufarik, Blida. Prenez rendez-vous avec Maître Mahi Fares pour des conseils juridiques, affaires civiles, et pénales. محامي في بوفاريك.",
  keywords: [
    "avocat",
    "avocat boufarik",
    "avocat blida",
    "cabinet avocat",
    "droit pénal",
    "droit civil",
    "محامي",
    "محامي بوفاريك",
    "مكتب محاماة بوفاريك",
    "استشارة قانونية",
    "Mahi Fares",
    "avocat algerie",
    "lawyer algeria",
  ],
  authors: [{ name: "Maître Mahi Fares" }],
  creator: "Cabinet Mahi Fares",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "ar_DZ",
    title: "Cabinet d'Avocat Mahi Fares | Boufarik",
    description:
      "Votre partenaire de confiance pour la défense de vos droits à Boufarik et ses environs. محامي في بوفاريك.",
    siteName: "Cabinet d'Avocat Mahi Fares",
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): Promise<React.ReactNode> {
  const { locale } = params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

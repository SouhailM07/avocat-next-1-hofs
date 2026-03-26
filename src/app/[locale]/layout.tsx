import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Amiri } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

// Static metadata template
export const metadata: Metadata = {
  title: {
    default: "Cabinet d'Avocat Mahi Fares | Boufarik, Blida",
    template: "%s | Cabinet d'Avocat Mahi Fares",
  },
  description:
    "Cabinet d'avocat spécialisé à Boufarik, Blida. Prenez rendez-vous avec Maître Mahi Fares pour des conseils juridiques, affaires civiles, et pénales. محامي في بوفاريك.",
  authors: [{ name: "Maître Mahi Fares" }],
  creator: "Cabinet Mahi Fares",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
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
}) {
  const { locale } = params;

  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Fetch server-side messages for this locale
  const messages = await getMessages(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Canonical & hreflang URLs
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/${locale}`;
  const alternateLinks = routing.locales.map((l) => ({
    rel: "alternate",
    hrefLang: l,
    href: `${siteUrl}/${l}`,
  }));

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${amiri.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href={canonicalUrl} />
        {alternateLinks.map((link) => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
        {/* Preconnect for fonts to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

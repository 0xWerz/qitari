import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qitari.werz.tech"),
  title: {
    template: "%s | Qitari",
    default: "Qitari - Horaires des Trains Algérie | SNTF",
  },
  description:
    "Consultez les horaires des trains SNTF en Algérie. Prix à jour Horaires en temps réel Toutes les lignes. Trouvez facilement votre train en Algérie.",
  keywords: [
    "horaires trains algérie",
    "SNTF horaires",
    "prix train algérie",
    "train algérie",
    "horaires SNTF",
    "مواعيد القطارات الجزائر",
    "اسعار تذاكر القطار",
    "SNTF مواعيد",
    "transport ferroviaire algérie",
    "réservation train algérie",
  ].join(", "),
  authors: [{ name: "Qitari" }],
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    alternateLocale: ["ar_DZ"],
    siteName: "Qitari",
    title: {
      template: "%s | Qitari",
      default: "Qitari - Horaires des Trains SNTF en Algérie",
    },
    description:
      "Trouvez facilement les horaires et prix des trains en Algérie. Service gratuit et à jour.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Qitari - Horaires des Trains Algérie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Qitari",
      default: "Qitari - Horaires des Trains SNTF en Algérie",
    },
    description:
      "Trouvez facilement les horaires et prix des trains en Algérie. Service gratuit et à jour.",
    images: ["/og/home.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-DZ": "/",
      "ar-DZ": "/ar",
    },
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
  verification: {
    google: "your-google-site-verification",
  },
};

// Add JSON-LD structured data
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Qitari",
  alternateName: "Horaires des Trains Algérie",
  url: "https://qitari.werz.tech",
  description: "Service d'horaires des trains SNTF en Algérie",
  inLanguage: ["fr-DZ", "ar-DZ"],
  publisher: {
    "@type": "Organization",
    name: "Qitari",
    logo: {
      "@type": "ImageObject",
      url: "https://qitari.werz.tech/logo.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased relative min-h-screen`}
      >
        <Analytics />
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        {children}
      </body>
    </html>
  );
}

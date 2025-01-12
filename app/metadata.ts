import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algeria Train Schedules - Find Your Train Route",
  description:
    "Find train schedules between all 58 provinces of Algeria. Real-time updates and easy schedule search for routes like Chlef to Algiers.",
  keywords:
    "Algeria trains, train schedules, Chlef to Algiers train, Algeria provinces transport",
  openGraph: {
    title: "Algeria Train Schedules",
    description: "Find train schedules between all 58 provinces of Algeria",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algeria Train Schedules",
    description: "Find train schedules between all 58 provinces of Algeria",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://qitari.werz.tech",
  },
  authors: [{ name: "Moussa Omrane" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

import { Locale } from "@/lib/i18n/dictionaries";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased",
          lang === "ar" && "font-arabic"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

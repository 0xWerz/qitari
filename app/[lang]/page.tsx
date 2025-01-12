import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/dictionaries";
import { SearchForm } from "@/components/search-form";
import { UpcomingTrains } from "@/components/upcoming-trains";
import { AddRouteCard } from "@/components/add-route-card";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return {
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(dict.home.title)}`,
          width: 1200,
          height: 630,
          alt: dict.home.title,
        },
      ],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{dict.home.title}</h1>
        <p className="text-lg text-muted-foreground">{dict.home.description}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <SearchForm dict={dict.home} lang={lang} />
      </div>

      <div className="max-w-3xl mx-auto">
        <UpcomingTrains lang={lang} />
      </div>

      <div className="max-w-3xl mx-auto">
        <AddRouteCard lang={lang} dict={dict.home} />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          {dict.home.contributorNote}
        </p>
      </div>
    </main>
  );
}

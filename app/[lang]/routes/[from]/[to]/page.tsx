import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/dictionaries";
import { PROVINCES, getProvinceByName } from "@/lib/constants";
import { getSchedules } from "@/lib/api";
import { ScheduleEditor } from "@/components/schedule-editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TrainScheduleTable from "@/components/train-schedule-table";
import { RouteHeader } from "@/components/route-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddScheduleButton } from "@/components/add-schedule-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; from: string; to: string }>;
}): Promise<Metadata> {
  const { lang, from, to } = await params;
  const dict = await getDictionary(lang);
  const fromProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === from.toLowerCase()
  );
  const toProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === to.toLowerCase()
  );

  const title = dict.routes.title;
  const description = dict.routes.description
    .replace("{from}", fromProvince?.name || from)
    .replace("{to}", toProvince?.name || to);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            title
          )}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

function isValidRoute(from: string, to: string): boolean {
  // Decode URL encoded strings
  const decodedFrom = decodeURIComponent(from);
  const decodedTo = decodeURIComponent(to);

  const fromProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === decodedFrom.toLowerCase()
  );
  const toProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === decodedTo.toLowerCase()
  );

  return (
    fromProvince !== undefined &&
    toProvince !== undefined &&
    fromProvince !== toProvince
  );
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ lang: Locale; from: string; to: string }>;
}) {
  const { lang, from, to } = await params;
  const decodedFrom = decodeURIComponent(from);
  const decodedTo = decodeURIComponent(to);
  const dict = await getDictionary(lang);
  const schedules = await getSchedules(decodedFrom, decodedTo);

  if (!isValidRoute(from, to)) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {lang === "ar" ? "رجوع" : lang === "en" ? "Back" : "Retour"}
            </span>
          </Link>

          <Alert variant="destructive">
            <AlertTitle>
              {lang === "ar"
                ? "مسار غير صالح"
                : lang === "en"
                ? "Invalid Route"
                : "Route Non Valide"}
            </AlertTitle>
            <AlertDescription>
              {lang === "ar"
                ? `مسار القطار من ${decodedFrom} إلى ${decodedTo} غير موجود. يرجى اختيار ولايات صالحة.`
                : lang === "en"
                ? `The train route from ${decodedFrom} to ${decodedTo} does not exist. Please select valid provinces.`
                : `La route de ${decodedFrom} à ${decodedTo} n'est pas valide. Veuillez sélectionner des provinces valides.`}
            </AlertDescription>
          </Alert>

          <Button asChild>
            <Link href={`/${lang}`}>
              {lang === "ar"
                ? "العودة إلى الصفحة الرئيسية"
                : lang === "en"
                ? "Return to Home"
                : "Retour à l'Accueil"}
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const fromProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === from.toLowerCase()
  );
  const toProvince = PROVINCES.find(
    (p) => p.name.toLowerCase() === to.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {lang === "ar" ? "رجوع" : lang === "en" ? "Back" : "Retour"}
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <RouteHeader
            from={fromProvince?.name || from}
            to={toProvince?.name || to}
            lang={lang}
          />
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/30 p-4 rounded-lg text-sm text-center text-muted-foreground">
            <p>
              {lang === "ar"
                ? "يتم تحديث المواعيد من قبل المجتمع. يمكنك المساهمة بإضافة أو تعديل المواعيد."
                : lang === "en"
                ? "Schedules are updated by the community. You can contribute by adding or modifying schedules."
                : "Les horaires sont mis à jour par la communauté. Vous pouvez contribuer en ajoutant ou modifiant les horaires."}
            </p>
            <p className="mt-1 text-xs">
              {lang === "ar"
                ? `آخر تحديث: ${new Date().toLocaleDateString("ar-DZ")}`
                : lang === "en"
                ? `Last updated: ${new Date().toLocaleDateString("en-DZ")}`
                : `Dernière mise à jour: ${new Date().toLocaleDateString(
                    "fr-DZ"
                  )}`}
            </p>
          </div>
        </div>

        {/* No Schedules State */}
        {!Array.isArray(schedules) || schedules.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            <Alert>
              <AlertTitle>
                {lang === "ar"
                  ? "لا توجد مواعيد"
                  : lang === "en"
                  ? "No Schedules Found"
                  : "Aucun Horaire Trouvé"}
              </AlertTitle>
              <AlertDescription className="space-y-4">
                <p>
                  {lang === "ar"
                    ? "لا توجد حاليا مواعيد قطار متاحة لهذا المسار."
                    : lang === "en"
                    ? "There are currently no train schedules available for this route."
                    : "Il n'y a actuellement aucun horaire de train disponible pour cette route."}
                </p>
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">
                    {lang === "ar"
                      ? "ساهم في المواعيد!"
                      : lang === "en"
                      ? "Contribute to Schedules!"
                      : "Contribuez aux Horaires!"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "ar"
                      ? "هل تعرف مواعيد هذا المسار؟ ساعد المسافرين الآخرين بمشاركتها. جميع المساهمات مجهولة."
                      : lang === "en"
                      ? "Know the schedules for this route? Help other travelers by sharing them. All contributions are anonymous."
                      : "Connaissez-vous les horaires pour cette route? Aidez d'autres voyageurs en les partageant. Toutes les contributions sont anonymes."}
                  </p>
                  <ScheduleEditor
                    from={fromProvince?.name || from}
                    to={toProvince?.name || to}
                    lang={lang}
                  />
                </div>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Schedule Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {lang === "ar"
                    ? "جدول المواعيد"
                    : lang === "en"
                    ? "Schedule Table"
                    : "Tableau des Horaires"}
                </CardTitle>
                <AddScheduleButton lang={lang} />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                  <TrainScheduleTable
                    schedules={schedules}
                    from={fromProvince?.name || from}
                    to={toProvince?.name || to}
                  />
                </Suspense>
              </CardContent>
            </Card>

            {/* Add Schedule Form */}
            <Card id="add-schedule">
              <CardHeader>
                <CardTitle>
                  {lang === "ar"
                    ? "إضافة موعد جديد"
                    : lang === "en"
                    ? "Add New Schedule"
                    : "Ajouter un Nouvel Horaire"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScheduleEditor
                  from={fromProvince?.name || from}
                  to={toProvince?.name || to}
                  lang={lang}
                />
              </CardContent>
            </Card>

            {/* About Route */}
            <div className="bg-muted/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {lang === "ar"
                  ? "حول هذا المسار"
                  : lang === "en"
                  ? "About this Route"
                  : "À propos de cette Route"}
              </h3>
              <p className="text-muted-foreground">
                {lang === "ar"
                  ? `تعرض هذه الصفحة مواعيد القطارات بين ${
                      fromProvince?.nameAr || from
                    } و ${
                      toProvince?.nameAr || to
                    }. المواعيد مقدمة من المجتمع ويمكن للزوار تعديلها. شكراً لمساهمتك في إضافة أو تصحيح المواعيد لمساعدة المسافرين الآخرين.`
                  : lang === "en"
                  ? `This page displays train schedules between ${
                      fromProvince?.name || from
                    } and ${
                      toProvince?.name || to
                    }. Schedules are provided by the community and can be modified by visitors. Thank you for contributing by adding or correcting schedules to help other travelers.`
                  : `Cette page affiche les horaires des trains entre ${
                      fromProvince?.name || from
                    } et ${
                      toProvince?.name || to
                    }. Les horaires sont fournis par la communauté et peuvent être modifiés par les visiteurs. Merci de contribuer en ajoutant ou en corrigeant les horaires pour aider d'autres voyageurs.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

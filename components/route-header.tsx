import { Train } from "lucide-react";

interface RouteHeaderProps {
  from: string;
  to: string;
  lang?: string;
}

export function RouteHeader({ from, to, lang = "fr" }: RouteHeaderProps) {
  const decodedFrom = decodeURIComponent(from);
  const decodedTo = decodeURIComponent(to);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Train className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">
          {decodedFrom} {lang === "ar" ? "إلى" : "→"} {decodedTo}
        </h1>
      </div>
      <p className="text-muted-foreground">
        {lang === "ar"
          ? `اعثر على جميع مواعيد القطارات وأسعار التذاكر للسفر من ${decodedFrom} إلى ${decodedTo}. يمكنك عرض وتعديل المواعيد مباشرة.`
          : lang === "en"
          ? `Find all train schedules and ticket prices for travel from ${decodedFrom} to ${decodedTo}. You can view and edit schedules directly.`
          : `Trouvez tous les horaires des trains et les prix des billets pour voyager de ${decodedFrom} vers ${decodedTo}. Vous pouvez consulter et modifier les horaires directement.`}
      </p>
    </div>
  );
}

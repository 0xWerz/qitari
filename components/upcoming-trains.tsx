import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train } from "lucide-react";
import Link from "next/link";
import { Schedule } from "@/lib/api";

interface UpcomingTrainsProps {
  lang?: string;
}

async function getUpcomingTrains(lang: string) {
  // For now, we'll just fetch Chlef-Algiers and Algiers-Chlef routes as they're our default
  const routes = [
    { from: "chlef", to: "algiers" },
    { from: "algiers", to: "chlef" },
  ];

  const allSchedules: Schedule[] = [];
  for (const route of routes) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/schedules/${route.from}/${route.to}`,
      { cache: "no-store" } // Ensure fresh data
    );
    if (response.ok) {
      const schedules = await response.json();
      allSchedules.push(...schedules);
    }
  }

  // Get current time
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Process schedules to add time until departure
  const processed = allSchedules.map((schedule) => {
    const [hours, minutes] = schedule.departure.split(":").map(Number);
    let departureMinutes = hours * 60 + minutes;

    // If departure time is earlier than current time, assume it's for tomorrow
    if (departureMinutes < currentTime) {
      departureMinutes += 24 * 60;
    }

    const minutesUntil = departureMinutes - currentTime;
    const hoursUntil = Math.floor(minutesUntil / 60);
    const remainingMinutes = minutesUntil % 60;

    let timeUntil = "";
    if (lang === "ar") {
      timeUntil = `بعد ${hoursUntil} ساعة و ${remainingMinutes} دقيقة`;
    } else if (lang === "en") {
      timeUntil = `in ${hoursUntil}h ${remainingMinutes}m`;
    } else {
      timeUntil = `dans ${hoursUntil}h ${remainingMinutes}m`;
    }

    return {
      ...schedule,
      timeUntil,
      minutesUntil,
    };
  });

  // Sort by time until departure and take next 5 trains
  return processed.sort((a, b) => a.minutesUntil - b.minutesUntil).slice(0, 5);
}

export async function UpcomingTrains({ lang = "fr" }: UpcomingTrainsProps) {
  const upcomingTrains = await getUpcomingTrains(lang);

  if (upcomingTrains.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="h-5 w-5" />
          {lang === "ar"
            ? "القطارات القادمة"
            : lang === "en"
            ? "Upcoming Trains"
            : "Trains à Venir"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTrains.map((train) => (
            <Link
              key={train.id}
              href={`/${lang}/routes/${train.from.toLowerCase()}/${train.to.toLowerCase()}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium">
                    {train.from} → {train.to}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {train.departure} - {train.arrival} • {train.price} DZD
                  </div>
                </div>
                <Badge variant="outline">{train.timeUntil}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddScheduleButtonProps {
  lang: string;
}

export function AddScheduleButton({ lang }: AddScheduleButtonProps) {
  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() =>
        document
          .getElementById("add-schedule")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <PlusCircle className="h-4 w-4" />
      {lang === "ar"
        ? "إضافة موعد جديد"
        : lang === "en"
        ? "Add New Schedule"
        : "Ajouter un Nouvel Horaire"}
    </Button>
  );
}

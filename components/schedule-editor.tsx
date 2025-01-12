"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Dictionary } from "@/lib/i18n/dictionaries";

export interface ScheduleEditorProps {
  from: string;
  to: string;
  lang?: string;
  dict?: Dictionary["routes"]["scheduleEditor"];
  schedules?: any[];
  routeKey?: string;
}

export function ScheduleEditor({
  from,
  to,
  lang,
  dict = {
    title: "Add Schedule",
    departure: "Departure",
    arrival: "Arrival",
    price: "Price",
    submit: "Submit",
    success: "Schedule added successfully",
    error: "Failed to add schedule",
  },
  schedules,
  routeKey,
}: ScheduleEditorProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const departure = formData.get("departure") as string;
      const arrival = formData.get("arrival") as string;
      const price = formData.get("price") as string;
      const trainNumber = formData.get("trainNumber") as string;

      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          departure,
          arrival,
          price: parseInt(price, 10),
          trainNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(dict.error);
      }

      toast({
        title: dict.success,
      });

      (event.target as HTMLFormElement).reset();
      // Refresh the page to show the new schedule
      window.location.reload();
    } catch (error) {
      toast({
        title: dict.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trainNumber">Train Number</Label>
          <Input
            id="trainNumber"
            name="trainNumber"
            type="text"
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departure">{dict.departure}</Label>
          <Input
            id="departure"
            name="departure"
            type="time"
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrival">{dict.arrival}</Label>
          <Input
            id="arrival"
            name="arrival"
            type="time"
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">{dict.price}</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="10"
            required
            className="h-12"
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          dict.submit
        )}
      </Button>
    </form>
  );
}

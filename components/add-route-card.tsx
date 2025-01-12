"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PROVINCES } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface AddRouteCardProps {
  lang: string;
  dict: {
    departure: string;
    destination: string;
    addRoute?: string;
  };
}

export function AddRouteCard({ lang, dict }: AddRouteCardProps) {
  const router = useRouter();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const handleAddRoute = () => {
    if (from && to) {
      router.push(`/${lang}/routes/${from.toLowerCase()}/${to.toLowerCase()}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {lang === "ar"
            ? "إضافة مسار جديد"
            : lang === "en"
            ? "Add New Route"
            : "Ajouter une Nouvelle Route"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{dict.departure}</label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger>
                <SelectValue placeholder={dict.departure} />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((province) => (
                  <SelectItem key={province.number} value={province.name}>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {province.number.toString().padStart(2, "0")}
                      </span>
                      <span>
                        {lang === "ar" ? province.nameAr : province.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{dict.destination}</label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger>
                <SelectValue placeholder={dict.destination} />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((province) => (
                  <SelectItem key={province.number} value={province.name}>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {province.number.toString().padStart(2, "0")}
                      </span>
                      <span>
                        {lang === "ar" ? province.nameAr : province.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full h-10"
              onClick={handleAddRoute}
              disabled={!from || !to || from === to}
            >
              {lang === "ar"
                ? "إضافة المسار"
                : lang === "en"
                ? "Add Route"
                : "Ajouter la Route"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROVINCES } from "@/lib/constants";
import { Dictionary } from "@/lib/i18n/dictionaries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchFormProps {
  dict: Dictionary["home"];
  lang: string;
}

export function SearchForm({ dict, lang }: SearchFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(from: string, to: string) {
    if (from && to) {
      startTransition(() => {
        router.push(
          `/${lang}/routes/${from.toLowerCase()}/${to.toLowerCase()}`
        );
      });
    }
  }

  return (
    <Tabs defaultValue="search" className="w-full">
      {/* <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="search">{dict.search}</TabsTrigger>
        <TabsTrigger value="popular">{dict.popularRoutes}</TabsTrigger>
      </TabsList> */}

      <TabsContent value="search">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{dict.findTrain}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const from = formData.get("from") as string;
                const to = formData.get("to") as string;
                handleSearch(from, to);
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">{dict.departure}</label>
                <Select name="from" required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={`${dict.departure}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((province) => (
                      <SelectItem
                        key={province.number}
                        value={province.name.toLowerCase()}
                      >
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
                <label className="text-sm font-medium">
                  {dict.destination}
                </label>
                <Select name="to" required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={`${dict.destination}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((province) => (
                      <SelectItem
                        key={province.number}
                        value={province.name.toLowerCase()}
                      >
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
                  type="submit"
                  className="w-full h-12 text-base"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    dict.searchButton
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

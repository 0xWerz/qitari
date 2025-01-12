"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { Locale } from "@/lib/i18n/dictionaries";

const languages = [
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(lang: string) {
    // Get the current path segments
    const segments = pathname.split("/").filter(Boolean);
    let newPath = "";

    // Check if we're at the root
    if (segments.length === 0) {
      newPath = `/${lang}`;
    }
    // Check if we already have a language code
    else if (["ar", "en", "fr"].includes(segments[0])) {
      segments[0] = lang;
      newPath = `/${segments.join("/")}`;
    }
    // If no language code but we have a path
    else {
      segments.unshift(lang);
      newPath = `/${segments.join("/")}`;
    }

    // Handle trailing slash if it existed in the original path
    if (pathname.endsWith("/") && !newPath.endsWith("/")) {
      newPath += "/";
    }

    router.push(newPath);
  }

  // Get current language from path
  const currentLang = pathname.split("/")[1] as Locale;
  const isCurrentLangValid = ["ar", "en", "fr"].includes(currentLang);
  const currentLanguage = languages.find(
    (lang) => lang.code === (isCurrentLangValid ? currentLang : "fr")
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
          <span className="absolute -bottom-1 -right-1 text-[10px] font-semibold bg-primary text-primary-foreground rounded-sm px-1">
            {currentLanguage?.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

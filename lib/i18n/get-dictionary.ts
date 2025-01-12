import { Locale, dictionaries } from "./dictionaries";

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

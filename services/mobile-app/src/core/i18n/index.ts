import { t } from "src/core/forms/validators";

export function useTranslation(_namespace?: string): { t: (key: string) => string } {
  return { t };
}
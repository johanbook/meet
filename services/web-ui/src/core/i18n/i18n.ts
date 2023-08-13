import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import { registerDayjsLocale } from "./dayjs";

export function registerI18n() {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      debug: true,
      interpolation: {
        // Not needed for react as it escapes by default
        escapeValue: false,
      },
    });

  i18n.on("languageChanged", (language) => {
    const [locale] = language.split("-");
    registerDayjsLocale(locale);
  });
}

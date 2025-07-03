import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend, { HttpBackendOptions } from "i18next-http-backend";

export function registerI18n() {
  i18n.use(Backend).init<HttpBackendOptions>({
    backend: {
      loadPath: "/login/locales/{{lng}}/{{ns}}.json",
    },
  });

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      // Can be enabled when needed. Too verbose to always be on
      debug: false,
      interpolation: {
        // Not needed for react as it escapes by default
        escapeValue: false,
      },
    });
}

import i18next from "i18next";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";

import { fetchConfig } from "./config";

export async function initializeSuperTokens(
  callback: () => void
): Promise<void> {
  const config = await fetchConfig();

  SuperTokens.init({
    appInfo: {
      apiBasePath: "/auth/api",
      appName: "Login",
      apiDomain: config.API_DOMAIN,
      websiteBasePath: "/login",
      websiteDomain: config.UI_DOMAIN,
    },
    languageTranslations: {
      translationFunc: (key) => {
        const translation = i18next.t(key);
        return translation === key ? "" : translation;
      },
    },
    recipeList: [
      EmailPassword.init({
        getRedirectionURL: async (context) => {
          if (context.action !== "SUCCESS") {
            return;
          }

          if (context.redirectToPath !== undefined) {
            return context.redirectToPath;
          }

          return "/";
        },
        style: `
              [data-supertokens~=container] {
                  --palette-primary: 200, 100, 150;
                  --palette-primaryBorder: 200, 100, 150;
              }
              [data-supertokens~=superTokensBranding] {
                display: none;
              }
            `,
        useShadowDom: false,
      }),
      EmailVerification.init({
        mode: process.env.NODE_ENV === "production" ? "REQUIRED" : "OPTIONAL",
      }),
      Session.init(),
    ],
  });

  // These are used to trigger a re-rendering since the SDK can't detect the change otherwise.
  i18next.on("languageChanged", (lng) => SuperTokens.changeLanguage(lng));
  i18next.on("loaded", () => SuperTokens.loadTranslation({}));

  callback();
}

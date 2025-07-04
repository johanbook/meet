import i18next from "i18next";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";

const API_DOMAIN = window.location.host;
const UI_DOMAIN = window.location.host;

export async function initializeSuperTokens(
  callback: () => void,
): Promise<void> {
  SuperTokens.init({
    appInfo: {
      apiBasePath: "/auth/api",
      appName: "Login",
      apiDomain: API_DOMAIN,
      websiteBasePath: "/login",
      websiteDomain: UI_DOMAIN,
    },
    getRedirectionURL: async (context) => {
      if (context.action === "SUCCESS") {
        return context.redirectToPath;
      }

      return "/";
    },
    languageTranslations: {
      translationFunc: (key) => {
        const translation = i18next.t(key);
        return translation === key ? "" : translation;
      },
    },
    privacyPolicyLink: `https://${UI_DOMAIN}#privacy`,
    recipeList: [
      EmailPassword.init(),
      EmailVerification.init({
        mode: import.meta.env.PROD ? "REQUIRED" : "OPTIONAL",
      }),
      Session.init(),
    ],
    useShadowDom: false,
  });

  // These are used to trigger a re-rendering since the SDK can't detect the change otherwise.
  i18next.on("languageChanged", (lng) => SuperTokens.changeLanguage(lng));
  i18next.on("loaded", () => SuperTokens.loadTranslation({}));

  callback();
}

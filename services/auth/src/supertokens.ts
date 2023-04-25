import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import SuperTokens from "supertokens-auth-react";

import { fetchConfig } from "./config";

export async function initializeSuperTokens(
  callback: () => void
): Promise<void> {
  const config = await fetchConfig();

  SuperTokens.init({
    appInfo: {
      appName: "Login",
      apiDomain: config.API_DOMAIN,
      websiteDomain: config.UI_DOMAIN,
      apiBasePath: "/login",
      websiteBasePath: "/login",
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
        useShadowDom: false,
      }),
      Session.init(),
    ],
  });

  callback();
}

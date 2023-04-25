import React from "react";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";

async function initializeSuperTokens(callback: () => void): Promise<void> {
  const resp = await fetch("/login/config");
  const config = await resp.json();

  SuperTokens.init({
    appInfo: {
      appName: "Login",
      apiDomain: config["API_DOMAIN"],
      websiteDomain: config["UI_DOMAIN"],
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
      }),
      Session.init(),
    ],
  });

  callback();
}

export function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>{getSuperTokensRoutesForReactRouterDom(reactRouterDom)}</Routes>
    </BrowserRouter>
  );
}

export default function App(): React.ReactElement {
  const [isInitialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initializeSuperTokens(() => setInitialized(true));
  }, []);

  if (!isInitialized) {
    return <p>Loading...</p>;
  }

  return <Router />;
}

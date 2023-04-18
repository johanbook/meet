import React from "react";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";

SuperTokens.init({
  appInfo: {
    appName: "Login",
    apiDomain: "http://localhost",
    websiteDomain: "http://localhost",
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

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>{getSuperTokensRoutesForReactRouterDom(reactRouterDom)}</Routes>
    </BrowserRouter>
  );
}

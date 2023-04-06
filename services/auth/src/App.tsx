import React from "react";

import { BrowserRouter, Routes } from "react-router-dom";

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import * as reactRouterDom from "react-router-dom";

SuperTokens.init({
  appInfo: {
    appName: "Login",
    apiDomain: "http://localhost",
    websiteDomain: "http://localhost",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{getSuperTokensRoutesForReactRouterDom(reactRouterDom)}</Routes>
    </BrowserRouter>
  );
}

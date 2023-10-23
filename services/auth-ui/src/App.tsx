import { ReactElement, useEffect, useState } from "react";

import i18n from "i18next";

import { Router } from "./Router";
import { initializeSuperTokens } from "./supertokens";
import { LoadingView } from "./views/LoadingView";

export function App(): ReactElement {
  const [isSupertokensReady, setSupertokensIsReady] = useState(false);
  const [i18nIsReady, setI18nIsReady] = useState(false);

  useEffect(() => {
    i18n.on("loaded", () => setI18nIsReady(true));
    initializeSuperTokens(() => setSupertokensIsReady(true));
  }, []);

  if (!isSupertokensReady || !i18nIsReady) {
    return <LoadingView />;
  }

  return <Router />;
}

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { getBareModules as getEmailPasswordBareModules } from "supertokens-auth-react/recipe/emailpassword/utils";
import { getBareModules as getEmailVerificationBareModules } from "supertokens-auth-react/recipe/emailverification/utils";
import { getBareModules as getSessionBareModules } from "supertokens-auth-react/recipe/session/utils";
import { getBareModules as getCoreBareModules } from "supertokens-auth-react/utils";

export default defineConfig({
  base: "/login",
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["supertokens-web-js", "supertokens-auth-react"],
  },
  plugins: [react()],
  optimizeDeps: {
    include: [
      ...getCoreBareModules(),
      ...getEmailPasswordBareModules(),
      ...getEmailVerificationBareModules(),
      ...getSessionBareModules(),
    ],
  },
});

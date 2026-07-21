import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

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
    include: ["supertokens-web-js", "supertokens-auth-react"],
  },
});

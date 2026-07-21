import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/login",
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react()],
});

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

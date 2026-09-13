export const config = {
  APP: {
    NAME: "Meet",
  },
  // The generated API client paths already include the "/api" prefix (the
  // OpenAPI spec is built with PATH_PREFIX=/api), so the API base URL is the
  // server origin without a path — the same value as the web app's
  // `window.location.origin`.
  //
  //   EXPO_PUBLIC_API_BASE_URL  e.g. "https://meetly.site"
  //   EXPO_PUBLIC_AUTH_BASE_URL e.g. "https://meetly.site/auth/api"
  API: {
    BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost",
  },
  AUTH: {
    // Supertokens recipes live under the auth-api's apiBasePath ("/auth/api").
    BASE_URL:
      process.env.EXPO_PUBLIC_AUTH_BASE_URL ?? "http://localhost/auth/api",
  },
  MONITORING: {
    REPORT_WEB_VITALS: false,
  },
};

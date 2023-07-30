export interface Config {
  API_DOMAIN: string;
  UI_DOMAIN: string;
}

export async function fetchConfig(): Promise<Config> {
  if (process.env.NODE_ENV === "development") {
    return {
      API_DOMAIN: process.env.API_URL || `http://localhost`,
      UI_DOMAIN: process.env.UI_URL || `http://localhost`,
    };
  }

  const resp = await fetch(window.location.origin + "/login/__env.json");
  return await resp.json();
}

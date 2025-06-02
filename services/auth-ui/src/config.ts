export interface Config {
  API_DOMAIN: string;
  UI_DOMAIN: string;
}

export async function fetchConfig(): Promise<Config> {
  if (import.meta.env.DEV) {
    return {
      API_DOMAIN: "http://localhost",
      UI_DOMAIN: "http://localhost",
    };
  }

  const resp = await fetch(window.location.origin + "/login/__env.json");
  return await resp.json();
}

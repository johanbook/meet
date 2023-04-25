export interface Config {
  API_DOMAIN: string;
  UI_DOMAIN: string;
}

export async function fetchConfig(): Promise<Config> {
  const resp = await fetch("/login/config");
  return await resp.json();
}

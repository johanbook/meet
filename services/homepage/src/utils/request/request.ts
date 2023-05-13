export async function request(
  url: string,
  args?: RequestInit
): Promise<unknown> {
  const resp = await fetch(url, args);

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return await resp.json();
}

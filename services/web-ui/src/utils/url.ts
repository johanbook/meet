interface BuilUrlProps {
  pathname: string;
  searchParams: Record<string, string>;
}

export function buildUrl({ pathname, searchParams }: BuilUrlProps): string {
  const urlSearchParams = new URLSearchParams();

  for (const key in searchParams) {
    urlSearchParams.set(key, searchParams[key]);
  }

  return `#${pathname}?${urlSearchParams.toString()}`;
}

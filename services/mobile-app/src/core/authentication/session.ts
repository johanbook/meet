import { Platform } from "react-native";

import { storage } from "src/core/storage";

const SESSION_STORAGE_KEY = "session.cookies";

/**
 * Browsers never expose Set-Cookie through fetch and attach the session
 * cookie automatically for same-origin requests. Only native runtimes need an
 * explicit cookie jar replayed as a header.
 */
export function isManualCookieTransport(): boolean {
  return Platform.OS !== "web";
}

let cookies: Record<string, string> = {};

function loadStoredCookies(): void {
  const stored = storage.getItem(SESSION_STORAGE_KEY);

  if (!stored) {
    return;
  }

  try {
    const parsed = JSON.parse(stored) as unknown;

    if (parsed && typeof parsed === "object") {
      cookies = parsed as Record<string, string>;
    }
  } catch {
    cookies = {};
  }
}

function persistCookies(): void {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cookies));
}

/** Parses one or more Set-Cookie header values into a name -> raw-value map. */
function parseSetCookieHeader(headerValue: string): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (const part of headerValue.split(/,(?=\s*[A-Za-z_][\w-]*=)/)) {
    const match = /^\s*([A-Za-z_][\w-]*)\s*=\s*([^;]*)/.exec(part);

    if (match) {
      parsed[match[1]] = match[2].trim();
    }
  }

  return parsed;
}

/**
 * Replaces the session jar with the cookies set by the most recent auth
 * response. Supertokens issues replacement cookies on every auth interaction,
 * so stale values must not survive. Native only; on web the browser jar owns
 * the session.
 *
 * iOS never surfaces Set-Cookie to JS; the auth-api mirrors it in the
 * `x-session-cookie` header so native clients can read sessions there.
 */
export function updateSessionFromResponseHeaders(
  headers: Headers | string | undefined,
): void {
  if (!isManualCookieTransport()) {
    return;
  }

  let headerValue: string | undefined;

  if (typeof headers === "string") {
    headerValue = headers;
  } else if (headers) {
    headerValue =
      headers.get("set-cookie") ?? headers.get("x-session-cookie") ?? undefined;
  }

  if (!headerValue) {
    return;
  }

  const updated = parseSetCookieHeader(headerValue);

  if (Object.keys(updated).length > 0) {
    cookies = updated;
    persistCookies();
  }
}

export function clearSession(): void {
  cookies = {};
  storage.removeItem(SESSION_STORAGE_KEY);
}

export function getSessionCookieHeader(): string {
  if (!isManualCookieTransport()) {
    return "";
  }

  const pairs = Object.entries(cookies).map(([name, value]) => `${name}=${value}`);

  return pairs.join("; ");
}

export function getCookieValue(name: string): string | undefined {
  return isManualCookieTransport() ? cookies[name] : undefined;
}

export function hasSession(): boolean {
  return Object.keys(cookies).length > 0;
}

loadStoredCookies();
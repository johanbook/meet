import { config } from "src/config";

import {
  clearSession,
  getCookieValue,
  getSessionCookieHeader,
  updateSessionFromResponseHeaders,
} from "./session";

export class AuthError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

interface AuthHeaders {
  "anti-csrf"?: string;
  "content-type"?: string;
  Cookie?: string;
}

function buildHeaders(includeBody: boolean): AuthHeaders {
  const headers: AuthHeaders = {};

  const cookieHeader = getSessionCookieHeader();

  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  // Supertokens session recipe's anti-CSRF protection: when the backend
  // issued an sAntiCsrfToken cookie, non-GET requests must echo it back as
  // the "anti-csrf" header.
  const antiCsrfToken = getCookieValue("sAntiCsrfToken");

  if (antiCsrfToken) {
    headers["anti-csrf"] = antiCsrfToken;
  }

  if (includeBody) {
    headers["content-type"] = "application/json";
  }

  return headers;
}

async function authRequest(
  path: string,
  init: RequestInit,
): Promise<Response> {
  const url = `${config.AUTH.BASE_URL}${path}`;
  const headers = buildHeaders(init.method !== "GET");

  const response = await fetch(url, {
    ...init,
    headers: new Headers({
      ...headers,
      ...(init.headers instanceof Headers
        ? Object.fromEntries(init.headers.entries())
        : init.headers || {}),
    }),
  });

  // SuperTokens refreshes session cookies on most interactions - capture any.
  updateSessionFromResponseHeaders(response.headers);

  if (response.ok) {
    return response;
  }

  let message = response.statusText || "Request failed";

  try {
    const json = (await response.json()) as { message?: unknown };

    if (typeof json.message === "string") {
      message = json.message;
    }
  } catch {
    // Non-JSON error body - keep status text.
  }

  throw new AuthError(response.status, message);
}

export async function signIn(
  email: string,
  password: string,
): Promise<void> {
  await authRequest("/signin", {
    method: "POST",
    body: JSON.stringify({
      formFields: [
        { id: "email", value: email },
        { id: "password", value: password },
      ],
    }),
  });
}

export async function signOut(): Promise<void> {
  try {
    await authRequest("/signout", { method: "POST" });
  } finally {
    clearSession();
  }
}

export async function resendVerificationEmail(): Promise<void> {
  await authRequest("/send-verification-email", {
    method: "POST",
    body: JSON.stringify({}),
  });
}
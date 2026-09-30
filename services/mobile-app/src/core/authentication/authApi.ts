import { config } from "src/config";

import { clearSession, getSessionTokens, setSessionTokens } from "./session";

export class AuthError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

interface AuthHeaders {
  "content-type"?: string;
  "st-auth-mode"?: string;
}

/**
 * The Supertokens recipes in auth-api follow the frontend's token transfer
 * preference (st-auth-mode). Header mode returns the session tokens in
 * readable response headers, which is the only way a native client can get
 * them (Set-Cookie is invisible to JS on iOS).
 */
function buildHeaders(includeBody: boolean): AuthHeaders {
  const headers: AuthHeaders = { "st-auth-mode": "header" };

  if (includeBody) {
    headers["content-type"] = "application/json";
  }

  return headers;
}

function readTokenFromResponseHeaders(
  headers: Headers,
  name: string,
): string | undefined {
  const value = headers.get(name);

  if (!value?.trim()) {
    return undefined;
  }

  return value.trim();
}

async function authRequest(
  path: string,
  init: RequestInit,
  captureTokens: boolean,
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

  if (!response.ok) {
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

  if (captureTokens) {
    const accessToken = readTokenFromResponseHeaders(
      response.headers,
      "st-access-token",
    );

    if (accessToken) {
      setSessionTokens({
        accessToken,
        refreshToken: readTokenFromResponseHeaders(
          response.headers,
          "st-refresh-token",
        ),
      });
    }
  }

  return response;
}

export async function signIn(email: string, password: string): Promise<void> {
  await authRequest(
    "/signin",
    {
      method: "POST",
      body: JSON.stringify({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password },
        ],
      }),
    },
    true,
  );
}

/**
 * Exchanges the refresh token for a fresh session. Called when an API
 * request is rejected with 401, or pre-emptively when the access token is
 * about to expire. Never throws: on failure the session is cleared so the
 * underlying 401 flows back to the guards, which take the user to login
 * instead of leaving error screens behind.
 */
export async function refreshSession(): Promise<void> {
  const refreshToken = getSessionTokens()?.refreshToken;

  if (!refreshToken) {
    clearSession();

    return;
  }

  try {
    await authRequest(
      "/session/refresh",
      {
        method: "POST",
        headers: { "st-refresh-token": refreshToken },
        body: JSON.stringify({}),
      },
      true,
    );
  } catch (error) {
    // Expired/revoked refresh token or unreachable core - the session is
    // unusable either way.
    console.warn("Token refresh failed; clearing the session", error);
    clearSession();
  }
}

export function signOut(): void {
  // The recipes clear the session server-side on signout with the session
  // handle; with header transfer the app clears its own tokens. Revoking the
  // session server-side is a follow-up.
  clearSession();
}

export async function resendVerificationEmail(): Promise<void> {
  await authRequest(
    "/send-verification-email",
    {
      method: "POST",
      body: JSON.stringify({}),
    },
    false,
  );
}

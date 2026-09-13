const SUPERTOKENS_URL = process.env.SUPERTOKENS_URL || "http://localhost";
const VERIFY_TIMEOUT_MS = 5000;

export function parseBearerToken(
  authorizationValue?: string,
): string | undefined {
  if (!authorizationValue) {
    return undefined;
  }

  const match = /^Bearer[ \t]+(\S+)$/i.exec(authorizationValue);

  return match ? match[1].trim() : undefined;
}

/**
 * Verifies a Supertokens access token against the session core and returns
 * the owning user id. Native clients cannot read the cookie session (iOS
 * never surfaces Set-Cookie), so they authenticate with the access token as
 * an Authorization header instead.
 */
export async function verifyAccessToken(
  accessToken: string,
): Promise<string | undefined> {
  try {
    const response = await fetch(`${SUPERTOKENS_URL}/recipe/session/verify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        doAntiCsrfCheck: false,
        enableAntiCsrf: false,
        // Check the database so revoked sessions (e.g. after sign out)
        // are rejected too.
        checkDatabase: true,
      }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });

    if (!response.ok) {
      return undefined;
    }

    const body = (await response.json()) as {
      session?: { userId?: string };
      status?: string;
    };

    if (body.status === "OK" && typeof body.session?.userId === "string") {
      return body.session.userId;
    }
  } catch {
    // Core unreachable or an unexpected response - deny the request.
  }

  return undefined;
}

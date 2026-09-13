import { storage } from "src/core/storage";

const SESSION_STORAGE_KEY = "session.tokens";

export interface SessionTokens {
  accessToken: string;
  refreshToken?: string;
}

let tokens: SessionTokens | undefined;

function loadStoredTokens(): void {
  const stored = storage.getItem(SESSION_STORAGE_KEY);

  if (!stored) {
    return;
  }

  try {
    const parsed = JSON.parse(stored) as unknown;

    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as SessionTokens).accessToken === "string"
    ) {
      tokens = parsed as SessionTokens;
    }
  } catch {
    tokens = undefined;
  }
}

function persistTokens(): void {
  if (tokens) {
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(tokens));
  } else {
    storage.removeItem(SESSION_STORAGE_KEY);
  }
}

/**
 * Supertokens delivers sessions to (non-browser) clients as access/refresh
 * tokens via response headers (st-access-token / st-refresh-token) when the
 * request carries `st-auth-mode: header` - no cookies involved, so it works
 * on iOS where Set-Cookie is invisible to JS. Store and replay the access
 * token as an Authorization header; refresh with the refresh token.
 */
export function setSessionTokens(next: SessionTokens): void {
  tokens = next;
  persistTokens();
}

export function clearSession(): void {
  tokens = undefined;
  persistTokens();
}

export function getSessionTokens(): SessionTokens | undefined {
  return tokens;
}

export function hasSession(): boolean {
  return tokens !== undefined && tokens.accessToken.length > 0;
}

loadStoredTokens();
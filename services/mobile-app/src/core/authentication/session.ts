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

const BASE64URL_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/** Decodes a base64url segment to a byte string (values 0-255 per char). */
function base64UrlDecode(input: string): string {
  let bits = 0;
  let bitCount = 0;
  let out = "";

  for (const char of input.replace(/=+$/, "")) {
    const value = BASE64URL_ALPHABET.indexOf(char);

    if (value < 0) {
      continue;
    }

    bits = (bits << 6) | value;
    bitCount += 6;

    if (bitCount >= 8) {
      bitCount -= 8;
      out += String.fromCharCode((bits >> bitCount) & 0xff);
    }
  }

  return out;
}

/**
 * Returns the access token's expiry as epoch millis, or undefined when it
 * cannot be read. The token is a JWT (base64url payload with a JSON body);
 * the claims we care about hold ASCII digits, so a byte-level scan of the
 * decoded payload is enough - no full UTF-8 decode needed.
 */
export function accessTokenExpiryMs(token: string): number | undefined {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return undefined;
  }

  const payload = base64UrlDecode(parts[1]);

  const expiryTime = /"expiryTime"\s*:\s*(\d+)/.exec(payload);
  const exp = /"exp"\s*:\s*(\d+)/.exec(payload);

  if (expiryTime) {
    return Number(expiryTime[1]);
  }

  if (exp) {
    return Number(exp[1]) * 1000;
  }

  return undefined;
}

loadStoredTokens();

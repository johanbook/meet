import {
  BlogsApi,
  BookingsApi,
  ChatsApi,
  Configuration,
  FetchAPI,
  JournalApi,
  NotificationsApi,
  OrganizationsApi,
  ProfileApi,
  SettingsApi,
  TimeSeriesApi,
} from "src/api";
import { config } from "src/config";
import { refreshSession } from "src/core/authentication/authApi";
import { getSessionTokens, hasSession } from "src/core/authentication/session";
import { Logger } from "src/core/logging";

declare global {
  interface Response {
    errorMessage?: string;
  }
}

const logger = new Logger("API");

// Supertokens header-mode session: the access token travels as an
// Authorization bearer header (validated by the gateway's /authenticate),
// with st-auth-mode marking the transfer preference for session creation.
function withSessionHeaders(init?: RequestInit): RequestInit {
  const options = init ?? {};
  const headers = new Headers(options.headers);

  const accessToken = getSessionTokens()?.accessToken;

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
    headers.set("st-auth-mode", "header");
  }

  return { ...options, headers };
}

// A single token refresh attempt per 401, guarded against loops: we only
// retry when we had a token, refreshed it, and got a new one.
let refreshInFlight = false;

const fetchApi: FetchAPI = async (url, init) => {
  const hadToken = hasSession();
  const response = await fetch(url, withSessionHeaders(init));

  if (response.status === 401 && hadToken && !refreshInFlight) {
    refreshInFlight = true;

    try {
      await refreshSession();

      if (hasSession()) {
        return await fetch(url, withSessionHeaders(init));
      }
    } finally {
      refreshInFlight = false;
    }
  }

  return response;
};

const configApi = new Configuration({
  basePath: config.API.BASE_URL,
  fetchApi,
  middleware: [
    {
      post: async ({ response }) => {
        if (response.ok) {
          return;
        }

        // 401s are part of normal operation
        if (response.status === 401) {
          return;
        }

        let message: string | undefined;
        const contentType = response.headers.get("content-type");

        if (contentType?.startsWith("application/json")) {
          const json = (await response.json()) as { message?: unknown };

          if (typeof json.message === "string") {
            message = json.message;
          }
        } else {
          message = await response.text();
        }

        response.errorMessage = message;

        logger.error("Request failed", {
          message,
          status: response.status,
          url: response.url,
        });

        return response;
      },
    },
  ],
});

export const blogsApi = new BlogsApi(configApi);
export const chatsApi = new ChatsApi(configApi);
export const bookingsApi = new BookingsApi(configApi);
export const journalApi = new JournalApi(configApi);
export const notificationsApi = new NotificationsApi(configApi);
export const organizationsApi = new OrganizationsApi(configApi);
export const profileApi = new ProfileApi(configApi);
export const settingsApi = new SettingsApi(configApi);
export const timeSeriesApi = new TimeSeriesApi(configApi);

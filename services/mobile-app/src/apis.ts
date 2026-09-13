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
import {
  getCookieValue,
  getSessionCookieHeader,
  updateSessionFromResponseHeaders,
} from "src/core/authentication/session";
import { Logger } from "src/core/logging";

declare global {
  interface Response {
    errorMessage?: string;
  }
}

const logger = new Logger("API");

// Attaches the Supertokens session cookie (and anti-CSRF header) to every
// request. The web app relies on the browser doing this implicitly for
// same-origin requests; on mobile the session travels as an explicit header.
const fetchApi: FetchAPI = async (url, init) => {
  const options = init ?? {};
  const headers = new Headers(options.headers);

  // Native: replay the session cookie jar as a header. Web: the browser
  // attaches cookies automatically for same-origin requests.
  const cookieHeader = getSessionCookieHeader();

  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  const antiCsrfToken = getCookieValue("sAntiCsrfToken");
  const method = (options.method || "GET").toUpperCase();

  if (antiCsrfToken && method !== "GET") {
    headers.set("anti-csrf", antiCsrfToken);
  }

  const response = await fetch(url, { ...options, headers });

  // The API never rotates cookies, but capture any Set-Cookie just in case.
  updateSessionFromResponseHeaders(response.headers);

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
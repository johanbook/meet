import {
  BlogsApi,
  BookingsApi,
  ChatsApi,
  Configuration,
  JournalApi,
  NotificationsApi,
  OrganizationsApi,
  ProfileApi,
  SettingsApi,
  TimeSeriesApi,
} from "src/api";
import { Logger } from "src/core/logging";

declare global {
  interface Response {
    errorMessage?: string;
  }
}

const logger = new Logger("API");

const config = new Configuration({
  basePath: window.location.origin,
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

        let message = "";
        const contentType = response.headers.get("content-type");

        if (contentType?.startsWith("application/json")) {
          const json = await response.json();
          message = json.message;
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

export const blogsApi = new BlogsApi(config);
export const chatsApi = new ChatsApi(config);
export const bookingsApi = new BookingsApi(config);
export const journalApi = new JournalApi(config);
export const notificationsApi = new NotificationsApi(config);
export const organizationsApi = new OrganizationsApi(config);
export const profileApi = new ProfileApi(config);
export const settingsApi = new SettingsApi(config);
export const timeSeriesApi = new TimeSeriesApi(config);

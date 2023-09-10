import {
  BlogsApi,
  ChatsApi,
  Configuration,
  JournalApi,
  OrganizationsApi,
  ProfileApi,
  SettingsApi,
} from "src/api";
import { Logger } from "src/core/logging";

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

        logger.error("Request failed", {
          status: response.status,
          url: response.url,
        });
      },
    },
  ],
});

export const blogsApi = new BlogsApi(config);
export const chatsApi = new ChatsApi(config);
export const journalApi = new JournalApi(config);
export const organizationsApi = new OrganizationsApi(config);
export const profileApi = new ProfileApi(config);
export const settingsApi = new SettingsApi(config);

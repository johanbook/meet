import {
  BlogsApi,
  ChatsApi,
  Configuration,
  JournalApi,
  MatchesApi,
  ProfileApi,
  SettingsApi,
} from "src/api";

const config = new Configuration({
  basePath: window.location.origin,
  middleware: [],
});

export const blogsApi = new BlogsApi(config);
export const chatsApi = new ChatsApi(config);
export const journalApi = new JournalApi(config);
export const matchesApi = new MatchesApi(config);
export const profileApi = new ProfileApi(config);
export const settingsApi = new SettingsApi(config);

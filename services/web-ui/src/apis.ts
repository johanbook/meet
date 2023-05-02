import {
  ChatsApi,
  Configuration,
  MatchesApi,
  PhotosApi,
  ProfileApi,
  SwipesApi,
} from "src/api";

const config = new Configuration({ basePath: window.location.origin });

export const chatsApi = new ChatsApi(config);
export const matchesApi = new MatchesApi(config);
export const profileApi = new ProfileApi(config);
export const photosApi = new PhotosApi(config);
export const swipesApi = new SwipesApi(config);

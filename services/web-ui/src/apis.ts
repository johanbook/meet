import { Configuration, PhotosApi, ProfileApi } from "src/api";

const config = new Configuration({ basePath: window.location.origin });

export const profileApi = new ProfileApi(config);
export const photosApi = new PhotosApi(config);

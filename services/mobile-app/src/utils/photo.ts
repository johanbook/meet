import { launchImageLibraryAsync } from "expo-image-picker";

export interface PhotoFile {
  name: string;
  type: string;
  uri: string;
}

/**
 * Opens the platform image picker and returns the selected images as
 * FormData-compatible file descriptors (RN fetch accepts { uri, name, type }
 * parts).
 */
export async function pickImages(
  options: {
    multiple?: boolean;
  } = {},
): Promise<PhotoFile[]> {
  const result = await launchImageLibraryAsync({
    allowsMultipleSelection: options.multiple ?? true,
    mediaTypes: "images",
  });

  if (result.canceled) {
    return [];
  }

  return result.assets.map((asset) => ({
    name: asset.fileName?.includes(".")
      ? asset.fileName
      : `${asset.fileName || "photo"}.jpg`,
    type: "image/jpeg",
    uri: asset.uri,
  }));
}

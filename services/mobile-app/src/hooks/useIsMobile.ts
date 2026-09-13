import { Platform, useWindowDimensions } from "react-native";

export function useIsMobile(): boolean {
  const { width } = useWindowDimensions();

  if (Platform.OS !== "web") {
    return true;
  }

  return width < 850;
}
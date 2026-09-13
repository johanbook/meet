import { ReactNode } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { useTheme } from "src/core/theme";

interface InfiniteListProps<T> {
  emptyComponent: ReactNode;
  hasNextPage: boolean;
  items: T[];
  keyOf?: (item: T) => string;
  onEndReached: () => void;
  renderItem: (item: T, index: number) => ReactNode;
}

function defaultKeyOf<T>(item: T): string {
  if (item && typeof item === "object") {
    const id = (item as Record<string, unknown>).id;

    if (typeof id === "string" || typeof id === "number") {
      return String(id);
    }
  }

  return JSON.stringify(item);
}

/** FlatList that loads the next page when the end of the list is reached. */
export function InfiniteList<T>({
  emptyComponent,
  hasNextPage,
  items,
  keyOf,
  onEndReached,
  renderItem,
}: InfiniteListProps<T>) {
  const theme = useTheme();
  const keyExtractor = keyOf ?? defaultKeyOf;

  if (items.length === 0) {
    return <>{emptyComponent}</>;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      ListFooterComponent={
        hasNextPage ? (
          <View style={{ alignItems: "center", padding: 24 }}>
            <ActivityIndicator color={theme.palette.primary} />
          </View>
        ) : null
      }
      onEndReached={hasNextPage ? () => onEndReached() : undefined}
      renderItem={({ item, index }) =>
        renderItem(item, index) as React.ReactElement
      }
    />
  );
}
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { chatsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Fab, List, ListItem, Skeleton, Typography } from "src/components/ui";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";
import { ConversationListItem } from "src/features/chat";

export default function ChatListPage() {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: [CacheKeyEnum.Chats],
    queryFn: () => chatsApi.getConversations(),
  });

  const fab = <Fab onPress={() => router.push("/chat/create")} />;

  if (isLoading) {
    return (
      <Screen fab={fab} title="Chats">
        <List>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <ListItem key={index}>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Skeleton borderRadius={20} height={40} width={40} />
                <View style={{ flex: 1, gap: 4, marginLeft: 8 }}>
                  <Skeleton height={16} width="60%" />
                  <Skeleton height={14} width="85%" />
                </View>
              </View>
            </ListItem>
          ))}
        </List>
      </Screen>
    );
  }

  if (error || !data) {
    return (
      <Screen fab={fab} title="Chats">
        <ErrorView message="Unable to get chats" />
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen fab={fab} title="Chats">
        <View style={{ alignItems: "center", padding: 48 }}>
          <Typography color="textSecondary">You have no chats</Typography>
        </View>
      </Screen>
    );
  }

  return (
    <Screen fab={fab} title="Chats">
      <ScrollView style={{ flex: 1 }}>
        <List>
          {data.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              data={conversation}
            />
          ))}
        </List>
      </ScrollView>
    </Screen>
  );
}
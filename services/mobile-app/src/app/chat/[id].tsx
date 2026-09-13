import { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { chatsApi } from "src/apis";
import { PostChatMessageCommand } from "src/api";
import { Screen } from "src/components/nav/Screen";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import { IconButton, Skeleton, TextField, Typography } from "src/components/ui";
import {
  NotificationEventEnum,
  useHandleNotification,
} from "src/core/notifications";
import {
  CacheKeyEnum,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { ErrorView } from "src/views/ErrorView";

export default function ChatPage() {
  const { id = "" } = useLocalSearchParams<{ id?: string }>();
  const theme = useTheme();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef<ScrollView>(null);
  const viewportHeightRef = useRef(0);

  const query = useQuery({
    queryKey: ["chat", id],
    queryFn: () => chatsApi.getChatMessages({ conversationId: id }),
  });

  function handleRefresh(): void {
    query.refetch();
    queryClient.invalidateQueries({
      queryKey: [CacheKeyEnum.Chats],
    });
  }

  useHandleNotification({
    onCondition: (event) =>
      String((event.data as { senderId?: unknown }).senderId) === id,
    onNotification: handleRefresh,
    type: NotificationEventEnum.NewChatMessage,
  });

  const [value, setValue] = useState("");

  const sendMutation = useMutation({
    mutationFn: (postChatMessageCommand: PostChatMessageCommand) =>
      chatsApi.postChatMessage({ postChatMessageCommand }),
    onError: () => snackbar.error("Unable to send message"),
  });

  async function handleSend(): Promise<void> {
    const message = value;

    // Not optimistic: clear the input, await the request, then refetch.
    setValue("");

    try {
      await sendMutation.mutateAsync({
        chatConversationId: id,
        message,
      });
      handleRefresh();
    } catch {
      // Restore the message so it is not lost when sending failed.
      setValue(message);
    }
  }

  if (query.error) {
    return (
      <Screen navBackTo="/chat">
        <ErrorView message="Unable to get chats" />
      </Screen>
    );
  }

  if (query.isLoading && query.data === undefined) {
    return (
      <Screen navBackTo="/chat">
        <ScrollView style={{ flex: 1 }}>
          <View style={{ gap: 8, padding: 8 }}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={{
                  alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
                  padding: 8,
                }}
              >
                <Skeleton height={28} width="60%" />
              </View>
            ))}
          </View>
        </ScrollView>
      </Screen>
    );
  }

  const messages = query.data ?? [];

  return (
    <Screen navBackTo="/chat">
      <View style={{ flex: 1 }}>
        <View
          onLayout={(event) => {
            viewportHeightRef.current = event.nativeEvent.layout.height;
          }}
          style={{ flex: 1 }}
        >
          <ScrollView
            onContentSizeChange={(_contentWidth, contentHeight) => {
              // Pin the conversation to the newest message once the content
              // outgrows the viewport (scrollToEnd is a no-op for short
              // content, so an empty conversation is unaffected).
              if (contentHeight > viewportHeightRef.current) {
                scrollViewRef.current?.scrollToEnd({ animated: false });
              }
            }}
            scrollViewRef={scrollViewRef as React.RefObject<ScrollView>}
            style={{ flex: 1 }}
          >
            {messages.length === 0 ? (
              <View style={{ padding: 32 }}>
                <Typography color="textSecondary">No messages yet</Typography>
              </View>
            ) : messages.map((message) => {
              const bubble = (
                <View
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                    borderRadius: 3,
                    borderWidth: 1,
                    maxWidth: "80%",
                    padding: 8,
                  }}
                >
                  <Text
                    style={{
                      color: theme.palette.text.primary,
                      fontSize: 16,
                    }}
                  >
                    {message.message}
                  </Text>
                </View>
              );

              if (message.sentByCurrentUser) {
                return (
                  <View
                    key={message.id}
                    style={{ alignItems: "flex-end", padding: 8 }}
                  >
                    {bubble}
                  </View>
                );
              }

              return (
                <View
                  key={message.id}
                  style={{ alignItems: "flex-start", padding: 8 }}
                >
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <ProfileAvatar
                      name={message.profile.name}
                      size={28}
                      src={message.profile.imageUrl}
                    />
                    <View style={{ marginLeft: 8 }}>{bubble}</View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            borderTopColor: theme.palette.divider,
            borderTopWidth: 1,
            flexDirection: "row",
            paddingHorizontal: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextField
              multiline={false}
              onValueChange={setValue}
              placeholder="Type a message"
              value={value}
            />
          </View>
          <IconButton
            disabled={value.trim().length === 0}
            icon="send"
            onPress={() => {
              void handleSend();
            }}
          />
        </View>
      </View>
    </Screen>
  );
}
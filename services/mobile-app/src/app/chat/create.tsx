import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { chatsApi, organizationsApi, profileApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import { Button, Icon, Skeleton, Typography } from "src/components/ui";
import {
  CacheKeyEnum,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { ErrorView } from "src/views/ErrorView";

interface MemberOption {
  id: number;
  imageUrl?: string;
  label: string;
}

export default function CreateChatPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const membersQuery = useQuery({
    queryKey: ["members"],
    queryFn: () => organizationsApi.getCurrentOrganizationMembers(),
  });

  const meQuery = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  const [selected, setSelected] = useState<MemberOption[]>([]);

  const createChatMutation = useMutation({
    mutationFn: () =>
      chatsApi.createConversation({
        createChatCommand: {
          profileIds: selected.map((member) => member.id),
        },
      }),
    onError: () => snackbar.error("Unable to create chat"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeyEnum.Chats] });
      snackbar.success("Chat created");
      router.replace("/chat");
    },
  });

  const isLoading = membersQuery.isLoading || meQuery.isLoading;
  const hasError = membersQuery.error || meQuery.error;

  if (hasError) {
    return (
      <Screen navBackTo="/chat" title="New chat">
        <ErrorView />
      </Screen>
    );
  }

  if (isLoading) {
    return (
      <Screen navBackTo="/chat" title="New chat">
        <View style={{ gap: 16, padding: theme.spacing(2) }}>
          <Skeleton height={14} width="40%" />
          <Skeleton height={40} width="80%" />
          <Skeleton height={40} width="70%" />
          <Skeleton height={40} width="90%" />
        </View>
      </Screen>
    );
  }

  const members = membersQuery.data ?? [];
  const meId = meQuery.data?.id;
  const options = members
    .map((member) => ({
      id: member.profileId,
      imageUrl: member.imageUrl,
      label: member.name,
    }))
    .filter(
      (option) =>
        option.id !== meId &&
        !selected.some((picked) => picked.id === option.id),
    );

  return (
    <Screen navBackTo="/chat" title="New chat">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 16, padding: theme.spacing(2) }}>
          <Typography color="textSecondary" variant="caption">
            Members
          </Typography>

          {selected.length > 0 ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {selected.map((member) => (
                <Pressable
                  accessibilityRole="button"
                  key={member.id}
                  onPress={() =>
                    setSelected(
                      selected.filter((item) => item.id !== member.id),
                    )
                  }
                  style={({ pressed }) => ({
                    alignItems: "center",
                    backgroundColor: theme.palette.primary,
                    borderRadius: 16,
                    flexDirection: "row",
                    margin: 4,
                    opacity: pressed ? 0.7 : 1,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  })}
                >
                  <ProfileAvatar
                    name={member.label}
                    size={20}
                    src={member.imageUrl}
                  />
                  <Typography variant="body2">{member.label}</Typography>
                  <Icon name="close" size={14} />
                </Pressable>
              ))}
            </View>
          ) : null}

          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option.id}
              onPress={() => setSelected([...selected, option])}
              style={({ pressed }) => ({
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                borderBottomColor: theme.palette.divider,
                borderBottomWidth: 1,
                flexDirection: "row",
                opacity: pressed ? 0.6 : 1,
                paddingHorizontal: 12,
                paddingVertical: 8,
              })}
            >
              <ProfileAvatar
                name={option.label}
                size={32}
                src={option.imageUrl}
              />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Typography variant="body2">{option.label}</Typography>
              </View>
            </Pressable>
          ))}

          <Button
            disabled={selected.length === 0}
            loading={createChatMutation.isPending}
            onPress={() => createChatMutation.mutate()}
          >
            Create
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}

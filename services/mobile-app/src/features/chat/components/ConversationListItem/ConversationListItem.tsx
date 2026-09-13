import { useRouter } from "expo-router";
import { View } from "react-native";

import { ChatConversationDetails } from "src/api";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import { ListItem, ListItemText } from "src/components/ui";

interface ConversationListItemProps {
  data: ChatConversationDetails;
}

export function ConversationListItem({ data }: ConversationListItemProps) {
  const router = useRouter();

  const name =
    data.name || data.profiles.map((profile) => profile.name).join(", ");
  const imageUrl = data.imageUrl || data.profiles[0]?.imageUrl;

  return (
    <ListItem onPress={() => router.replace(`/chat/${data.id}`)}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <ProfileAvatar name={name} src={imageUrl} />
        <ListItemText primary={name} secondary={data.lastMessage} />
      </View>
    </ListItem>
  );
}

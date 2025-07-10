import { ReactElement, useState } from "react";
import { useNavigate } from "react-router";

import { Autocomplete, Box, TextField } from "@mui/material";

import { chatsApi, organizationsApi, profileApi } from "src/apis";
import { ProfileAvatar } from "src/components/shared";
import { Button } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import {
  CacheKeysConstants,
  useMutation,
  useQuery,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";

import { CreateChatPageNav } from "./CreateChatPage.nav";
import { CreateChatPageSkeleton } from "./CreateChatPage.skeleton";

interface Option {
  id: number;
  imageUrl?: string;
  label: string;
}

export function CreateChatPageContainer(): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("chat.create");

  const queryClient = useQueryClient();

  const { error, data, isPending } = useQuery({
    queryKey: ["members"],
    queryFn: () => organizationsApi.getCurrentOrganizationMembers(),
  });

  const currentProfileQuery = useQuery({
    queryKey: [CacheKeysConstants.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  const [members, setMembers] = useState<Option[]>([]);

  const createChatMutation = useMutation({
    onError: () => snackbar.error(t("create.error")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeysConstants.Chats] });
      snackbar.success(t("create.success"));
      navigate("/chat");
    },
    mutationFn: () =>
      chatsApi.createConversation({
        createChatCommand: {
          profileIds: members.map((member) => member.id),
        },
      }),
  });

  if (error || currentProfileQuery.error) {
    return (
      <CreateChatPageNav>
        <ErrorView />
      </CreateChatPageNav>
    );
  }

  if (isPending || currentProfileQuery.isPending) {
    return (
      <CreateChatPageNav>
        <CreateChatPageSkeleton />
      </CreateChatPageNav>
    );
  }

  const options = data
    .map((x) => ({ id: x.profileId, label: x.name, imageUrl: x.imageUrl }))
    .filter((x) => {
      if (x.id === currentProfileQuery.data.id) {
        return false;
      }

      return !members.some((member) => member.id === x.id);
    });

  return (
    <CreateChatPageNav>
      <Autocomplete
        multiple
        onChange={(_, newValue) => setMembers(newValue)}
        options={options}
        renderInput={(params) => <TextField label="Members" {...params} />}
        renderOption={(props, option) => (
          <Box {...props} component="li">
            <ProfileAvatar name={option.label} src={option.imageUrl} />
            <Box component="span" sx={{ pl: 2 }}>
              {option.label}
            </Box>
          </Box>
        )}
        sx={{ pt: 1 }}
        value={members}
      />

      <Button
        disabled={members.length === 0}
        loading={createChatMutation.isPending}
        onClick={() => createChatMutation.mutate()}
        sx={{ mt: 2 }}
        variant="contained"
      >
        {t("create.button")}
      </Button>
    </CreateChatPageNav>
  );
}

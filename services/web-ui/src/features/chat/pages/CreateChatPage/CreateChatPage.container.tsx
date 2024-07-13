import { ReactElement, useState } from "react";
import { useNavigate } from "react-router";

import { Autocomplete, TextField } from "@mui/material";

import { chatsApi, organizationsApi, profileApi } from "src/apis";
import { Button } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useMutation, useQuery } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";

import { CreateChatPageNav } from "./CreateChatPage.nav";
import { CreateChatPageSkeleton } from "./CreateChatPage.skeleton";

interface Option {
  id: number;
  label: string;
}

export function CreateChatPageContainer(): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("chat-create");

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
    .map((x) => ({ id: x.profileId, label: x.name }))
    .filter((x) => x.id !== currentProfileQuery.data.id);

  return (
    <CreateChatPageNav>
      <Autocomplete
        multiple
        onChange={(_, newValue) => setMembers(newValue)}
        options={options}
        renderInput={(params) => <TextField label="Members" {...params} />}
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

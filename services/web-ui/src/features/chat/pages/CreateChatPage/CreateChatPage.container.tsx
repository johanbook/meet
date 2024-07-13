import { ReactElement, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { chatsApi, organizationsApi } from "src/apis";
import { Button } from "src/components/ui";
import { useMutation, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { CreateChatPageNav } from "./CreateChatPage.nav";
import { CreateChatPageSkeleton } from "./CreateChatPage.skeleton";

interface Option {
  id: number;
  label: string;
}

export function CreateChatPageContainer(): ReactElement {
  const { error, data, isPending } = useQuery({
    queryKey: ["members"],
    queryFn: () => organizationsApi.getCurrentOrganizationMembers(),
  });

  const [members, setMembers] = useState<Option[]>([]);

  const createChatMutation = useMutation({
    mutationFn: () =>
      chatsApi.createConversation({
        createChatCommand: {
          profileIds: members.map((member) => member.id),
        },
      }),
  });

  if (error) {
    return (
      <CreateChatPageNav>
        <ErrorView />
      </CreateChatPageNav>
    );
  }

  if (isPending) {
    return (
      <CreateChatPageNav>
        <CreateChatPageSkeleton />
      </CreateChatPageNav>
    );
  }

  const options = data.map((x) => ({ id: x.profileId, label: x.name }));

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
        Create
      </Button>
    </CreateChatPageNav>
  );
}

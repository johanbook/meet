import { FC, ReactElement, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

import {
  Book,
  Group,
  Groups,
  Logout,
  Palette,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { ProfileDetails, UpdateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { CurrentProfileAvatar } from "../CurrentProfileAvatar";

const NavItem = ({
  Icon,
  text,
  to,
}: {
  Icon: FC;
  text: string;
  to: string;
}) => (
  <ListItem disablePadding>
    <ListItemButton component={Link} to={to}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
}

export function CurrentProfileDetails({
  profile,
}: CurrentProfileDetailsProps): ReactElement {
  const { t } = useTranslation("profile");
  const mutation = useMutation({
    mutationFn: (updateProfileCommand: UpdateProfileCommand) =>
      profileApi.updateCurrentProfile({ updateProfileCommand }),
  });

  const [description, setDescription] = useState(profile.description);

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync(
      { description },
      {
        onError: () => snackbar.error(t("update.error")),
        onSuccess: () => {
          snackbar.success(t("update.success"));

          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.CurrentProfile],
          });
        },
      }
    );
  }

  const canSubmit = description !== profile.description && !mutation.isPending;

  return (
    <>
      <Center>
        <CurrentProfileAvatar src={profile.photo?.url} />
      </Center>

      <Center>
        <Typography sx={{ pt: 3 }} variant="h5">
          {profile.name}
        </Typography>
      </Center>

      <Center>
        <Typography gutterBottom>{profile.description}</Typography>
      </Center>

      <List sx={{ pt: 3 }}>
        <NavItem Icon={Palette} text="Appearence" to="/profile/appearence" />
        <NavItem Icon={Group} text="Current group" to="/group" />
        <NavItem Icon={Groups} text="Groups" to="/group/list" />
        <NavItem Icon={Book} text="Journal" to="/profile/journal" />
        <NavItem Icon={Settings} text="Settings" to="/profile/settings" />
        <NavItem Icon={Logout} text="Log out" to="/logout" />
      </List>

      <form style={{ display: "none" }}>
        <TextField
          fullWidth
          disabled={mutation.isPending}
          label={t("description.label")}
          margin="normal"
          multiline
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t("description.placeholder") ?? undefined}
          rows={4}
          value={description}
        />

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            disabled={!canSubmit}
            onClick={handleSubmit}
            type="submit"
            variant="outlined"
          >
            {t("save")}
          </Button>
        </Box>
      </form>
    </>
  );
}

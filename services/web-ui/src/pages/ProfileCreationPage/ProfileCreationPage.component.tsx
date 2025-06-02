import React from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { DatePicker } from "src/components/ui/DatePicker";
import { VerticalCenter } from "src/components/ui/VerticalCenter";
import { useTranslation } from "src/core/i18n";

import { ProfileCreationPageNav } from "./ProfileCreationPage.nav";

export interface ProfileCreationPageComponentProps {
  form: CreateProfileCommand;
  onCreateProfile: () => Promise<void>;
  setForm: (value: CreateProfileCommand) => void;
}

export function ProfileCreationPageComponent({
  form,
  onCreateProfile,
  setForm,
}: ProfileCreationPageComponentProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onCreateProfile();
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <ProfileCreationPageNav>
      <VerticalCenter>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: isMobile ? "100%" : "600px",
            px: isMobile ? 2 : 4,
            py: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            color="primary"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            {t("welcome.header")}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {t("welcome.description")}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              autoComplete="given-name"
              fullWidth
              label={t("name.label")}
              name="name"
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder={t("name.placeholder")}
              required
              value={form.name}
              variant="outlined"
              size="medium"
            />

            <DatePicker
              fullWidth
              label={t("date-of-birth.label")}
              maxDate={maxDate}
              onChange={(date) => setForm({ ...form, dateOfBirth: date })}
              value={form.dateOfBirth}
            />

            <TextField
              fullWidth
              label={t("description.label")}
              multiline
              name="description"
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              placeholder={t("description.placeholder")}
              required
              rows={4}
              value={form.description}
              variant="outlined"
              size="medium"
            />

            <Button
              color="primary"
              disabled={!form.name || !form.description}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {t("welcome.continue")}
            </Button>
          </Box>
        </Box>
      </VerticalCenter>
    </ProfileCreationPageNav>
  );
}

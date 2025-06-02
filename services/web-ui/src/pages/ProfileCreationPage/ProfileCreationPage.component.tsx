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

const MIN_AGE = 14;

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
  maxDate.setFullYear(maxDate.getFullYear() - MIN_AGE);

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
            align="center"
            component="h1"
            color="primary"
            gutterBottom
            sx={{
              color: "white",
              mb: 4,
              textShadow: `1px 1px 1px black`,
            }}
            variant="h3"
          >
            {t("welcome.header")}
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={({ palette }) => ({
              color: "white",
              mb: 4,
              textShadow: `1px 1px 1px ${palette.primary.main}`,
            })}
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
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
              value={form.name}
              variant="outlined"
            />

            <DatePicker
              fullWidth
              label={t("date-of-birth.label")}
              maxDate={maxDate}
              onChange={(date) => setForm({ ...form, dateOfBirth: date })}
              value={form.dateOfBirth}
            />

            <TextField
              color="success"
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
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
              value={form.description}
              variant="outlined"
            />

            <Button
              disabled={!form.name || !form.description}
              fullWidth
              size="large"
              type="submit"
              sx={() => ({
                background: "white",
                fontWeight: 600,
                mt: 2,
              })}
              variant="outlined"
            >
              {t("welcome.continue")}
            </Button>
          </Box>
        </Box>
      </VerticalCenter>
    </ProfileCreationPageNav>
  );
}

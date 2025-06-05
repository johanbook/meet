import React, { useState } from "react";

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
import { getDateYearsAgo } from "src/utils/time";

import { ProfileCreationPageNav } from "./ProfileCreationPage.nav";
import { ProfileCreationAvatar } from "./components/ProfileCreationAvatar/ProfileCreationAvatar";

const MIN_AGE = 14;

export interface ProfileCreationPageComponentProps {
  form: CreateProfileCommand;
  onCreateProfile: () => Promise<void>;
  setForm: (value: CreateProfileCommand) => void;
  setPhoto: (photo: File) => void;
}

export function ProfileCreationPageComponent({
  form,
  onCreateProfile,
  setForm,
  setPhoto,
}: ProfileCreationPageComponentProps): React.ReactElement {
  const { t } = useTranslation("profile-creation");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [photoPreview, setPhotoPreview] = useState<string>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onCreateProfile();
  };

  const handlePhotoChange = (photo: File) => {
    setPhoto(photo);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(photo);
  };

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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProfileCreationAvatar
                onChange={handlePhotoChange}
                src={photoPreview}
              />
            </Box>

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
              maxDate={getDateYearsAgo(MIN_AGE)}
              onChange={(date) => setForm({ ...form, dateOfBirth: date })}
              value={form.dateOfBirth}
            />

            <Button
              disabled={!form.name}
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

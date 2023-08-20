import React from "react";

import { Typography } from "@mui/material";

import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";
import { Link } from "src/components/ui";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { SettingsPage } from "../SettingsPage";
import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): React.ReactElement {
  const { t } = useTranslation("profile");
  const { error, data, isLoading, refetch } = useQuery(
    CacheKeysConstants.CurrentProfile,
    () => profileApi.getCurrentProfile()
  );

  if (error) {
    return (
      <>
        <ProfilePageHeader />
        <ErrorPage error={error} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ProfilePageHeader />
        <ProfilePageSkeleton />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <ProfilePageHeader />

        <ProfileCreator onCreateProfile={refetch} />
      </>
    );
  }

  return (
    <>
      <ProfilePageHeader />

      <CurrentProfileDetails profile={data} refetchData={refetch} />

      <SettingsPage />

      <Typography gutterBottom sx={{ paddingTop: 3 }} variant="h5">
        {t("group.header")}
      </Typography>

      <Link to="/group">{t("group.link.name")}</Link>
    </>
  );
}

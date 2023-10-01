import React from "react";

import { Skeleton, Typography } from "@mui/material";

import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";

export function ProfilePageSkeleton(): React.ReactElement {
  const { t } = useTranslation("profile");

  return (
    <>
      <Center>
        <Skeleton height={200} variant="circular" width={200} />
      </Center>

      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("description.title")}
      </Typography>

      <Skeleton height={200} />
    </>
  );
}

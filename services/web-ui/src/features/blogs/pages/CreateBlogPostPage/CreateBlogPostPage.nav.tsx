import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateBlogPostPageNavProps {
  children: ReactNode;
}

export function CreateBlogPostPageNav({
  children,
}: CreateBlogPostPageNavProps): ReactElement {
  const { t } = useTranslation("blog-creation");

  const appBarContent = (
    <>
      <IconButton
        component={Link}
        sx={{
          mr: 2,
        }}
        to="/"
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h5">{t("header")}</Typography>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}

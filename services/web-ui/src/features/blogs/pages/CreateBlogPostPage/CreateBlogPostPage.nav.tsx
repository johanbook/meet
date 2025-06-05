import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Nav } from "src/components/nav";

interface CreateBlogPostPageNavProps {
  children: ReactNode;
}

export function CreateBlogPostPageNav({
  children,
}: CreateBlogPostPageNavProps): ReactElement {
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
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}

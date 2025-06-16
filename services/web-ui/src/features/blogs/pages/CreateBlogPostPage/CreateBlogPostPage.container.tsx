import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { Box } from "@mui/material";

import { useTranslation } from "src/core/i18n";
import { useSnackbar } from "src/core/snackbar";

import { BlogPostForm } from "../../components/BlogPostForm";
import { CreateBlogPostPageNav } from "./CreateBlogPostPage.nav";

export function CreateBlogPostPageContainer(): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("blog");

  const handleSubmit = () => {
    snackbar.success(t("actions.create.success"));
    navigate("/");
  };

  return (
    <CreateBlogPostPageNav>
      <Box sx={{ py: 2, px: 2 }}>
        <BlogPostForm onAfterSubmit={handleSubmit} />
      </Box>
    </CreateBlogPostPageNav>
  );
}

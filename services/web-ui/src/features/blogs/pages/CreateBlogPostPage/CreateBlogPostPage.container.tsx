import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "src/core/i18n";
import { useSnackbar } from "src/core/snackbar";

import { CreateBlogPostPageComponent } from "./CreateBlogPostPage.component";
import { CreateBlogPostPageNav } from "./CreateBlogPostPage.nav";

export function CreateBlogPostPageContainer(): ReactElement {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("blog.creation");

  const handleSubmit = () => {
    snackbar.success(t("actions.create.success"));
    navigate("/");
  };

  return (
    <CreateBlogPostPageNav>
      <CreateBlogPostPageComponent onAfterSubmit={handleSubmit} />
    </CreateBlogPostPageNav>
  );
}

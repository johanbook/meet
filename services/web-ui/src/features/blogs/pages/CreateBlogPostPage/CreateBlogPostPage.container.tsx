import { ReactElement } from "react";

import { Box } from "@mui/material";

import { useMetaData } from "src/hooks/useMetaData";

import { BlogPostForm } from "../../components/BlogPostForm";
import { CreateBlogPostPageNav } from "./CreateBlogPostPage.nav";

export function CreateBlogPostPageContainer(): ReactElement {
  useMetaData({ title: "Create Post" });

  return (
    <CreateBlogPostPageNav>
      <Box sx={{ py: 2, px: 2 }}>
        <BlogPostForm />
      </Box>
    </CreateBlogPostPageNav>
  );
}

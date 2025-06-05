import { ReactElement } from "react";

import { Box } from "@mui/material";

import { BlogPostForm } from "../../components/BlogPostForm";
import { CreateBlogPostPageNav } from "./CreateBlogPostPage.nav";

export function CreateBlogPostPageContainer(): ReactElement {
  return (
    <CreateBlogPostPageNav>
      <Box sx={{ py: 2, px: 2 }}>
        <BlogPostForm />
      </Box>
    </CreateBlogPostPageNav>
  );
}

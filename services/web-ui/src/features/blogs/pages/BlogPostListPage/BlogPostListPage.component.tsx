import { Fragment, ReactElement } from "react";

import { Box } from "@mui/material";

import { BlogPostDetails } from "src/api";

import { BlogPost } from "../../components/BlogPost";
import { BlogPostForm } from "../../components/BlogPostForm";

interface BlogPostPageComponentProps {
  data: BlogPostDetails[][];
}

export function BlogPostPageComponent({
  data,
}: BlogPostPageComponentProps): ReactElement {
  return (
    <>
      <Box sx={{ py: 2, px: 2 }}>
        <BlogPostForm />
      </Box>

      {data.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          {group.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
    </>
  );
}

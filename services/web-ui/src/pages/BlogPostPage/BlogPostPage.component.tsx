import React from "react";

import { Avatar, Box, Card, Typography } from "@mui/material";

import { BlogPostDetails } from "src/api";
import { useTranslation } from "src/core/i18n";
import { timeSince } from "src/utils/time";

import { BlogPostForm } from "./components/BlogPostForm";

interface BlogPostPageComponentProps {
  data: BlogPostDetails[];
}

export function BlogPostPageComponent({
  data,
}: BlogPostPageComponentProps): React.ReactElement {
  const { t } = useTranslation("blog");

  return (
    <>
      <Box sx={{ paddingBottom: 2 }}>
        <BlogPostForm />
      </Box>

      {data.map((post) => (
        <Card
          key={post.id}
          sx={{ marginBottom: 2, padding: 2 }}
          variant="outlined"
        >
          <Box sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}>
            <Avatar />

            <Box sx={{ paddingLeft: 1 }}>
              <Typography>
                <b>{post.profile.name}</b> {t("published")}
              </Typography>
              <Typography variant="subtitle2">
                {timeSince(post.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Typography>{post.content}</Typography>
        </Card>
      ))}
    </>
  );
}

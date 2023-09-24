import React from "react";

import { Avatar, Box, Card, Typography } from "@mui/material";

import { BlogPostDetails } from "src/api";
import { Role, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { timeSince } from "src/utils/time";

import { BlogPostForm } from "./components/BlogPostForm";
import { BlogPostMenu } from "./components/BlogPostMenu";

interface BlogPostPageComponentProps {
  data: BlogPostDetails[][];
}

export function BlogPostPageComponent({
  data,
}: BlogPostPageComponentProps): React.ReactElement {
  const { t } = useTranslation("blog");

  const authorization = useAuthorization();

  return (
    <>
      <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
        <BlogPostForm />
      </Box>

      {data.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {group.map((post) => (
            <Card
              key={post.id}
              sx={{ marginBottom: 2, padding: 2 }}
              variant="outlined"
            >
              <Box
                sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}
              >
                <Avatar
                  imgProps={{ loading: "lazy" }}
                  src={post.profile.imageUrl}
                />

                <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
                  <Typography>
                    <b>{post.profile.name}</b> {t("published")}
                  </Typography>
                  <Typography variant="subtitle2">
                    {timeSince(post.createdAt)}
                  </Typography>
                </Box>

                {(post.ownedByCurrentUser ||
                  authorization.role === Role.Admin) && (
                  <BlogPostMenu id={post.id} />
                )}
              </Box>

              <Typography>{post.content}</Typography>

              {post.photos.map((photo) => (
                <img
                  alt={photo.description || "Blog post image"}
                  key={photo.id}
                  loading="lazy"
                  src={photo.url}
                  style={{
                    padding: 10,
                    minHeight: 100,
                    maxWidth: "100%",
                  }}
                />
              ))}
            </Card>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

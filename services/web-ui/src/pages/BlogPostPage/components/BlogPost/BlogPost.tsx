import { ReactElement, useState } from "react";

import { FavoriteBorder, ModeCommentOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { BlogPostDetails } from "src/api";
import { Role, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { timeSince } from "src/utils/time";

import { BlogPostCommentForm } from "../BlogPostCommentForm/BlogPostComment.form";
import { BlogPostMenu } from "../BlogPostMenu";

interface BlogPostProps {
  post: BlogPostDetails;
}

export function BlogPost({ post }: BlogPostProps): ReactElement {
  const [showComments, setShowComments] = useState(false);
  const { t } = useTranslation("blog");

  const authorization = useAuthorization();

  return (
    <Card key={post.id} sx={{ marginBottom: 2, padding: 2 }} variant="outlined">
      <Box sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}>
        <Avatar imgProps={{ loading: "lazy" }} src={post.profile.imageUrl} />

        <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
          <Typography>
            <b>{post.profile.name}</b> {t("published")}
          </Typography>
          <Typography variant="subtitle2">
            {timeSince(post.createdAt)}
          </Typography>
        </Box>

        {(post.ownedByCurrentUser || authorization.role === Role.Admin) && (
          <BlogPostMenu id={post.id} />
        )}
      </Box>

      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>

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

      <CardActions disableSpacing>
        <IconButton aria-label="like" disabled sx={{ display: "none" }}>
          <FavoriteBorder />
        </IconButton>

        <IconButton aria-label="comment" onClick={() => setShowComments(true)}>
          <ModeCommentOutlined />
        </IconButton>
      </CardActions>

      {post.comments.length > 0 && (
        <CardActions disableSpacing>
          <Button onClick={() => setShowComments(!showComments)}>
            {t(
              showComments ? "actions.hide-comments" : "actions.view-comments",
              { numComments: post.comments.length }
            )}
          </Button>
        </CardActions>
      )}

      <Collapse in={showComments}>
        <List>
          {post.comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>

              <ListItemText
                primary={comment.content}
                secondary={timeSince(comment.createdAt)}
              />
            </ListItem>
          ))}
        </List>

        <BlogPostCommentForm blogPostId={post.id} />
      </Collapse>
    </Card>
  );
}

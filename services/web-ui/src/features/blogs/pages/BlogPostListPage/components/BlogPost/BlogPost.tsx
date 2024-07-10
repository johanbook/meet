import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import { ModeCommentOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { BlogPostDetails } from "src/api";
import { Role, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { timeSince } from "src/utils/time";

import { BlogPostCommentForm } from "../BlogPostCommentForm/BlogPostComment.form";
import { BlogPostLikeButton } from "../BlogPostLikeButton/BlogPostLikeButton";
import { BlogPostMenu } from "../BlogPostMenu";
import { BlogPostPhotos } from "../BlogPostPhotos/BlogPostPhotos";

interface BlogPostProps {
  post: BlogPostDetails;
}

export function BlogPost({ post }: BlogPostProps): ReactElement {
  const [showComments, setShowComments] = useState(false);
  const { t } = useTranslation("blog");

  const authorization = useAuthorization();

  const firstReactions = [...post.reactions.names];
  const lastReaction = firstReactions.pop();

  return (
    <Box
      key={post.id}
      sx={{ mb: 2, py: 2, borderTop: 1, borderColor: "divider" }}
    >
      <Box sx={{ alignItems: "center", display: "flex", pb: 2, pl: 1 }}>
        <Link to={`/profile/${post.profile.id}`}>
          <Avatar imgProps={{ loading: "lazy" }} src={post.profile.imageUrl} />
        </Link>

        <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
          <Typography>
            <b>
              <Link
                to={`/profile/${post.profile.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {post.profile.name}
              </Link>
            </b>{" "}
            {t("published")}
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

      <BlogPostPhotos photos={post.photos} />

      <CardActions disableSpacing>
        <BlogPostLikeButton
          blogPostId={post.id}
          reactionId={post.reactions.currentProfileReactionId}
        />

        <IconButton aria-label="comment" onClick={() => setShowComments(true)}>
          <ModeCommentOutlined />
        </IconButton>
      </CardActions>

      {post.reactions.count > 0 && (
        <CardContent sx={{ py: 0 }}>
          <Typography variant="subtitle2">
            {t("reactions.count", {
              count: post.reactions.count,
              first: firstReactions.join(", "),
              last: lastReaction,
            })}
          </Typography>
        </CardContent>
      )}

      {post.comments.length > 0 && (
        <CardActions disableSpacing>
          <Button onClick={() => setShowComments(!showComments)}>
            {t(
              showComments ? "actions.hide-comments" : "actions.view-comments",
              { count: post.comments.length }
            )}
          </Button>
        </CardActions>
      )}

      <Collapse in={showComments}>
        <List>
          {post.comments.map((comment) => (
            <ListItem key={comment.id} style={{ alignItems: "start" }}>
              <Avatar src={comment.profile.imageUrl} />

              <Box sx={{ paddingLeft: 1 }}>
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <Typography>
                    <b>{comment.profile.name}</b>
                  </Typography>
                  <Typography sx={{ paddingLeft: 1 / 2 }} variant="subtitle2">
                    {timeSince(comment.createdAt)}
                  </Typography>
                </Box>

                <Typography>{comment.content}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <BlogPostCommentForm blogPostId={post.id} />
      </Collapse>
    </Box>
  );
}

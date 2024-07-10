import { ReactElement } from "react";

import { Box } from "@mui/material";

import { BlogPostPhotoDetails } from "src/api";
import { Carousel } from "src/components/ui/Carousel";

interface BlogPostPhotosProps {
  photos: BlogPostPhotoDetails[];
}

export function BlogPostPhotos({ photos }: BlogPostPhotosProps): ReactElement {
  if (photos.length === 0) {
    return <></>;
  }

  if (photos.length === 1) {
    const photo = photos[0];

    return (
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          display: "flex",
          justifyContent: "center",
          height: "100%",
        })}
      >
        <img
          alt={photo.description || "Blog post image"}
          key={photo.id}
          loading="lazy"
          src={photo.url}
          style={{
            minHeight: 100,
            width: "100%",
          }}
        />
      </Box>
    );
  }

  const images = photos.map((photo) => ({
    label: photo.description,
    src: photo.url,
  }));

  return <Carousel images={images} />;
}

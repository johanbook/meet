import { ReactElement } from "react";

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
    );
  }

  const images = photos.map((photo) => ({
    label: photo.description,
    src: photo.url,
  }));

  return <Carousel images={images} />;
}

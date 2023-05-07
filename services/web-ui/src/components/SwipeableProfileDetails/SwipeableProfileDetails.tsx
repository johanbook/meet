import React from "react";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import { ProfileDetails } from "src/api";
import { FALLBACK_IMAGES } from "src/constants/images";

export interface SwipeableProfileDetailsProps {
  data: ProfileDetails;
}

export function SwipeableProfileDetails({
  data,
}: SwipeableProfileDetailsProps): React.ReactElement {
  let url = FALLBACK_IMAGES.PROFILE_IMAGE_URL;

  const [primaryPhoto, ...photos] = data.photos;

  if (primaryPhoto) {
    url = primaryPhoto.imageUrl;
  }

  return (
    <Card variant="outlined">
      <CardMedia image={url} sx={{ height: "85vh", position: "relative" }}>
        <Typography
          color="white"
          gutterBottom
          sx={{ position: "absolute", bottom: 0, padding: 1 }}
          variant="h4"
        >
          {data.name}
        </Typography>
      </CardMedia>

      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          About me
        </Typography>
        <Typography>
          <b>{data.description}</b>
        </Typography>

        {photos.map((image) => (
          <img alt="Profile" src={image.imageUrl} />
        ))}
      </CardContent>
    </Card>
  );
}

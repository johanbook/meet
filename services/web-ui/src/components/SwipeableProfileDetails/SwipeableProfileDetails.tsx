import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";

import { ProfileDetails } from "src/api";

const DUMMY_IMAGE_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nBBABfTYuzj2DrsaqZ7pJgHaHa%26pid%3DApi&f=1&ipt=5bd2510f5fd8f9c0884a97e3b59952aaaa4a29302bb2632010304a29eb7e24fa&ipo=images";

export interface SwipeableProfileDetailsProps {
  data: ProfileDetails;
  expanded: boolean;
}

export function SwipeableProfileDetails({
  data,
  expanded,
}: SwipeableProfileDetailsProps): React.ReactElement {
  let url = DUMMY_IMAGE_URL;

  if (data.photos.length > 0) {
    url = data.photos[0].imageUrl;
  }

  return (
    <Card variant="outlined">
      <CardMedia image={url} sx={{ height: "74vh", position: "relative" }}>
        <Typography
          color="white"
          gutterBottom
          sx={{ position: "absolute", bottom: 0, padding: 1 }}
          variant="h4"
        >
          {data.name}
        </Typography>
      </CardMedia>

      <Collapse in={expanded}>
        <CardContent>
          <Typography>{data.description}</Typography>

          {data.photos.map((image) => (
            <img alt="Profile" src={image.imageUrl} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

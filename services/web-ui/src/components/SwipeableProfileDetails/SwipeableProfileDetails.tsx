import React from "react";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import { ProfileDetails } from "src/api";

export interface SwipeableProfileDetailsProps {
  data: ProfileDetails;
}

export function SwipeableProfileDetails({
  data,
}: SwipeableProfileDetailsProps): React.ReactElement {
  return (
    <Card variant="outlined">
      <CardMedia sx={{ height: "85vh", position: "relative" }}>
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
      </CardContent>
    </Card>
  );
}

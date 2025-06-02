import React from "react";

import { Box, Container } from "@mui/material";

import BackgroundImage512px from "src/assets/images/background_512px.png";
import BackgroundImage1024px from "src/assets/images/background_1024px.png";
import BackgroundImage2048px from "src/assets/images/background_2048px.png";

export interface ProfileCreationPageNavProps {
  children: React.ReactNode;
}

export function ProfileCreationPageNav({
  children,
}: ProfileCreationPageNavProps): React.ReactElement {
  return (
    <Box>
      <img
        alt=""
        srcSet={`${BackgroundImage512px} 512w, ${BackgroundImage1024px} 1024w, ${BackgroundImage2048px} 2048w`}
        style={{
          objectFit: "cover",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: -5,
          width: "100%",
          height: "100%",
        }}
      />
      <Container maxWidth="md">{children}</Container>{" "}
    </Box>
  );
}

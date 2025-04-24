import React, { ReactNode } from "react";

import BackgroundImage512px from "src/assets/images/background_512px.png";
import BackgroundImage1024px from "src/assets/images/background_1024px.png";
import BackgroundImage2048px from "src/assets/images/background_2048px.png";
import { Box, Container, Toolbar } from "@mui/material";

import { AppBar } from "../AppBar";

export default function Nav({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <AppBar />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 3,
          paddingRight: 3,
          paddingTop: 1,
          height: "100%",
        }}
      >
        <Toolbar />

        <Container
          disableGutters
          maxWidth="md"
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              alt=""
              srcSet={`${BackgroundImage512px} 512w ${BackgroundImage1024px} 1024w ${BackgroundImage2048px} 2048w`}
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

            {children}
          </Box>
        </Container>

        <Toolbar />
      </Box>
    </Box>
  );
}

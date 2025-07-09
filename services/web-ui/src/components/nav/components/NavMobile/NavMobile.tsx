import { FC } from "react";

import { Box, Container, Toolbar } from "@mui/material";

import { NavProps } from "../../types";
import { AppBar } from "../AppBar";
import { BottomNavigation } from "../BottomNavigation";

export const NavMobile: FC<NavProps> = ({ appBarContent, children }) => {
  return (
    <Box sx={{ height: "100vh", minHeight: "100%" }}>
      <AppBar appBarContent={appBarContent} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
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
          {children}
        </Container>

        <Toolbar />
      </Box>

      <BottomNavigation />
    </Box>
  );
};

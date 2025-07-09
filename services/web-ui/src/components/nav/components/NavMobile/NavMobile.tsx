import { FC } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, Container, IconButton, Toolbar, Typography } from "@mui/material";

import { NavProps } from "../../types";
import { AppBar } from "../AppBar";
import { BottomNavigation } from "../BottomNavigation";

export const NavMobile: FC<NavProps> = ({
  appBarContent,
  children,
  navBackTo,
  title,
}) => {
  if (navBackTo) {
    appBarContent = (
      <>
        <IconButton component={ReactRouterLink} to={navBackTo}>
          <ArrowBack />
        </IconButton>

        {title && (
          <Typography color="textPrimary" sx={{ pl: 2 }} variant="h5">
            {title}
          </Typography>
        )}
      </>
    );
  }

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

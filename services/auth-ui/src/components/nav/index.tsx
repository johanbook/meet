import { FC, ReactNode } from "react";

import { Card, Container } from "@mui/material";

import { useIsMobile } from "src/hooks/useIsMobile";

interface NavProps {
  children: ReactNode;
}

export const Nav: FC<NavProps> = ({ children }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Container
        disableGutters
        maxWidth="xs"
        sx={{
          p: 6,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Container>
    );
  }

  return (
    <Container
      disableGutters
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 4,
          m: 8,
        }}
      >
        {children}
      </Card>
    </Container>
  );
};
